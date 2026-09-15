import test from 'node:test';import assert from 'node:assert/strict';import {resizeBounds,boundsToElement,elementBounds} from '../mr/editor-geometry.js';
test('resize bounds normalizes drag direction',()=>{assert.deepEqual(resizeBounds({x:1,y:1},{x:-1,y:-1}),{x:0,y:0,width:2,height:2});});
test('element conversion round-trips',()=>{const e={x_pct:60,y_pct:40,w_pct:20,h_pct:10};const b=elementBounds(e,2,1);const r=boundsToElement(b,2,1);assert.deepEqual(r,e);});
