const { chromium } = require('C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs'), path = require('node:path');
const BASE = process.env.DEMO_BASE_URL || 'https://www.fusionventuresglobal.com';
const PHASE = process.env.PHASE || 'before';
const OUT = 'C:/Users/USER/Documents/Codex/2026-10-02/task/evidence/mobile-static/' + PHASE;
const demos = {
 'blastline-crm': ['overview','enquiries','customers','catalog','sales','quotations','rentals','fleet','repairs','dispatch','stock','finance','tasks','reports'],
 'advertising-crm': ['overview','enquiries','customers','quotations','jobs','artwork','production','outsourcing','deliveries','finance','materials','catalog','tasks','reports'],
 'ac-parts-crm': ['overview','enquiries','quotations','orders','inventory','purchasing','customers','tasks','reports'],
 'medical-supply-crm': ['dashboard','customers','enquiries','quotes','orders','catalog','purchasing','installed','service','tasks','reports','guide'],
 'construction-crm': ['overview','leads','customers','projects','estimations','quotations','drawings','materials','fabrication','quality','deliveries','erection','finance','contracts','tasks','reports'],
 'equipflow': ['dashboard','equipment','availability','bookings','dispatch','rentals','returns','maintenance','enquiries','quotations','customers','payments','settings']
};
const flows={
 'blastline-crm':[['enquiries','new-enquiry','enquiry-form'],['customers','customer','customer-dossier'],['quotations','quote','quotation-detail'],['overview','more','module-menu']],
 'advertising-crm':[['enquiries','new-enquiry','enquiry-form'],['customers','a[href^="#customers/"]','customer-detail'],['quotations','new-quote','quotation-form'],['overview','more','module-menu']],
 'ac-parts-crm':[['enquiries','new-enquiry','enquiry-form'],['customers','a[href^="#customers/"]','customer-dossier'],['quotations','a[href^="#quotations/"]','quotation-detail']],
 'medical-supply-crm':[['enquiries','new-enquiry','enquiry-form'],['customers','a[href^="#customers/"]','customer-detail'],['quotes','new-quote','quotation-form'],['installed','installation','handover-form']],
 'construction-crm':[['leads','new-lead','enquiry-form'],['customers','customer','customer-dossier'],['quotations','edit-quote','quotation-editor'],['projects','project','project-detail']],
 'equipflow':[['bookings','new-booking','booking-form'],['rentals','button[data-action^="rental:"]','rental-drawer'],['rentals','button[data-action^="extend-for:"]','extension-form'],['equipment','add-equipment','equipment-form']]
};
async function go(page,demo,route){if(demo==='equipflow'){if(!page.url().includes('/equipflow/'))await page.goto(BASE+'/'+demo+'/index.html');await page.locator('[data-view="'+route+'"]').first().evaluate(e=>e.click());}else await page.goto(BASE+'/'+demo+'/index.html#'+route);await page.waitForTimeout(70);}
async function scan(page) { return page.evaluate(() => {
 const w = innerWidth, visible = e => { const r=e.getBoundingClientRect();return r.width && r.height && getComputedStyle(e).visibility!=='hidden'; };
 const overflow = [...document.querySelectorAll('body *')].filter(e=>visible(e)&&e.getBoundingClientRect().right>w+2&&!e.closest('table,.table-wrap,.nav-scroll,.sidebar,dialog,.drawer,.modal-wrap')).slice(0,14).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent.trim().slice(0,70),right:Math.round(e.getBoundingClientRect().right)}));
 const tables = [...document.querySelectorAll('.table-wrap,[class*=table][class*=wrap]')].filter(visible).map(e=>({cls:e.className,width:e.clientWidth,scrollWidth:e.scrollWidth,overflow:getComputedStyle(e).overflowX,label:e.getAttribute('aria-label'),tabindex:e.getAttribute('tabindex'),cue:e.previousElementSibling?.classList.contains('table-scroll-hint')&&!e.previousElementSibling.hidden?e.previousElementSibling.textContent:getComputedStyle(e,'::after').content}));
 const targets = [...document.querySelectorAll('button,a,input,select')].filter(e=>visible(e)&&!e.closest('.sidebar')).map(e=>({tag:e.tagName,text:(e.textContent||e.getAttribute('aria-label')||'').trim().slice(0,40),h:Math.round(e.getBoundingClientRect().height),w:Math.round(e.getBoundingClientRect().width)})).filter(e=>e.h<40&&e.w>2).slice(0,14);
 return {docWidth:document.documentElement.scrollWidth,viewport:w,overflow,tables,smallTargets:targets,title:document.querySelector('h1')?.innerText,disclosure:[...document.querySelectorAll('.demo-banner,.mobile-demo-notice,.notice,.footnote,.sidebar-foot')].filter(visible).map(e=>e.innerText).slice(0,3)};
}); }
(async()=>{fs.mkdirSync(OUT,{recursive:true}); const browser=await chromium.launch({channel:'msedge',headless:true});const results=[],interactions=[],errors=[];
 try { for(const [demo,routes] of Object.entries(demos)) {if(process.env.DEMO_FILTER&&!process.env.DEMO_FILTER.split(',').includes(demo))continue; const context=await browser.newContext({viewport:{width:1440,height:1000},hasTouch:true,reducedMotion:'reduce'}); const page=await context.newPage();page.on('pageerror',e=>errors.push({demo,error:String(e)}));
 for(const width of (process.env.GESTURE_ONLY?[320]:[320,360,390,430,1440])) {await page.setViewportSize({width,height:900});
 if(process.env.TARGETED && !['ac-parts-crm','medical-supply-crm','advertising-crm','equipflow'].includes(demo))continue;
 for(const route of (process.env.GESTURE_ONLY?[routes.find(r=>['quotations','quotes'].includes(r))]:process.env.TARGETED?routes.filter(r=>['overview','dashboard','equipment','bookings','returns','maintenance','jobs'].includes(r)):routes)) {await go(page,demo,route);const row={demo,route,width,...await scan(page)}; results.push(row);
 if(route===routes[0] || (width===320&&['rentals','quotations','finance','installed','production','availability'].includes(route)))await page.screenshot({path:path.join(OUT,demo+'-'+route+'-'+width+'.png'),fullPage:true});
 }
 if(PHASE!=='before'&&!process.env.GESTURE_ONLY) for(const [route,action,name] of flows[demo]) {
 await go(page,demo,route);let target=page.locator(action.includes('[')?action:'[data-action="'+action+'"]');
 if(width===1440&&action==='more')continue;
 target=target.filter({visible:true}).first();
 if(!await target.count()){interactions.push({demo,width,name,status:'unavailable',action});continue;}
 await target.click();await page.waitForTimeout(70);
 const data=await page.evaluate(()=>{const active=document.querySelector('dialog[open],.modal-wrap.open .modal,.drawer.open')||document.querySelector('main');return {width:active.clientWidth,scrollWidth:active.scrollWidth,dialog:active.tagName,heading:active.querySelector('h2,h1')?.textContent,formControls:active.querySelectorAll('input,select,textarea').length,scrollable:active.scrollHeight>active.clientHeight,labels:[...active.querySelectorAll('input,select,textarea')].filter(i=>!i.labels?.length&&!i.getAttribute('aria-label')).map(i=>i.name||i.id||i.tagName)}});
 const cancelState=await page.evaluate(()=>JSON.stringify({...localStorage}));
 const validation=await page.evaluate(()=>{const active=document.querySelector('dialog[open],.modal-wrap.open .modal');const field=active?.querySelector('input[required]:not([readonly]),textarea[required]');if(!field)return null;const original=field.value;field.value='';const invalid=!field.checkValidity(),message=field.validationMessage;field.value=original;return {invalid,message};});
 const record={demo,width,name,status:'checked',surfaceWidth:data.width,surfaceScrollWidth:data.scrollWidth,...Object.fromEntries(Object.entries(data).filter(([key])=>!['width','scrollWidth'].includes(key))),...await scan(page),validation};interactions.push(record);
 if(width===320||width===1440)await page.screenshot({path:path.join(OUT,demo+'-'+name+'-'+width+'.png'),fullPage:false});
 await page.keyboard.press('Escape');
 record.cancelPreservedStorage=cancelState===await page.evaluate(()=>JSON.stringify({...localStorage}));
 }
 if(PHASE!=='before'&&width===320){await go(page,demo,routes.find(r=>['quotations','quotes'].includes(r))||routes[0]);const region=page.locator('.table-wrap[tabindex="0"],.tablewrap[tabindex="0"]').first();if(await region.count()){await region.scrollIntoViewIfNeeded();await region.focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(120);interactions.push({demo,width,name:'table-keyboard-scroll',status:'checked',scrollLeft:await region.evaluate(e=>e.scrollLeft),focusVisible:await region.evaluate(e=>getComputedStyle(e).outlineStyle!=='none')});
 await region.evaluate(e=>{e.scrollLeft=0;e.scrollIntoView({block:'start'});});const box=await region.boundingBox(),session=await context.newCDPSession(page),y=Math.min(700,Math.max(130,box.y+60)),x=Math.min(width-20,box.x+box.width-20);await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});for(let i=1;i<=5;i++){await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-i*30,y}]});await page.waitForTimeout(25);}await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForTimeout(100);interactions.push({demo,width,name:'table-synthesized-touch-scroll',status:'checked',scrollLeft:await region.evaluate(e=>e.scrollLeft),engine:'Chromium / Edge, CDP touch emulation'});await session.detach();}}
 } await context.close();console.log(demo+': '+results.filter(r=>r.demo===demo).length+' route/viewport scans complete'); }
 fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify({base:BASE,phase:PHASE,results,interactions,errors},null,2));
 console.log(JSON.stringify({total:results.length,errors,documentOverflow:results.filter(r=>r.docWidth>r.width).map(r=>({demo:r.demo,route:r.route,width:r.width,docWidth:r.docWidth,overflow:r.overflow})),smallTargetRoutes:results.filter(r=>r.width<800&&r.smallTargets.length).length},null,2));
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
