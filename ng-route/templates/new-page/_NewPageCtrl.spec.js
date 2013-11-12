'use strict';

describe('<%= routeNameCtrl %>', function(){
	var ctrl, scope ={};
	
	beforeEach(module('myApp'));
	
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('<%= routeNameCtrl %>', {$scope: scope});
	}));
	
	/*
	it('should do something', function() {
	});
	*/
});