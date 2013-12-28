'use strict';

describe('<%= optModulePrefix %><%= optServiceNameCamel %> factory', function() {
	var $rootScope ={}, <%= optModulePrefix %><%= optServiceNameCamel %>;
	
	beforeEach(module('myApp'));
	
	beforeEach(inject(function(_$rootScope_, _<%= optModulePrefix %><%= optServiceNameCamel %>_) {
		$rootScope = _$rootScope_;
		<%= optModulePrefix %><%= optServiceNameCamel %> =_<%= optModulePrefix %><%= optServiceNameCamel %>_;
	}));
	
	// afterEach(function() {
	// });
	
	/*
	it('should do something', function() {
	});
	*/
});