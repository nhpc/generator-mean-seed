/**
@todo
- remove the need to check this.optSubGenerators in EVERY function (i.e. find a way to NOT call this generator AT ALL if sub generator is wrong, but hookFor doesn't seem to be able to be conditionally called based on prompts..?)

@toc
1. logNextSteps

NOTE: uses Yeoman this.spawnCommand call to run commands (since need to handle Windows/different operating systems and can't use 'exec' since that doesn't show (live) output)
*/

'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var LogNextStepsGenerator = module.exports = function LogNextStepsGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	//copy over prompt options to 'this' scope for templating
	var xx;
	for(xx in this.options.props) {
		this[xx] =this.options.props[xx];
	}
};

util.inherits(LogNextStepsGenerator, yeoman.generators.NamedBase);

/**
@toc 1.
@method logNextSteps
*/
LogNextStepsGenerator.prototype.logNextSteps = function logNextSteps() {
if(this.optSubGenerators.indexOf('log-next-steps') >-1 && this.optLogNextStepsMsg) {
	this.log.writeln(this.optLogNextStepsMsg);
}
};