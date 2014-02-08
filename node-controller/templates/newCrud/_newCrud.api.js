/**
@module <%= optControllerName %>
@class <%= optControllerName %>Api

@toc
1. rpcSearch
2. rpcRead
3. rpcSave (create or update, pending if _id field is present)
3.1. rpcSaveBulk
4. rpcDelete
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
		search: this.rpcSearch(),
		read: this.rpcRead(),
		save: this.rpcSave(),
		saveBulk: this.rpcSaveBulk(),
		delete1: this.rpcDelete()
	};
};

/**
@toc 1.
@method rpcSearch
**/
<%= optControllerNameCaps %>Api.prototype.rpcSearch = function(){
	var self = this;

	return {
		info: 'Search <%= optControllerName %>s',
		params: {
			searchString: { type: 'string', info: "Text to search for" },
			searchFields: { type: 'array', info: "Fields to search searchString within, i.e. ['first_name', 'last_name']" },
			skipIds: { type: 'array', info: "_id fields to skip (will be added to query AFTER they are converted to mongo ids (if necessary))" },
			fields: { type: 'object', info: "Fields to return, i.e. {_id:1, first_name:1, last_name:1}" },
			skip: { type: 'number', info: "Where to start returning from (like a cursor), default =0" },
			limit: { type: 'number', info: "How many to return, default =20" }
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
			var promise =<%= optControllerNameCaps %>Mod.search(db, params, {});
			promise.then(function(ret1) {
				out.win(ret1);
			}, function(err) {
				self.handleError(out, err, {});
			});
		}
	};
};

/**
@toc 2.
@method rpcRead
**/
<%= optControllerNameCaps %>Api.prototype.rpcRead = function(){
	var self = this;

	return {
		info: 'Read one or more <%= optControllerName %>s',
		params: {
			_id: { type: 'string', info: "Id for object to lookup. Will be converted to mongo object id if necessary." },
			_ids: { type: 'array', info: "Ids to look up object info on Will be converted to mongo object ids if necessary." },
			fullQuery: { type: 'object', info: "Full mongo query to use directly for read" },
			fields: { type: 'object', info: "Mongo query for which fields in the record to return. Use the empty object {} to get all fields." },
			query: { type: 'object', info: "Additional query for lookup (will be added to the id(s) query)." }
		},
		returns: {
			<%= optControllerName %>: sample<%= optControllerNameCaps %>Return
		},
		/**
		@method action
		@param {Object} params
			@param {Object} data (detailed above)
		@param {Object} out callback object which provides `win` and `fail` functions for handling `success` and `fail` callbacks
			@param {Function} win Success callback
			@param {Function} fail Fail callback
		**/
		action: function(params, out) {
			var promise =<%= optControllerNameCaps %>Mod.read(db, params, {});
			promise.then(function(ret1) {
				out.win(ret1);
			}, function(err) {
				self.handleError(out, err, {});
			});
		}
	};
};

/**
@toc 3.
@method rpcSave
**/
<%= optControllerNameCaps %>Api.prototype.rpcSave = function(){
	var self = this;

	return {
		info: 'Save (create or update (if _id field is present)) one <%= optControllerName %>',
		params: {
			<%= optControllerName %>: {type: 'object', required: false, info: "The <%= optControllerName %> object to insert/update. If _id is left out, will create this <%= optControllerName %> with a new _id. All other parameters are optional and are the fields that will be updated. NOTE: <%= optControllerName %> data will only be returned on CREATE, not on update." }
		},
		returns: {
			<%= optControllerName %>: sample<%= optControllerNameCaps %>Return
		},
		/**
		@method action
		@param {Object} params
			@param {Object} data (detailed above)
		@param {Object} out callback object which provides `win` and `fail` functions for handling `success` and `fail` callbacks
			@param {Function} win Success callback
			@param {Function} fail Fail callback
		**/
		action: function(params, out) {
			var promise =<%= optControllerNameCaps %>Mod.save(db, params, {});
			promise.then(function(ret1) {
				out.win(ret1);
			}, function(err) {
				self.handleError(out, err, {});
			});
		}
	};
};

/**
@toc 3.1.
@method rpcSaveBulk
**/
<%= optControllerNameCaps %>Api.prototype.rpcSaveBulk = function(){
	var self = this;

	return {
		info: "Bulk save (create or update (if _id field is present)) <%= optControllerName %>s.",
		params: {
			<%= optControllerName %>: {type: 'array', required: true, info: "Array of the <%= optControllerName %> objects to insert/update. For each <%= optControllerName %>: If _id is left out, will create with a new _id. All other parameters are optional and are the fields that will be updated. NOTE: <%= optControllerName %> data will only be returned on CREATE, not on update." }
		},
		returns: {
			<%= optControllerName %>: [
				sample<%= optControllerNameCaps %>Return
			]
		},
		/**
		@method action
		@param {Object} params
			@param {Object} data params (detailed above)
		@param {Object} out callback object which provides `win` and `fail` functions for handling `success` and `fail` callbacks
			@param {Function} win Success callback
			@param {Function} fail Fail callback
		**/
		action: function(params, out) {
			var promise =<%= optControllerNameCaps %>Mod.saveBulk(db, params, {});
			promise.then(function(ret1) {
				out.win(ret1);
			}, function(err) {
				self.handleError(out, err, {});
			});
		}
	};
};

/**
@toc 4.
@method rpcDelete
**/
<%= optControllerNameCaps %>Api.prototype.rpcDelete = function(){
	var self = this;

	return {
		info: 'Removes one or more <%= optControllerName %>s',
		params: {
			<%= optControllerName %>_id: { type: 'string', info: "Id for object to delete. Will be converted to mongo object id if necessary." },
			_ids: { type: 'array', info: "Ids of objects to delete. Will be converted to mongo object ids if necessary." }
		},
		returns: {
			<%= optControllerName %>: sample<%= optControllerNameCaps %>Return
		},
		/**
		@method action
		@param {Object} params
			@param {Object} data (detailed above)
		@param {Object} out callback object which provides `win` and `fail` functions for handling `success` and `fail` callbacks
			@param {Function} win Success callback
			@param {Function} fail Fail callback
		**/
		action: function(params, out) {
			var promise =<%= optControllerNameCaps %>Mod.delete1(db, params, {});
			promise.then(function(ret1) {
				out.win(ret1);
			}, function(err) {
				self.handleError(out, err, {});
			});
		}
	};
};