/**
Tests for all /api/<%= optControllerName %> endpoints

NOTE: "it" blocks with modularized/nested function and async code can be finicky - I don't think nested "it" blocks are allowed BUT need an outer "it" block to ensure the async code gets run (otherwise it will just complete immediately before running any tests). So if and when to use "done" for the it blocks and where to put them is sometimes hard to follow/trace. When in doubt, try an "it" block and if it errors or doesn't complete, try just putting an "expect" there directly - it's likely already in an "it" block..

@toc
public methods
1. <%= optControllerNameCaps %>
2. <%= optControllerNameCaps %>.run
private methods
3.5. clearData
3. before
4. after
5. go
	6. save
	6.1. saveBulk
	6.2. saveUpdate
	7. read
	8. search
	9. delete1
*/

'use strict';

var https = require("https");
var request = require('request');
var async = require('async');
var lodash = require('lodash');
var Q = require('q');

var dependency =require('../../../dependency.js');
var pathParts =dependency.buildPaths(__dirname, {});

var MongoDBMod =require(pathParts.services+'mongodb/mongodb.js');

var self, db, api;

//NOTE: make sure to namespace all values to ensure no conflicts with other modules that run asynchronously and may be altering the same data otherwise - leading to odd and very hard to debug errors..
//NOTE: make sure to namespace all values to ensure no conflicts with other modules that run asynchronously and may be altering the same data otherwise - leading to odd and very hard to debug errors..
var ns ='<%= optControllerName %>_';		//namespace
var TEST_<%= optControllerNameUpper %> =[
	{
		title: ns+'title1'		//TODO
	},
	{
		title: ns+'title2'		//TODO
	},
	{
		title: ns+'TiTle 3'		//TODO
	},
	{
		title: ns+'titLe 4'		//TODO
	}
];

/**
Variable to store variables we need to use in multiple tests (i.e. counters)
@property globals
@type Object
*/
var globals ={
	numSaveBulk: 2		//number of inserts/documents saved via the bulk call
};

module.exports = <%= optControllerNameCaps %>;

/**
Main function/object (will be exported)
@toc 1.
@method <%= optControllerNameCaps %>
@param {Object} params
	@param {Object} db
	@param {Object} api
	// @param {Object} MongoDBMod
*/
function <%= optControllerNameCaps %>(params) {
	db =params.db;
	api =params.api;
	// MongoDBMod =params.MongoDBMod;
	
	self =this;
}

/**
@toc 2.
@method <%= optControllerNameCaps %>.run
@param {Object} params
*/
<%= optControllerNameCaps %>.prototype.run =function(params) {
	var deferred =Q.defer();
	
	describe('<%= optControllerNameCaps %>Module', function() {
		it("should test all <%= optControllerName %> calls", function(done)
		{
			var promise =before({});
			promise.then(function(ret1) {
				done();
				deferred.resolve(ret1);
			}, function(err) {
				deferred.reject(err);
			});
		});
	});
	
	return deferred.promise;
};

/**
@toc 3.5.
@method clearData
@param {Object} params
@return {Promise} This will ALWAYS resolve (no reject)
*/
function clearData(params) {
	var deferred =Q.defer();
	var ret ={msg: ''};
	
	//drop test data
	var titles =[];		//TODO
	var ii;
	for(ii =0; ii<TEST_<%= optControllerNameUpper %>.length; ii++) {
		titles[ii] =TEST_<%= optControllerNameUpper %>[ii].title;		//TODO
	}
	db.<%= optControllerNameUnderscore %>.remove({title: {$in:titles} }, function(err, numRemoved) {		//TODO
		if(err) {
			ret.msg +="db.<%= optControllerNameUnderscore %>.remove Error: "+err;
		}
		else if(numRemoved <1) {
			ret.msg +="db.<%= optControllerNameUnderscore %>.remove Num removed: "+numRemoved;
		}
		else {
			ret.msg +="db.<%= optControllerNameUnderscore %>.remove Removed "+numRemoved;
		}
		
		deferred.resolve(ret);
		
	});
	
	return deferred.promise;
}

