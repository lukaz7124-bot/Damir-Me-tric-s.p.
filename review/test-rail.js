const { CDP, launch, sleep, URL_BASE } = require('./cdp.js');
(async () => {
  await launch(); const c = await CDP.connect();
  await c.viewport(1440, 900, false); await c.goto(URL_BASE); await sleep(1600);
  const r = await c.eval(`
    window.scrollTo({top:1200,behavior:'instant'});await new Promise(r=>setTimeout(r,900));
    const f=document.querySelector('#railFill'),hd=document.querySelector('#railHead');
    const getY=()=>parseFloat(hd.style.transform.slice(11))||0;
    const ys=[],frames=[];let last=performance.now(),n=0;
    await new Promise(res=>{function step(now){frames.push(now-last);last=now;
      window.scrollBy({top:28,behavior:'instant'});ys.push(getY());if(++n<120)requestAnimationFrame(step);else res()}requestAnimationFrame(step)});
    // per-frame head movement: smooth means small, similar steps with no zero-then-jump pattern
    const d=[];for(let i=1;i<ys.length;i++)d.push(+(ys[i]-ys[i-1]).toFixed(2));
    const zeros=d.filter(x=>x===0).length,maxStep=Math.max(...d),minStep=Math.min(...d.slice(10));
    frames.shift();const longF=frames.filter(x=>x>34).length;
    return {samples:d.length,zeroFrames:zeros,minStep,maxStep,longFrames:longF,tail:d.slice(-6)};`);
  console.log(JSON.stringify(r));
  process.exit(0);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
