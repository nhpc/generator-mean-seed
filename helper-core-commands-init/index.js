/**
@todo
- remove the need to check this.optSubGenerators in EVERY function (i.e. find a way to NOT call this generator AT ALL if sub generator is wrong, but hookFor doesn't seem to be able to be conditionally called based on prompts..?)

@toc
1. gitInit
2. gitBranch
3. gitCheckout

NOTE: uses Yeoman this.spawnCommand call to run commands (since need to handle Windows/different operating systems and can't use 'exec' since that doesn't show (live) output)
*/

'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var CommandsMod =require('../common/commands/commands.js');

var HelperCoreCommandsInitGenerator = module.exports = function HelperCoreCommandsInitGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	//copy over prompt options to 'this' scope for templating
	var xx;
	for(xx in this.options.props) {
		this[xx] =this.options.props[xx];
	}
};

util.inherits(HelperCoreCommandsInitGenerator, yeoman.generators.NamedBase);


//have to break async / promise commands into SEPARATE Yeoman functions since chaining isn't working... wtf?
/**
Just in case - check if git init'ed yet by running (any) git command and if fails (non-zero code), run git init and commit so we ensure we have a (master) branch for future commands (otherwise they will fail).
@toc 1.
@method gitInit
*/
HelperCoreCommandsInitGenerator.prototype.gitInit = function gitInit() {
if(this.optSubGenerators.indexOf('helper-core-commands-init') >-1) {
if(1) {
// if(this.optUseGitSeparateBranch) {
	var self =this;
	var cb = this.async();
	// var yoBranch ='yo-'+self.optSubGenerators[0];		//use the name of the first (sub)generator, which is the main one being called
	CommandsMod.run('git', ['status', '-s'], {yoThis: self})
	// CommandsMod.run('git', ['init', '.'], {yoThis: self})
	.then(function(ret1) {
		if(ret1.code !==0) {		//if non-zero code, git init to start the new repo / branches
			// CommandsMod.run('git', ['init', '.', '&&', 'git', 'add', '.', '&&', 'git', 'commit -am', '"init"'], {yoThis: self})
			CommandsMod.run('git', ['init', '.'], {yoThis: self})
			.then(function(ret2) {
				CommandsMod.run('git', ['add', '.'], {yoThis: self})
				.then(function(ret3) {
					CommandsMod.run('git', ['commit', '-am', '"init"'], {yoThis: self})
					.then(function(ret4) {
						cb();
					}, function(retErr4) {
						cb();
					});
				}, function(retErr3) {
					cb();
				});
			}, function(retErr2) {
				cb();
			});
		}
		else {
			// console.log('cb called');
			cb();
		}
	}, function(retErr) {
		// console.log('cb called ERROR');
		cb();
	});
}
}
};

/**
Must first create (if doesn't already exist) the branch - need to do this in a separate command since it will fail if it already exists
@toc 2.
@method gitBranch
*/
HelperCoreCommandsInitGenerator.prototype.gitBranch = function gitBranch() {
if(this.optSubGenerators.indexOf('helper-core-commands-init') >-1) {
if(1) {
// if(this.optUseGitSeparateBranch) {
	var self =this;
	var cb = this.async();
	var yoBranch ='yo-'+self.optSubGenerators[0];		//use the name of the first (sub)generator, which is the main one being called
	CommandsMod.run('git', ['branch', yoBranch], {yoThis: self})
	.then(function(ret1) {
		// console.log('cb called');
		cb();
	}, function(retErr) {
		// console.log('cb called ERROR');
		cb();
	});
}
}
};

/**
@toc 3.
@method gitCheckout
*/
HelperCoreCommandsInitGenerator.prototype.gitCheckout = function gitCheckout() {
if(this.optSubGenerators.indexOf('helper-core-commands-init') >-1) {
if(1) {
// if(this.optUseGitSeparateBranch) {
	var self =this;
	var cb = this.async();
	var yoBranch ='yo-'+self.optSubGenerators[0];		//use the name of the first (sub)generator, which is the main one being called
	CommandsMod.run('git', ['checkout', yoBranch], {yoThis: self})
	.then(function(ret1) {
		// console.log('cb called');
		cb();
	}, function(retErr) {
		// console.log('cb called ERROR');
		cb();
	});
}
}
};