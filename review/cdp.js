// Headless Chrome driver over the DevTools protocol. Zero dependencies, Node 22+.
// usage: node cdp.js <task> [args]
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL_BASE = process.env.SITE || 'http://127.0.0.1:8181/';
const PORT = 9222;
const OUT = path.join(__dirname, 'shots');
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getTargets() {
  const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
  return res.json();
}

async function launch() {
  try {
    const t = await getTargets();
    if (t.length) return null;
  } catch (e) { /* not running yet */ }
  const dir = path.join(os.tmpdir(), 'cdp-profile-' + Date.now());
  const p = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--mute-audio',
    '--no-first-run', '--no-default-browser-check',
    `--remote-debugging-port=${PORT}`, `--user-data-dir=${dir}`,
    '--window-size=1440,900', 'about:blank'
  ], { detached: true, stdio: 'ignore' });
  p.unref();
  for (let i = 0; i < 60; i++) {
    await sleep(250);
    try { const t = await getTargets(); if (t.length) return p; } catch (e) {}
  }
  throw new Error('chrome did not open a debugging port');
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.waits = new Map(); this.events = []; }
  static async connect() {
    const list = await getTargets();
    const page = list.find((t) => t.type === 'page') || list[0];
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    const c = new CDP(ws);
    ws.onmessage = (m) => {
      const d = JSON.parse(m.data);
      if (d.id && c.waits.has(d.id)) {
        const { res, rej } = c.waits.get(d.id); c.waits.delete(d.id);
        d.error ? rej(new Error(JSON.stringify(d.error))) : res(d.result);
      } else if (d.method) c.events.push(d);
    };
    return c;
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((res, rej) => {
      this.waits.set(id, { res, rej });
      this.ws.send(JSON.stringify({ id, method, params }));
      setTimeout(() => { if (this.waits.has(id)) { this.waits.delete(id); rej(new Error('timeout ' + method)); } }, 40000);
    });
  }
  async eval(expr) {
    const r = await this.send('Runtime.evaluate', {
      expression: `(async()=>{${expr}})()`, awaitPromise: true, returnByValue: true
    });
    if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails));
    return r.result.value;
  }
  async shot(name, full) {
    const r = await this.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: !!full });
    fs.writeFileSync(path.join(OUT, name + '.png'), Buffer.from(r.data, 'base64'));
    return path.join(OUT, name + '.png');
  }
  async viewport(w, h, touch) {
    await this.send('Emulation.setDeviceMetricsOverride', {
      width: w, height: h, deviceScaleFactor: 1, mobile: !!touch
    });
    await this.send('Emulation.setTouchEmulationEnabled', { enabled: !!touch, maxTouchPoints: 5 });
  }
  async media(features) {
    await this.send('Emulation.setEmulatedMedia', { media: '', features: features || [] });
  }
  async goto(url) {
    await this.send('Page.enable');
    await this.send('Runtime.enable');
    await this.send('Log.enable');
    await this.send('Network.enable');
    await this.send('Page.navigate', { url });
    await sleep(2600);
  }
}

module.exports = { CDP, launch, sleep, OUT, URL_BASE };

if (require.main === module) {
  (async () => {
    await launch();
    const c = await CDP.connect();
    await c.goto(URL_BASE);
    console.log(JSON.stringify(await c.eval('return {title:document.title,y:scrollY,h:document.documentElement.scrollHeight}')));
    await c.shot('boot');
    process.exit(0);
  })().catch((e) => { console.error('ERR', e.message); process.exit(1); });
}