/**
@toc 3.
@method before
@param {Object} params
*/
function before(params) {
	var deferred =Q.defer();
	
	var promiseClearData =clearData({})
	.then(function(ret1) {
		console.log('\n<%= optControllerNameCaps %> BEFORE: '+ret1.msg);

		var promise =go({});
		promise.then(function(ret1) {
			var promiseAfter =after({});
			promiseAfter.then(function(retAfter) {
				deferred.resolve(ret1);
			}, function(err) {
				deferred.reject(err);
			});
		}, function(err) {
			deferred.reject(err);
		});
	});

	return deferred.promise;
}

/**
Do clean up to put database back to original state it was before ran tests (remove test data, etc.)
@toc 4.
@method after
@param {Object} params
*/
function after(params) {
	var deferred =Q.defer();
	
	var promiseClearData =clearData({})
	.then(function(ret1) {
		console.log('\n<%= optControllerNameCaps %> AFTER: '+ret1.msg);
		deferred.resolve({});
	});
	
	return deferred.promise;
}

/**
@toc 5.
@method go
@param {Object} params
*/
function go(params) {
	var deferred =Q.defer();
	var reqObj;
	
	/**
	Tests both save AND saveBulk (via function call) calls
	@toc 6.
	@method save
	@param {Object} opts
	*/
	var save =function(opts) {
		var promises =[], ii, params, deferreds =[];
		var data;
		var numBulk =globals.numSaveBulk;
		var <%= optControllerNameCaps %>Bulk =TEST_<%= optControllerNameUpper %>.slice(0, numBulk);
		var <%= optControllerNameCaps %>NonBulk =TEST_<%= optControllerNameUpper %>.slice(numBulk, TEST_<%= optControllerNameUpper %>.length);
		
		//non bulked
		for(ii =0; ii<<%= optControllerNameCaps %>NonBulk.length; ii++) {
			(function(ii) {
				deferreds[ii] =Q.defer();
				params ={
					<%= optControllerName %>: <%= optControllerNameCaps %>NonBulk[ii]
				};
				api.expectRequest({method:'<%= optControllerNameCaps %>.save'}, {data:params}, {}, {})
				.then(function(res) {
					data =res.data.result;
					expect(data.<%= optControllerName %>.title).toEqual(<%= optControllerNameCaps %>NonBulk[ii].title);		//TODO
					TEST_<%= optControllerNameUpper %>[(ii+numBulk)]._id =data.<%= optControllerName %>._id;		//save for use later
					deferreds[ii].resolve({});
				});
				
				promises[ii] =deferreds[ii].promise;
			})(ii);
		}
		
		//once non-bulk promises are all done
		Q.all(promises).then(function(ret1) {
			saveBulk({});
		}, function(err) {
			saveBulk({});
		});
	};
	
	/**
	@toc 6.1.
	@method saveBulk
	@param {Object} opts
	*/
	var saveBulk =function(opts) {
		var ii, params;
		var data;
		var numBulk =globals.numSaveBulk;
		var <%= optControllerNameCaps %>Bulk =TEST_<%= optControllerNameUpper %>.slice(0, numBulk);
		var <%= optControllerNameCaps %>NonBulk =TEST_<%= optControllerNameUpper %>.slice(numBulk, TEST_<%= optControllerNameUpper %>.length);
		
		//bulked
		params ={
			<%= optControllerName %>: <%= optControllerNameCaps %>Bulk
		};
		api.expectRequest({method:'<%= optControllerNameCaps %>.saveBulk'}, {data:params}, {}, {})
		.then(function(res) {
			data =res.data.result;
			for(ii =0; ii<<%= optControllerNameCaps %>Bulk.length; ii++) {
				expect(data.<%= optControllerName %>[ii].title).toEqual(<%= optControllerNameCaps %>Bulk[ii].title);		//TODO
				expect(data.<%= optControllerName %>[ii]._id).toBeDefined();
				TEST_<%= optControllerNameUpper %>[ii]._id =data.<%= optControllerName %>[ii]._id;		//save for use later
			}
			saveUpdate({});
		});
	};
	
	
	/**
	@toc 6.2.
	@method saveUpdate
	@param {Object} opts
	*/
	var saveUpdate =function(opts) {
		TEST_<%= optControllerNameUpper %>[0].title ='<%= optControllerName %> new title';		//TODO - update a field to save
		var params =
		{
			<%= optControllerName %>: TEST_<%= optControllerNameUpper %>[0]
		};
		api.expectRequest({method:'<%= optControllerNameCaps %>.save'}, {data:params}, {}, {})
		.then(function(res) {
			var data =res.data.result;
			read({});		//go to next function/test in sequence
		});
	};
	
	/**
	@toc 7.
	@method read
	@param {Object} opts
	*/
	var read =function(opts) {
		var params ={
			_id: TEST_<%= optControllerNameUpper %>[0]._id
		};
		api.expectRequest({method:'<%= optControllerNameCaps %>.read'}, {data:params}, {}, {})
		.then(function(res) {
			var data =res.data.result;
			expect(data.result).toBeDefined();
			expect(data.result.title).toBe(TEST_<%= optControllerNameUpper %>[0].title);		//TODO
			search({});
		});
	};
	
	/**
	@toc 8.
	@method search
	@param {Object} opts
	*/
	var search =function(opts) {
		//should return all <%= optControllerName %>s with no search query entered
		var params ={
		};
		api.expectRequest({method:'<%= optControllerNameCaps %>.search'}, {data:params}, {}, {})
		.then(function(res) {
			var data =res.data.result;
			expect(data.results.length).toBe(TEST_<%= optControllerNameUpper %>.length);
			
			//should return the matched set of <%= optControllerName %>s with a search
			var params ={
				//TODO
				searchString: 'titLe',		//should be case-insensitive
				searchFields: ['title']
				//end: TODO
			};
			api.expectRequest({method:'<%= optControllerNameCaps %>.search'}, {data:params}, {}, {})
			.then(function(res) {
				var data =res.data.result;
				expect(data.results.length).toBe(4);		//TODO
				
				var params ={
					//TODO
					searchString: 'title2',		//do NOT use first [0] item as that was updated/changed via the saveUpdate function!
					searchFields: ['title']
					//end: TODO
				};
				api.expectRequest({method:'<%= optControllerNameCaps %>.search'}, {data:params}, {}, {})
				.then(function(res) {
					var data =res.data.result;
					expect(data.results.length).toBe(1);		//TODO
					
					delete1({});		//go to next function/test in sequence
				});
			});
		});
	};
	
	/**
	@toc 9.
	@method delete1
	@param {Object} opts
	*/
	var delete1 =function(opts) {
		var params ={};
		//should delete a <%= optControllerName %>
		params ={
			<%= optControllerName %>_id: TEST_<%= optControllerNameUpper %>[0]._id
		};
		api.expectRequest({method:'<%= optControllerNameCaps %>.delete1'}, {data:params}, {}, {})
		.then(function(res) {
			var data =res.data.result;
			
			//search now to confirm delete happened properly
			params ={
			};
			api.expectRequest({method:'<%= optControllerNameCaps %>.search'}, {data:params}, {}, {})
			.then(function(res) {
				var data =res.data.result;
				expect(data.results.length).toBe((TEST_<%= optControllerNameUpper %>.length-1));		//should be 1 less now that deleted one
				
				//should delete multiple <%= optControllerName %>s
				params ={
					_ids: [TEST_<%= optControllerNameUpper %>[1]._id, TEST_<%= optControllerNameUpper %>[2]._id]
				};
				api.expectRequest({method:'<%= optControllerNameCaps %>.delete1'}, {data:params}, {}, {})
				.then(function(res) {
					var data =res.data.result;
				
					//search now to confirm delete happened properly
					params ={
					};
					
					api.expectRequest({method:'<%= optControllerNameCaps %>.search'}, {data:params}, {}, {})
					.then(function(res) {
						var data =res.data.result;
						expect(data.results.length).toBe((TEST_<%= optControllerNameUpper %>.length-1-2));		//should be 1 less now that deleted ones
						
						deferred.resolve({});
					});
					
				});
			
			});
		});
	};
	
	save({});		//start all the calls going
	
	return deferred.promise;
}