const fs=require('fs');
const assert=require('node:assert/strict');
const { chromium }=require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const BASE=process.env.CRM_DEMO_URL || 'http://localhost:3000/demo/multi-company-crm';
const KEY='fusion-multi-company-crm-demo-v1';
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const context=await browser.newContext({viewport:{width:1440,height:1050}});
 const page=await context.newPage(); const errors=[];const calls=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/\/api\/|supabase|resend/.test(r.url()))calls.push(r.url())});
 const dialog=()=>page.getByRole('dialog');
 const field=name=>dialog().locator(`[name="${name}"]`);
 const fill=async(name,v)=>field(name).fill(String(v));
 const select=async(name,v)=>field(name).selectOption(v);
 const click=async(text)=>dialog().getByRole('button',{name:text,exact:true}).click();
 const close=async()=>{await page.getByRole('button',{name:'Close dialog',exact:true}).click();};
 const state=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY);
 const goto=async(view)=>{await page.goto(`${BASE}/${view}`);await page.getByRole('heading',{level:1}).waitFor();};
 const save=async(text)=>{await click(text);await page.waitForTimeout(120);};
 await goto('dashboard');await page.getByRole('button',{name:'Reset Demo Data',exact:true}).click();await click('Reset Demo Data');
 await page.getByRole('button',{name:'Add customer',exact:true}).click();
 for(const [k,v] of Object.entries({name:'Al Noor Events',contact:'Amina Noor',email:'amina@alnoor.example',mobile:'+971 50 555 0199',location:'Al Quoz, Dubai',notes:'Acceptance journey customer'}))await fill(k,v);
 await save('Save customer');let s=await state();const cust=s.records.customers.find(c=>c.name==='Al Noor Events');assert(cust);assert.equal(cust.company,'advertising');
 await click('Schedule meeting');await select('purpose','New Business Opportunity');await fill('location','Al Noor office, Al Quoz');await save('Save meeting');s=await state();let meeting=s.records.meetings.find(m=>m.customerId===cust.id);assert(meeting);assert.equal(meeting.purpose,'New Business Opportunity');
 await click('Customer profile');await click('New opportunity');await fill('title','500 Customized Promotional Bags');await fill('value','15000');await fill('probability','20');await save('Save opportunity');
 s=await state();const opp=s.records.opportunities.find(o=>o.customerId===cust.id);assert.equal(opp.probability,20);
 await close();await goto('meetings');await page.getByRole('button',{name:/Al Noor Events/}).click();await click('Complete meeting');await select('opportunityId',opp.id);await select('outcome','Positive');await fill('notes','Client liked the concept. Requested a smaller logo.');await fill('nextAction','Confirm artwork feedback');await fill('probability','50');const followup=new Date();followup.setDate(followup.getDate()+3);const date=`${followup.getFullYear()}-${String(followup.getMonth()+1).padStart(2,'0')}-${String(followup.getDate()).padStart(2,'0')}`;await fill('followupDate',date);await select('followupType','Task');await save('Complete & save follow-up');
 s=await state();assert.equal(s.records.opportunities.find(o=>o.id===opp.id).probability,50);assert.equal(s.records.meetings.find(m=>m.id===meeting.id).status,'Completed');assert(s.records.tasks.some(t=>t.meetingId===meeting.id));
 await click('Open related opportunity');await click('Create quotation');await fill('title','QT-ALNOOR-001 Promotional Bags');await dialog().getByRole('textbox',{name:'Item 1 description',exact:true}).fill('Customized promotional bags');await dialog().getByRole('spinbutton',{name:'Item 1 quantity',exact:true}).fill('500');await dialog().getByRole('spinbutton',{name:'Item 1 price',exact:true}).fill('30');await save('Save quotation');
 await dialog().getByRole('combobox',{name:'Quotation status',exact:true}).selectOption('Approved');await page.waitForTimeout(120);s=await state();const quote=s.records.quotations.find(q=>q.customerId===cust.id);assert.equal(quote.status,'Approved');assert.equal(quote.items[0].quantity*quote.items[0].price,15000);
 await close();await goto('opportunities');await page.getByRole('button',{name:/Al Noor Events 500 Customized/}).click();await dialog().getByRole('combobox',{name:'Opportunity stage',exact:true}).selectOption('Won');await page.waitForTimeout(120);assert.equal((await state()).records.opportunities.find(o=>o.id===opp.id).probability,50);await click('Create order');
 await dialog().getByRole('button',{name:'3 Design',exact:true}).click();
 const artwork=Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="300" height="200" fill="#eff5ff"/><text x="40" y="100" fill="#2563eb">Al Noor Events</text></svg>');
 await dialog().getByLabel('Upload artwork or sample').setInputFiles({name:'al-noor-v1.svg',mimeType:'image/svg+xml',buffer:artwork});await page.waitForTimeout(200);await select('decision','Revision Requested');await fill('feedback','Reduce logo width and use navy text.');await save('Record decision');await dialog().getByLabel('Upload artwork or sample').setInputFiles({name:'al-noor-v2.svg',mimeType:'image/svg+xml',buffer:artwork});await page.waitForTimeout(200);await select('decision','Approved');await fill('feedback','Revised logo spacing approved by Amina.');await save('Record decision');
 await dialog().getByRole('button',{name:'5 Production',exact:true}).click();await dialog().getByRole('button',{name:'6 Delivery',exact:true}).click();s=await state();const order=s.records.orders.find(o=>o.opportunityId===opp.id);assert.equal(order.stage,'Delivery');assert.equal(order.quotationId,quote.id);assert.equal(order.files.length,2);assert.equal(order.approval,'Approved');assert(order.history.some(h=>h.text.includes('Revision Requested')));assert(order.history.some(h=>h.text.includes('Production')));
 await click('Customer profile');await dialog().getByRole('heading',{name:'Relationship timeline'}).waitFor();const timeline=await dialog().innerText();for(const word of ['Probability changed 20% → 50%','Quotation Approved','Revision Requested','Artwork uploaded · version 2','Production → Delivery'])assert(timeline.includes(word),word);
 await click('New opportunity');await fill('title','1,000 Corporate Gifts');await fill('value','42000');await save('Save opportunity');s=await state();assert.equal(s.records.opportunities.filter(o=>o.customerId===cust.id).length,2);assert(s.records.orders.some(o=>o.id===order.id));
 await close();await goto('dashboard');await page.reload();await page.getByRole('heading',{name:'A clear view of your business.'}).waitFor();s=await state();assert.equal(s.records.customers.filter(c=>c.company==='advertising').length,11);assert.equal(s.records.opportunities.find(o=>o.id===opp.id).probability,50);await page.getByText('AED 127,500',{exact:true}).waitFor();await page.screenshot({path:'scripts/crm-demo/journey-dashboard.png',fullPage:true});
 for(const company of ['packaging','supply']){
  await page.getByRole('combobox',{name:'Select company'}).selectOption(company);await page.waitForTimeout(150);await goto('customers');assert(!(await page.locator('main').innerText()).includes('Al Noor Events'));assert.equal((await state()).selected,company);await goto('orders');await page.locator('tbody button').first().click();const txt=await dialog().innerText();assert(txt.includes(company==='packaging'?'Quality Check':'Supplier quotation & procurement'));await close();
 }
 for(const route of ['dashboard','customers','meetings','opportunities','quotations','orders','tasks','reports']){await goto(route);assert((await page.locator('main').innerText()).length>100);}
 await goto('meetings');await page.getByRole('button',{name:'Calendar',exact:true}).click();assert.equal(await page.locator('[class*="calendar_"] > strong').count(),7);
 await page.getByRole('combobox',{name:'Select company'}).selectOption('advertising');await goto('dashboard');await page.screenshot({path:'scripts/crm-demo/desktop.png',fullPage:true});await page.setViewportSize({width:390,height:844});await page.screenshot({path:'scripts/crm-demo/mobile.png',fullPage:true});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 for(const route of ['customers','meetings','opportunities','quotations','orders','tasks','reports']){await goto(route);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`mobile overflow ${route}`);}
 await goto('customers');await page.getByRole('textbox',{name:'Search customers'}).fill('Al Noor');assert.equal(await page.locator('tbody tr').count(),1);await page.getByRole('button',{name:/Al Noor Events Amina Noor/}).click();await page.screenshot({path:'scripts/crm-demo/mobile-profile.png',fullPage:true});await close();
 assert.deepEqual(errors,[]);assert.deepEqual(calls,[]);console.log('PASS: acceptance journey, probability history, quotation totals, file versions, company isolation, refresh persistence, all 8 routes, calendar, search, mobile overflow, no page errors or production API calls.');
 fs.writeFileSync('scripts/crm-demo/test-result.json',JSON.stringify({passed:true,at:new Date().toISOString(),errors,productionCalls:calls,customer:cust.id,opportunity:opp.id,order:order.id},null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
