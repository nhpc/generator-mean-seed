/**
A provider style service (most complicated but most configurable/powerful) - see here for more info:
- http://stackoverflow.com/questions/15666048/angular-js-service-vs-provider-vs-factory
- http://docs.angularjs.org/api/AUTO.$provide

@toc
//TODO

@usage
@usage
//js Angular controller:
angular.module('myApp').controller('TestCtrl', ['$scope', '<%= optModulePrefix %><%= optServiceNameCamel %>', function($scope, <%= optModulePrefix %><%= optServiceNameCamel %>) {
	var retVal =(<%= optModulePrefix %><%= optServiceNameCamel %>.test('my test val'));
	console.log(retVal);
}]);

*/

'use strict';

angular.module('app').provider('<%= optModulePrefix %><%= optServiceNameCamel %>', function() {
	// NOTE: In the provider function, you cannot inject any service or factory. That's why there's no bracket '[' above before 'function()'. This can only be done at the "$get" method.

	//provider (private) properties (though they can be exposed from the this.$get function below)
	/*
	TODO
	this.name ='default';
	
	this.prop2 ={
		'p1': 'some val'
	};
	*/
	
	//public properties and methods (whatever is in the 'return' object in the this.$get function). This is the service factory function. Note you CAN inject other services here (inside the '[' bracket).
	this.$get =[ function() {
		//TODO
		// var name =this.name;
		return {
			test: function(input) {
				return 'provider input: '+input;
			}
			/*
			sayHello: function() {
				return "Hello, "+ name +"!";
			},
			
			prop2: this.prop2		//expose the private property declared above
			*/
		};
	}];
	
	//private methods
	/*
	TODO
	this.setName =function(name) {
		this.name =name;
	};
	*/
	
});