'use strict';

describe('<%= optModulePrefix %><%= optDirectiveNameCamel %>', function() {
	var elm, scope, $compile, $timeout;
	
	// beforeEach(module('myApp'));
	beforeEach(module('app'));
	
	/**
	@param params
	*/
	var createElm =function(params) {
		var html ="<div><div <%= optModulePrefix %>-<%= optDirectiveName %>>"+
		"</div></div>";
		elm =angular.element(html);
		
		$compile(elm)(scope);
		scope.$digest();
		scope.$apply();		//NOTE: required otherwise the directive won't be compiled!!!! ... wtf?
		var elements ={
			'<%= optDirectiveName %>':elm.find('div').children().find('div')
		};
		return elements;
	};
	
	beforeEach(inject(function(_$rootScope_, _$compile_, _$timeout_) {
		$compile = _$compile_;
		$timeout = _$timeout_;
		scope = _$rootScope_.$new();
	}));
	
	afterEach(function() {
	});
	
	/*
	it('should do something', function() {
	});
	*/
});