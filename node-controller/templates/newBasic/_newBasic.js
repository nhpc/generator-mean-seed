/**
@module <%= optControllerName %>
@class <%= optControllerName %>

@toc
1. todo
*/

'use strict';

var Q = require('q');
var lodash = require('lodash');
var async = require('async');
// var moment = require('moment');

var dependency =require('../../../dependency.js');
var pathParts =dependency.buildPaths(__dirname, {});

var StringMod =require(pathParts.services+'string/string.js');
var MongoDBMod =require(pathParts.services+'mongodb/mongodb.js');
var CrudMod =require(pathParts.services+'crud/crud.js');
var LookupMod =require(pathParts.services+'lookup/lookup.js');
var DatetimeMod =require(pathParts.services+'datetime/datetime.js');
var ArrayMod =require(pathParts.services+'array/array.js');

var self;

var defaults = {
};

/**
<%= optControllerNameCaps %> module constructor
@class <%= optControllerNameCaps %>
@constructor
@param options {Object} constructor options
**/
function <%= optControllerNameCaps %>(options){
    this.opts = lodash.merge({}, defaults, options||{});

	self = this;
}

/**
@toc 1.
@method todo
@param {Object} data
	@param {String} param1 TODO
	@param {String} [param2] TODO
@param {Object} params
@return {Object} (via Promise)
		@param {Number} code
		@param {String} msg
		@param {Array} results
**/
<%= optControllerNameCaps %>.prototype.todo = function(db, data, params) {
	var deferred = Q.defer();
	var ret ={code:0, msg:'<%= optControllerNameCaps %>.todo ', results:false};

	//TODO
	deferred.resolve(ret);

	return deferred.promise;
};


/**
Module exports
@method exports
@return {<%= optControllerNameCaps %>} <%= optControllerNameCaps %> constructor
**/
module.exports = new <%= optControllerNameCaps %>({});