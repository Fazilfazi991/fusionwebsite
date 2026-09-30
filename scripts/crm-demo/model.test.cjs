const assert=require('node:assert/strict');const fs=require('fs');const Module=require('module');const ts=require('typescript');
const compiled=ts.transpileModule(fs.readFileSync('lib/multi-company-crm/model.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;const mod=new Module('crm-model');mod._compile(compiled,'crm-model.js');const m=mod.exports;
let state=m.seed();for(const company of m.companies){for(const k of m.kinds)assert(state.records[k].filter(r=>r.company===company.id).length>=4);}
assert.throws(()=>m.saveRecord(state,'customers',{id:'packaging-c0',name:'Wrong entity'},'cross-entity edit'),/workspace/);
assert.throws(()=>m.saveRecord(state,'meetings',{customerId:'packaging-c0'},'cross-entity link'),/workspace/);
assert.throws(()=>m.convertOrder(state,state.records.opportunities.find(o=>o.id==='advertising-o0'),'opportunities'),/first/);
assert.throws(()=>m.convertOrder(state,state.records.quotations.find(q=>q.id==='advertising-q0'),'quotations'),/first/);
assert.throws(()=>m.convertOrder(state,state.records.opportunities.find(o=>o.id==='packaging-o1'),'opportunities'),/first/);
state=m.saveRecord(state,'opportunities',{id:'advertising-o0',stage:'Won'},'won');assert.equal(state.records.opportunities.find(o=>o.id==='advertising-o0').probability,70);
let result=m.convertOrder(state,state.records.opportunities.find(o=>o.id==='advertising-o5'),'opportunities');assert.equal(result.state.records.orders.length,state.records.orders.length+1);let repeated=m.convertOrder(result.state,result.state.records.opportunities.find(o=>o.id==='advertising-o5'),'opportunities');assert.equal(repeated.state.records.orders.length,result.state.records.orders.length);
assert.equal(m.total({items:[{quantity:500,price:30},{quantity:10,price:100}],discount:1000,tax:5}),15750);
assert.equal(m.total({items:[{quantity:1,price:10}],discount:100,tax:5}),0);
assert(m.seed().records.meetings.some(r=>r.date===m.today(1)));assert(m.seed().records.meetings.some(r=>r.date===m.today()));
console.log('PASS: seed counts, relative dates, edit and relationship scoping, conversion eligibility, independent probabilities, idempotent order conversion, multi-item quotation totals.');
