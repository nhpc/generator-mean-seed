/**
@fileOverview

@toc
1. run
*/

'use strict';

var Q = require('q');

var self;
var yoThis =false;		//will be used for calling yeoman commands like 'this.spawnCommand'

/**
@param {Object} opts
*/
function Commands(opts) {
	self =this;
}

/**
Run a commmand given the command and args
@toc 1.
@method run
@param {String} command
@param {Array} args
@param {Object} params
	@param {Object} yoThis The Yeoman 'this' keyword reference / scope so can call yeoman functions
@return {Object} (via Promise)
*/
Commands.prototype.run =function(command, args, params) {
	var deferred = Q.defer();
	var ret ={code:0, msg:''};
	
	if(!yoThis) {
		yoThis =params.yoThis;
	}
	
	var cmd =yoThis.spawnCommand(command, args);
	cmd.on('exit', function(code) {
		yoThis.log.writeln('child process exited with code: '+code);
		yoThis.log.writeln("command run and done: "+command+" args: "+args);
		ret.code =code;
		deferred.resolve(ret);
	});
	
	return deferred.promise;
};

module.exports = new Commands({});