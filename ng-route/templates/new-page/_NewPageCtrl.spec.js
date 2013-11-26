'use strict';

describe('<%= optRouteNameCtrl %>', function(){
	var ctrl, scope ={};
	
	beforeEach(module('myApp'));
	
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('<%= optRouteNameCtrl %>', {$scope: scope});
	}));
	
	/*
	it('should do something', function() {
	});
	*/
});