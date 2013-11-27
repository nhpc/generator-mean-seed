'use strict';

describe('<%= optModulePrefix %><%= optServiceNameCamel %> factory', function() {
	var scope ={}, <%= optModulePrefix %><%= optServiceNameCamel %>;
	
	// beforeEach(module('myApp'));
	beforeEach(module('app'));
	
	beforeEach(inject(function(_$rootScope_, _<%= optModulePrefix %><%= optServiceNameCamel %>_) {
		<%= optModulePrefix %><%= optServiceNameCamel %> =_<%= optModulePrefix %><%= optServiceNameCamel %>_;
		
		scope = _$rootScope_.$new();
	}));
	
	afterEach(function() {
	});
	
	/*
	it('should do something', function() {
	});
	*/
});