/**
@module <%= optControllerName %>
@class <%= optControllerName %>Api

@toc
1. rpcTodo
*/

'use strict';

var lodash = require('lodash');
var inherits = require('util').inherits;

var dependency =require('../../../dependency.js');
var pathParts =dependency.buildPaths(__dirname, {});

// var Base = require('./base');
// var Base = require('../../../routes/api/base.js');		//can't pass this in since it's used with inherits (which has to be outside the function definition??)
var Base =require(pathParts.routes+'api/base.js');

var <%= optControllerNameCaps %>Mod = require(pathParts.controllers+'<%= optControllerName %>/<%= optControllerName %>.js');

var sample<%= optControllerNameCaps %>Return = {
	_id: "objectid",
	//TODO
};

var defaults = {
	group: '<%= optControllerName %>',
	info: '<%= optControllerNameCaps %> API',
	namespace: '<%= optControllerNameCaps %>'
};

var db;

module.exports = <%= optControllerNameCaps %>Api;

/**
@param {Object} options
	@param {Object} db
*/
function <%= optControllerNameCaps %>Api(options){
	this.opts = lodash.extend({}, defaults, options||{});
	Base.call(this, this.opts);
	
	db =this.opts.db;
}

inherits(<%= optControllerNameCaps %>Api, Base);

<%= optControllerNameCaps %>Api.prototype.getRpcMethods = function(){
	return {
		todo: this.rpcTodo()
	};
};

/**
@toc 1.
@method rpcTodo
**/
<%= optControllerNameCaps %>Api.prototype.rpcTodo = function(){
	var self = this;

	return {
		info: '[describe this api route/call - TODO]',
		params: {
			param1: { type: 'string', required: true, info: "[describe param1 - TODO]" },
			param2: { type: 'string', info: "[describe param2 - TODO]" }
		},
		returns: {
			code: 'string',
			msg: 'string',
			results: 'array'
		},
		/**
		@method action
		@param {Object} params
			@param {Object} data
		@param {Object} out callback object which provides `win` and `fail` functions for handling `success` and `fail` callbacks
			@param {Function} win Success callback
			@param {Function} fail Fail callback
		**/
		action: function(params, out) {
			var promise =<%= optControllerNameCaps %>Mod.todo(db, params, {});
			promise.then(function(ret1) {
				out.win(ret1);
			}, function(err) {
				self.handleError(out, err, {});
			});
		}
	};
};