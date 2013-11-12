/**
@todo
- remove the need to check this.subGenerator in EVERY function (i.e. find a way to NOT call this generator AT ALL if subGenerator is wrong, but hookFor doesn't seem to be able to be conditionally called based on prompts..?)

NOTE: uses Yeoman this.spawnCommand call to run commands (since need to handle Windows/different operating systems and can't use 'exec' since that doesn't show (live) output)
*/

'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var NgRouteGenerator = module.exports = function NgRouteGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	//copy over prompt options to 'this' scope for templating
	var xx;
	for(xx in this.options.props) {
		this[xx] =this.options.props[xx];
		console.log(xx+': '+this[xx]);
	}
};

util.inherits(NgRouteGenerator, yeoman.generators.NamedBase);

NgRouteGenerator.prototype.askFor = function askFor() {
if(this.subGenerator =='ng-route') {
	var cb = this.async();
	
	var prompts = [
	];
	
	this.prompt(prompts, function (props) {
		
		cb();
	}.bind(this));
}
};

NgRouteGenerator.prototype.files = function files() {
if(this.subGenerator =='ng-route') {

	//A. make all directories (do it at top so they're all created since templated files are collected here at the top)
	// this.mkdir('app');
	
	
	//B. template files (all templated files TOGETHER here)
	// this.template('_bower.json', 'bower.json');
	
	
	//C. copy files & directories
	//NOTE: leading with just a '.' sometimes doesn't copy over properly / gives error so add the '_' even though not templating
	// this.copy('_.bowerrc', '.bowerrc');
	
}
};

NgRouteGenerator.prototype.logNextSteps = function logNextSteps() {
if(this.subGenerator =='ng-route') {
	// this.log.writeln('Next steps:\n1. IF on Windows, run `./node_modules/protractor/bin/install_selenium_standalone`\n2. IF skipped any of the auto installs, run the install/build scripts - npm, bower, grunt\n3. Run `node run.js`\n4. Open a browser to `http://localhost:3000` to view the app!\nSee the README.md file for more info.');
}
};