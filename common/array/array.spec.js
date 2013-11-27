/**
@fileOverview

@module array
@class array

@toc
*/

'use strict';

var ArrayMod =require('./array.js');

describe('array.setNestedKeyVal', function() {
	it("should set an end object key", function() {
		var base ={
			key1: [
				{
					key3: ''
				},
				{
					dummyVal: ''
				}
			]
		};
		var newValue ='myValue';
		var newBase =ArrayMod.setNestedKeyVal(base, ['key1', 0, 'key3'], newValue, {});
		expect(newBase.key1[0].key3).toBe(newValue);
	});
	
	it("should set an end array key", function() {
		var base ={
			key1: [
				{
					key3: [
						{
							key41: 'yes',
							key42: 'no'
						},
						{
							key43: 'yes',
							key44: 'no'
						}
					]
				},
				{
					dummyVal: ''
				}
			]
		};
		var newValue ={
			newKey1: 'maybe',
			newKey2: 'so'
		};
		var newBase =ArrayMod.setNestedKeyVal(base, ['key1', 0, 'key3', 1], newValue, {});
		// console.log('newBase: '+JSON.stringify(newBase));
		expect(newBase.key1[0].key3[1]).toBe(newValue);
	});
	
	it("should return base if no keys.length", function() {
		var base ={
			key1: [
				{
					key3: ''
				}
			]
		};
		var newBase =ArrayMod.setNestedKeyVal(base, [], 'some value', {});
		expect(newBase).toBe(base);
	});
	
	it("should preserve the input parameters - array manipulation inside a function can leak outside the function if the original parameters are changed without copying first!", function() {
		var base ={
			key1: [
				{
					key3: ''
				}
			]
		};
		var keys =['key1', 0, 'key3'];
		var keysLengthOrig =keys.length;
		var newBase =ArrayMod.setNestedKeyVal(base, keys, 'some value', {});
		expect(newBase).toBe(base);
		expect(keys.length).toBe(keysLengthOrig);
	});
});

describe('array.evalBase', function() {
	it("should preserve all input parameters - array manipulation inside a function can leak outside the function if the original parameters are changed without copying first!", function() {
		var val ='the value!';
		var base ={
			key1: [
				{
					key3: val
				}
			]
		};
		var keys =['key1', 0, 'key3'];
		var keysLengthOrig =keys.length;
		var newVal =ArrayMod.evalBase(base, keys, {});
		expect(newVal).toBe(val);
		expect(keys.length).toBe(keysLengthOrig);
	});
});