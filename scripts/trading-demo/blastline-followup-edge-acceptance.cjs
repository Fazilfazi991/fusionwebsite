/* Cross-tab editing, historical PDFs and actual phone actions; synthetic browser-local data only. */
const {chromium}=require('C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const BASE=process.env.DEMO_BASE_URL||'http://127.0.0.1:3226';
const OUT=process.env.OUT||path.resolve(__dirname,'../../../evidence/blastline-followup/edge-local');
const completed=process.env.COMPLETED_STATE||path.resolve(__dirname,'../../../evidence/blastline-followup/local/completed-state.json');
let browser;const results=[],errors=[],writes=[];
const pass=name=>{results.push({name,status:'pass'});console.log('PASS '+name);};
const button=(p,action,id,scope='main')=>p.locator(scope+' [data-journey-action="'+action+'"]'+(id?'[data-id="'+id+'"]':'')+':visible').first();
const go=async(p,hash)=>{await p.goto(BASE+'/blastline-crm/index.html#'+hash);await p.waitForFunction(()=>window.BlastlineJourneyModel);};
const state=p=>p.evaluate(()=>window.BlastlineDemo.getState());
const save=async p=>{await p.locator('#journey-quote-form [type="submit"]').click();await p.waitForTimeout(100);};
(async()=>{fs.mkdirSync(OUT,{recursive:true});try{
 browser=await chromium.launch({channel:'msedge',headless:true});const ctx=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true});
 ctx.on('page',p=>{p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(!['GET','HEAD'].includes(r.method()))writes.push(r.url());});});
 const a=await ctx.newPage(),b=await ctx.newPage();await go(a,'leads?edit=L3');await go(b,'leads?edit=L4');
 await a.locator('[name="details.salesRep"]').fill('Tab A representative');await b.locator('[name="details.salesRep"]').fill('Tab B representative');await save(a);await save(b);
 let s=await state(b);assert.equal(s.journey.quotes.length,2);assert.equal(s.journey.quotes.find(q=>q.leadId==='L3').details.salesRep,'Tab A representative');assert.equal(s.journey.quotes.find(q=>q.leadId==='L4').details.salesRep,'Tab B representative');pass('Two independent tabs save different leads without losing either quotation');
 await go(a,'leads?edit=L3');await go(b,'leads?edit=L3');await a.locator('[name="details.salesRep"]').fill('Winning revision');await b.locator('[name="details.salesRep"]').fill('Stale revision');await save(a);await save(b);
 assert((await b.locator('#journey-quote-form').count())===1);assert.match(await b.locator('#toast').innerText(),/newer quotation revision/);s=await state(b);let q=s.journey.quotes.find(q=>q.leadId==='L3');assert.equal(q.rev,2);assert.equal(q.details.salesRep,'Winning revision');assert.equal(q.snapshots.length,2);await button(b,'cancel-edit','L3').click();pass('Concurrent stale edit rejected with visible recovery and immutable winning revision');
 await button(b,'revisions',q.id).click();await button(b,'revision-preview',q.id+':0','#dialog').click();await b.locator('#dialog iframe').waitFor();const waiting=b.waitForEvent('download');await button(b,'preview-download','','#dialog').click();const dl=await waiting;assert.match(dl.suggestedFilename(),/-R1\.pdf$/);await dl.saveAs(path.join(OUT,'historical-R1.pdf'));await b.keyboard.press('Escape');assert.equal(await b.locator('#dialog').evaluate(n=>n.open),false);pass('Historical revision preview downloads the selected R1 PDF; Escape closes preview');
 await a.close();await b.close();await ctx.close();
 for(const width of [320,360,390,430]){
  const phone=await browser.newContext({viewport:{width,height:844},hasTouch:true,isMobile:true,acceptDownloads:true});const p=await phone.newPage();p.on('pageerror',e=>errors.push(e.message));await go(p,'leads');
  await p.evaluate(s=>localStorage.setItem(window.BlastlineDemo.storageKey,JSON.stringify(s)),JSON.parse(fs.readFileSync(completed,'utf8')));await p.reload();await p.waitForFunction(()=>window.BlastlineJourneyModel);
  await button(p,'lead','L5').click();await p.waitForFunction(()=>location.hash.includes('lead=L5'));let current=await state(p);const lead=current.journey.leads.find(l=>l.id==='L5');
  await button(p,'job',lead.jobIds[0]).click();await p.locator('#dialog').waitFor({state:'visible'});await button(p,'lead','L5','#dialog').click();await p.locator('#dialog').waitFor({state:'hidden'});
  await button(p,'customer',lead.cid).click();await p.keyboard.press('Escape');await p.locator('#dialog').waitFor({state:'hidden'});
  await p.locator('[data-action="more"]').click();await p.locator('#dialog a[href="#projects"]').click();await p.waitForFunction(()=>location.hash==='#projects');
  const pid=current.journey.leads.find(l=>l.id==='L1').projectId;await button(p,'project',pid).click();await p.waitForFunction(id=>location.hash.includes('project='+id),pid);
  await button(p,'project-edit',pid).click();await p.locator('#dialog [name="manager"]').fill('Cancelled phone edit');await p.keyboard.press('Escape');assert.notEqual((await state(p)).journey.projects.find(x=>x.id===pid).manager,'Cancelled phone edit');
  await p.locator('[data-action="more"]').click();await p.locator('#dialog a[href="#leads"]').click();await p.waitForFunction(()=>location.hash==='#leads');await button(p,'lead','L3').click();await button(p,'restart','L3').click();await button(p,'restart-confirm','L3','#dialog').click();await button(p,'edit','L3').click();
  const last=button(p,'cancel-edit','L3','#journey-quote-form');await last.scrollIntoViewIfNeeded();const box=await last.boundingBox();assert(box.x>=0&&box.x+box.width<=width+1);await p.screenshot({path:path.join(OUT,'phone-last-controls-'+width+'.png')});await last.click();await p.waitForFunction(()=>location.hash.includes('lead=L3'));assert.equal((await state(p)).journey.leads.find(l=>l.id==='L3').quoteId,null);
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth),width);await phone.close();pass(width+'px phone visible lead/job actions, More→Projects, modal Escape, last editor controls and cancel');
 }
 assert.deepEqual(errors,[]);assert.deepEqual(writes,[]);fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify({status:'pass',results,errors,writes},null,2));console.log('PASS '+results.length+' edge scenario groups');
}catch(e){fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify({status:'fail',error:e.stack,results,errors,writes},null,2));console.error(e.stack);process.exitCode=1;}finally{if(browser)await browser.close();}})();
