import test from 'node:test';import assert from 'node:assert/strict';import {numeric,measurement,canSetStatus} from '../assets/js/inspection-domain.js';
test('German decimal comma is accepted',()=>assert.equal(numeric('12,5'),12.5));
test('measurement rejects out-of-range ok result',()=>{const step={checks:{measurement:{enabled:true,min:10,max:20}}};assert.equal(measurement(step,{value:'25'}).kind,'outside');assert.match(canSetStatus(step,{reading:{value:'25'}},{},'ok'),/Außerhalb/);});
