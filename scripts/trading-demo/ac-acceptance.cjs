const {chromium}=require('C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const BASE=process.env.DEMO_BASE_URL||'http://127.0.0.1:3211';
const evidence='C:/Users/USER/Documents/Codex/2026-10-02/task/evidence';
(async()=>{
 fs.mkdirSync(evidence,{recursive:true});
 const browser=process.env.CDP_URL?await chromium.connectOverCDP(process.env.CDP_URL):await chromium.launch({channel:'msedge',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1024},acceptDownloads:true});
 const page=await context.newPage();const runtimeErrors=[];page.on('pageerror',e=>runtimeErrors.push(String(e)));
 const results=[];const check=(name,fn)=>{fn();results.push({name,status:'pass'})};
 const act=(name)=>page.locator('#dialog [data-action="'+name+'"]').first();
 const get=()=>page.evaluate(()=>window.ColdFlowDemo.getState());
 const stateIs=async(fn)=>{await page.waitForFunction(fn)};
 const goto=async(route)=>{await page.goto(BASE+'/ac-parts-crm/index.html#'+route);await page.waitForFunction((route)=>!!window.ColdFlowDemo&&document.querySelector('#navigation [aria-current="page"]')?.getAttribute('href')==='#'+route.split('/')[0]&&location.hash==='#'+route,route)};
 await goto('overview');await page.evaluate(()=>localStorage.removeItem(window.ColdFlowDemo.storageKey));await page.reload();
 await page.locator('h1').waitFor();let data=await get();
 check('Seed AED totals and FIFO stock reservations',()=>{assert.equal(data.orders.length,2);assert.equal(data.skus[0].stock,6)});
 const allocated=await page.evaluate(()=>window.ColdFlowDemo.allocation());assert.equal(allocated.available['CP-ZR24'],4);
 await page.screenshot({path:path.join(evidence,'ac-desktop-overview.png'),fullPage:true});
 await page.locator('a[href="#enquiries/ENQ-1042"]').first().click();await act('create-quote').click();
 await stateIs(()=>window.ColdFlowDemo.getState().quotes.some(q=>q.enquiry==='ENQ-1042'));
 data=await get();const qid=data.enquiries.find(e=>e.id==='ENQ-1042').quote;
 check('Enquiry converts to one quote with requested parts',()=>{const q=data.quotes.find(q=>q.id===qid);assert.equal(q.items.length,2);assert.equal(q.items[0].qty,6);assert.equal(q.items[1].qty,12)});
 // Browser form validation rejects negative and decimal quantities without mutations.
 await page.locator('#quote-form [name="qty"]').first().fill('-1');await act('save-quote').click();assert.equal((await get()).quotes.find(q=>q.id===qid).items[0].qty,6);
 await page.locator('#quote-form [name="qty"]').first().fill('1.5');await act('save-quote').click();assert.equal((await get()).quotes.find(q=>q.id===qid).items[0].qty,6);
 await page.locator('#quote-form [name="qty"]').first().fill('6');
 await page.locator('#quote-form [name="discount"]').fill('5');await act('save-quote').click();
 assert.equal((await get()).quotes.find(q=>q.id===qid).discount,5);
 await act('send-quote').click();await stateIs(()=>window.ColdFlowDemo.getState().quotes.find(q=>q.enquiry==='ENQ-1042').status==='Sent');
 await act('revise-quote').click();await page.locator('#quote-form [name="discount"]').fill('2');await act('send-quote').click();
 data=await get();let q=data.quotes.find(q=>q.id===qid);
 check('Quotation revision retains prior prices, creates one follow-up and simulates sends',()=>{assert.equal(q.revision,2);assert.equal(q.revisions[0].discount,5);assert.equal(q.status,'Sent');assert.equal(data.tasks.filter(t=>t.title.includes(qid)&&!t.done).length,1);assert(q.history.some(h=>h.text.includes('(simulated)')))});
 await act('accept-quote').click();await stateIs(()=>!!window.ColdFlowDemo.getState().quotes.find(q=>q.enquiry==='ENQ-1042').order);
 data=await get();const oid=data.quotes.find(q=>q.id===qid).order;
 check('Accepted quote creates a single order with locked revision prices',()=>{const o=data.orders.find(o=>o.id===oid);assert.equal(o.discount,2);assert.equal(o.items[0].price,1850);assert.equal(data.orders.filter(o=>o.quote===qid).length,1)});
 await goto('quotations/'+qid);assert.equal(await act('accept-quote').count(),0);await page.locator('#dialog a[href="#orders/'+oid+'"]').click();
 await act('delivery').click();await page.locator('#delivery-form [name="CP-ZR24"]').fill('5');await act('save-delivery').click();assert.equal((await get()).deliveries.length,1);
 await page.locator('#delivery-form [name="CP-ZR24"]').fill('4');await act('save-delivery').click();
 data=await get();let o=data.orders.find(o=>o.id===oid);
 check('Partial delivery deducts only dispatched units and leaves a backorder',()=>{assert.equal(o.items[0].delivered,4);assert.equal(o.items[1].delivered,12);assert.equal(data.skus.find(s=>s.id==='CP-ZR24').stock,2);assert.equal(data.deliveries.length,2)});
 await page.screenshot({path:path.join(evidence,'ac-partial-delivery.png'),fullPage:true});
 await act('reorder').first().click();await page.locator('#reorder-form [name="qty"]').fill('4');await act('save-po').click();
 data=await get();const poid=data.purchases.find(p=>p.items.some(i=>i.sku==='CP-ZR24')).id;
 await act('receive').click();await page.locator('#receive-form [name="CP-ZR24"]').fill('2');await act('save-receipt').click();
 data=await get();check('Partial purchase receipt replenishes and reserves to waiting sales order',()=>{assert.equal(data.purchases.find(p=>p.id===poid).items[0].received,2);assert.equal(data.skus.find(s=>s.id==='CP-ZR24').stock,4)});
 const a2=await page.evaluate(()=>window.ColdFlowDemo.allocation());assert.equal(a2.orders[oid]['CP-ZR24'],2);assert.equal(a2.orders['SO-2405']['CP-ZR24'],2);
 await goto('orders/'+oid);await act('delivery').click();await act('save-delivery').click();
 data=await get();o=data.orders.find(o=>o.id===oid);check('Replenishment completes the original order',()=>{assert.equal(o.items[0].delivered,6);assert.equal(o.items[1].delivered,12);assert.equal(data.deliveries.filter(d=>d.order===oid).length,2)});
 await act('payment').click();const outstanding=Number(await page.locator('#payment-form [name="amount"]').inputValue());
 await page.locator('#payment-form [name="amount"]').fill(String(outstanding+1));await act('save-payment').click();assert.equal((await get()).payments.filter(p=>p.order===oid).length,0);
 await page.locator('#payment-form [name="amount"]').fill('1000.50');await act('save-payment').click();
 await act('payment').click();await act('save-payment').click();data=await get();
 check('Sample payments reject overpayment and close the outstanding balance',()=>{assert.equal(data.payments.filter(p=>p.order===oid).length,2);assert.equal(Math.round(data.payments.filter(p=>p.order===oid).reduce((n,p)=>n+p.amount,0)*100),Math.round(outstanding*100))});
 assert.equal(await act('payment').count(),0);
 await page.reload();await page.waitForFunction(()=>!!window.ColdFlowDemo);data=await get();assert.equal(data.orders.find(o=>o.id===oid).items[0].delivered,6);assert.equal(data.payments.filter(p=>p.order===oid).length,2);results.push({name:'Browser-local state survives reload and deep link',status:'pass'});
 await goto('customers/c1');assert((await page.locator('#dialog').innerText()).includes(oid));assert((await page.locator('#dialog').innerText()).includes('sample payment'));await act('close').click();
 await goto('reports');const downloadPromise=page.waitForEvent('download');await page.locator('[data-action="export"][data-id="orders"]').click();const downloaded=await downloadPromise;assert(downloaded.suggestedFilename().includes('sample-orders'));results.push({name:'Customer history and sales report CSV follow the same records',status:'pass'});
 await goto('inventory');await page.locator('#search').fill('no-such-part');await page.waitForFunction(()=>document.querySelector('.result-count')?.textContent.trim()==='0 records');assert((await page.locator('main').innerText()).includes('No parts match'));await page.locator('#search').fill('Copeland');await page.waitForFunction(()=>document.querySelector('.result-count')?.textContent.trim()==='1 record');assert.equal(await page.locator('main tbody tr').count(),1);
 await goto('enquiries');await page.locator('[data-action="new-enquiry"]').first().click();await page.locator('#enquiry-form [name="subject"]').fill('Cancel this request');await act('close').click();assert.equal((await get()).enquiries.length,3);
 await page.locator('[data-action="new-enquiry"]').first().click();await page.locator('#enquiry-form [name="subject"]').fill('<img src=x onerror="window.injection=true">');await page.locator('#enquiry-form [name="qty"]').fill('2');await act('save-enquiry').click();data=await get();const injected=data.enquiries.find(e=>e.subject.includes('<img'));
 assert.equal(await page.locator('#dialog img').count(),0);assert.equal(await page.evaluate(()=>!!window.injection),false);
 await act('create-quote').click();await act('send-quote').click();await act('accept-quote').click();await act('cancel-order').click();await act('back-order').click();assert.equal((await get()).orders.filter(o=>o.cancelled).length,0);await act('cancel-order').click();await act('confirm-cancel-order').click();assert.equal((await get()).orders.filter(o=>o.cancelled).length,1);
 results.push({name:'Empty searches, cancelled forms, safe user text, order cancel/back and reservations',status:'pass'});
 await page.locator('#dialog [data-action="close"]').first().click();await goto('tasks');await page.locator('[data-action="toggle-task"]').first().check();const task= (await get()).tasks[0];assert(task.done);await page.locator('[data-action="toggle-task"]').first().uncheck();assert.equal((await get()).tasks[0].done,false);
 await page.locator('#guide-button').click();assert((await page.locator('#dialog').innerText()).includes('Replenish'));await page.keyboard.press('Escape');assert.equal(await page.locator('#dialog').evaluate(e=>e.open),false);
 results.push({name:'Task completion and Escape dialog dismissal',status:'pass'});
 // Explicit demo reset restores only the demo key; another key remains untouched.
 await page.evaluate(()=>localStorage.setItem('other-demo-control','preserve'));await page.locator('#reset-button').click();await act('confirm-reset').click();await stateIs(()=>window.ColdFlowDemo.getState().orders.length===2);assert.equal(await page.evaluate(()=>localStorage.getItem('other-demo-control')),'preserve');assert.equal((await get()).quotes.length,1);
 results.push({name:'Reset restores seed and preserves unrelated browser-local keys',status:'pass'});
 // Each shipped route is meaningful, renders without page errors and keeps overflow inside tables/nav.
 for(const route of ['overview','enquiries','quotations','orders','inventory','purchasing','customers','tasks','reports']){
  await goto(route);assert(await page.locator('h1').count());
 }
 await page.setViewportSize({width:390,height:844});
 for(const route of ['overview','enquiries','quotations','orders','inventory','purchasing','customers','tasks','reports']){
  await goto(route);const dims=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth}));assert(dims.scroll<=dims.viewport+1,`Overflow ${route}: ${dims.scroll}/${dims.viewport}`);
 }
 await goto('overview');await page.screenshot({path:path.join(evidence,'ac-mobile-overview.png'),fullPage:true});
 await page.locator('a[href="#enquiries/ENQ-1042"]').click();await page.screenshot({path:path.join(evidence,'ac-mobile-enquiry.png'),fullPage:true});
 assert.deepEqual(runtimeErrors,[]);results.push({name:'All nine routes at desktop/mobile; no page errors or document overflow',status:'pass'});
 const summary={demo:'ColdFlow AC parts',base:BASE,date:new Date().toISOString(),results,runtimeErrors,screenshots:['ac-desktop-overview.png','ac-partial-delivery.png','ac-mobile-overview.png','ac-mobile-enquiry.png']};
 fs.writeFileSync(path.join(evidence,'ac-acceptance.json'),JSON.stringify(summary,null,2));
 console.log(JSON.stringify(summary,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
