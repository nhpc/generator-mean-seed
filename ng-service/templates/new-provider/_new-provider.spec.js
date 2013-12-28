// see here for more info: http://stackoverflow.com/questions/14771810/how-to-test-angularjs-custom-provider

'use strict';

describe('<%= optModulePrefix %><%= optServiceNameCamel %> provider', function() {
	
	var <%= optModulePrefix %><%= optServiceNameCamel %>Provider;

	beforeEach(function () {
		// Initialize the service provider by injecting it to a fake module's config block
		var fakeModule = angular.module('test.app', function () {});
		fakeModule.config( function (_<%= optModulePrefix %><%= optServiceNameCamel %>Provider_) {
			<%= optModulePrefix %><%= optServiceNameCamel %>Provider = _<%= optModulePrefix %><%= optServiceNameCamel %>Provider_;
		});
		// Initialize test.app injector
		module('app', 'test.app');

		// Kickstart the injectors previously registered 
		// with calls to angular.mock.module
		inject(function () {});
	});
	
	// afterEach(function() {
	// });
	
	it('tests the providers internal function', function () {
		// check sanity
		expect(<%= optModulePrefix %><%= optServiceNameCamel %>Provider).not.toBeUndefined();
		/*
		//TODO
		// configure the provider
		<%= optModulePrefix %><%= optServiceNameCamel %>Provider.mode('local');
		// test an instance of the provider for the custom configuration changes
		expect(<%= optModulePrefix %><%= optServiceNameCamel %>Provider.$get().mode).toBe('local');
		*/
	});
		
	/*
	TODO
	it('should do something', function() {
	});
	*/
});