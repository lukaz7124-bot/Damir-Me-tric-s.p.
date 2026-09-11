const { CDP, launch, sleep, URL_BASE } = require('./cdp.js');
const ok = (b) => (b ? 'OK  ' : 'FAIL');

(async () => {
  await launch();
  const c = await CDP.connect();

  console.log('--- widths, overflow, tap targets ---');
  for (const [w, h, touch] of [[1440, 900, false], [1280, 800, false], [1885, 790, false], [768, 1024, true], [375, 812, true], [320, 640, true]]) {
    await c.viewport(w, h, touch);
    await c.goto(URL_BASE);
    await sleep(1600);
    const r = await c.eval(`
      return {overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
        heroIn:document.querySelector('#hero').classList.contains('in'),
        h1:getComputedStyle(document.querySelector('h1')).opacity,
        small:[...document.querySelectorAll('a.btn,button,.stars a')].filter(e=>{const r=e.getBoundingClientRect();return r.height>0&&r.height<44&&${touch}}).length};`);
    console.log(' ', ok(r.overflow === 0 && r.heroIn && +r.h1 > 0.9 && r.small === 0), (w + 'x' + h).padEnd(10), 'xoverflow=' + r.overflow, 'hero=' + r.heroIn, 'h1=' + r.h1, 'smallTaps=' + r.small);
    await c.shot('v2-' + w + 'x' + h);
  }

  console.log('--- sections (desktop) ---');
  await c.viewport(1440, 900, false);
  await c.goto(URL_BASE); await sleep(1500);
  for (const s of ['#delo', '#dela', '#onas', '#potek', '#svetloba', '#mnenja', '#vprasanja', '#kontakt', '.foot']) {
    await c.eval(`const e=document.querySelector('${s}');window.scrollTo({top:e.getBoundingClientRect().top+scrollY-70,behavior:'instant'});return 1`);
    await sleep(1300);
    await c.shot('v2sec' + s.replace(/[#.]/g, ''));
  }

  console.log('--- google review links ---');
  const g = await c.eval(`
    const links=[...document.querySelectorAll('.greview')];
    return {n:links.length, allSet:links.every(a=>a.href.indexOf('google.com')>-1), target:links.every(a=>a.target==='_blank'), sample:links[0].href};`);
  console.log('  ', ok(g.n >= 7 && g.allSet && g.target), g.n + ' links, all to Google, new tab. ' + g.sample);

  console.log('--- hero parallax ---');
  const pl = await c.eval(`
    window.scrollTo({top:0,behavior:'instant'});await new Promise(r=>setTimeout(r,300));
    const a=document.querySelector('.hero-main').style.transform;
    window.scrollTo({top:400,behavior:'instant'});await new Promise(r=>setTimeout(r,400));
    const b=document.querySelector('.hero-main').style.transform;
    return {a,b};`);
  console.log('  ', ok(pl.a !== pl.b), 'photo moves with scroll:', JSON.stringify(pl));

  console.log('--- reduced motion ---');
  await c.goto(URL_BASE); await sleep(1400);
  await c.media([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await sleep(800);
  const rm = await c.eval(`return {hidden:[...document.querySelectorAll('[data-rv]>*,.hero-copy>*,.hero-main')].filter(e=>+getComputedStyle(e).opacity<.99).length,
    rail:getComputedStyle(document.querySelector('#railFill')).transform}`);
  console.log('  ', ok(rm.hidden === 0), 'everything pinned visible (' + rm.hidden + ' hidden)');
  await c.media([]);

  console.log('--- press and hold ---');
  await c.goto(URL_BASE); await sleep(1500);
  const pos = await c.eval(`const b=document.querySelector('#holdBtn');b.scrollIntoView({block:'center',behavior:'instant'});
    await new Promise(r=>setTimeout(r,600));const r=b.getBoundingClientRect();return {x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)}`);
  await c.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: pos.x, y: pos.y, button: 'left', clickCount: 1 });
  await sleep(2000);
  const full = await c.eval(`return {on:document.querySelector('#dim').classList.contains('lit-on'),plate:document.querySelector('#dimPlate').textContent}`);
  await c.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: pos.x, y: pos.y, button: 'left', clickCount: 1 });
  console.log('  ', ok(full.on), 'lights up:', full.plate);

  console.log('--- controls ---');
  const faq = await c.eval(`const qa=document.querySelector('#faq .qa');const btn=qa.querySelector('button');btn.click();
    await new Promise(r=>setTimeout(r,700));const h=qa.querySelector('.panel').getBoundingClientRect().height;btn.click();
    await new Promise(r=>setTimeout(r,700));return {open:Math.round(h),closed:Math.round(qa.querySelector('.panel').getBoundingClientRect().height)}`);
  console.log('  ', ok(faq.open > 30 && faq.closed < 5), 'faq', JSON.stringify(faq));
  const lb = await c.eval(`document.querySelectorAll('#gal .gitem')[1].click();await new Promise(r=>setTimeout(r,500));
    const d=document.querySelector('#lb');const o=d.open;document.querySelector('#lbNext').click();await new Promise(r=>setTimeout(r,200));
    document.querySelector('#lbClose').click();await new Promise(r=>setTimeout(r,200));return {o,closed:!d.open}`);
  console.log('  ', ok(lb.o && lb.closed), 'lightbox', JSON.stringify(lb));
  const form = await c.eval(`const f=document.querySelector('#lead');f.querySelector('#f-ime').value='Test';f.querySelector('#f-tel').value='070';
    f.querySelector('#f-txt').value='x';f.dispatchEvent(new Event('submit',{cancelable:true,bubbles:true}));
    await new Promise(r=>setTimeout(r,300));return document.querySelector('#fok').classList.contains('show')`);
  console.log('  ', ok(form), 'form confirmation');

  const errs = c.events.filter((e) => e.method === 'Log.entryAdded' && e.params.entry.level === 'error').map((e) => e.params.entry.text);
  console.log('--- console ---');
  console.log('  ', ok(errs.length === 0), 'errors: ' + JSON.stringify(errs));
  process.exit(0);
})().catch((e) => { console.error('ERR', e.message); process.exit(1); });
