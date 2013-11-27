/**
@fileOverview

@module array
@class array

@toc
*/

'use strict';

var ArrayMod =require('./array.js');

describe('array.setNestedKeyVal', function() {
	it("should work", function() {
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
});