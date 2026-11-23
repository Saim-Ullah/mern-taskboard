const {test}=require('node:test'); const assert=require('node:assert/strict'); const {validate}=require('../server/validate');
test('trims title',()=>assert.deepEqual(validate({title:'  Build  '}),{title:'Build'}));
test('rejects empty title',()=>assert.throws(()=>validate({title:' '})));
test('rejects invalid status',()=>assert.throws(()=>validate({status:'later'},true)));
test('allows partial status update',()=>assert.deepEqual(validate({status:'done'},true),{status:'done'}));
test('rejects unknown fields',()=>assert.throws(()=>validate({title:'test',admin:true})));
