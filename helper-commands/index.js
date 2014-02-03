/**
@todo
- remove the need to check this.optSubGenerators in EVERY function (i.e. find a way to NOT call this generator AT ALL if sub generator is wrong, but hookFor doesn't seem to be able to be conditionally called based on prompts..?)

@toc
2. commandsNpm
3. commandsBower
4. commandsGrunt
5. commandsSelenium

NOTE: uses Yeoman this.spawnCommand call to run commands (since need to handle Windows/different operating systems and can't use 'exec' since that doesn't show (live) output)
*/

'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var HelperCommandsGenerator = module.exports = function HelperCommandsGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	//copy over prompt options to 'this' scope for templating
	var xx;
	for(xx in this.options.props) {
		this[xx] =this.options.props[xx];
	}
};

util.inherits(HelperCommandsGenerator, yeoman.generators.NamedBase);

/**
@toc 2.
@method commandsNpm
*/
HelperCommandsGenerator.prototype.commandsNpm = function commandsNpm() {
if(this.optSubGenerators.indexOf('helper-commands') >-1) {
	var cb = this.async();
	var self =this;
	
	if(this.optNpmInstall !==undefined && this.optNpmInstall) {
		var command ='npm';
		var args =['install'];
		var cmd =this.spawnCommand(command, args);
		cmd.on('exit', function(code) {
			self.log.writeln('child process exited with code: '+code);
			self.log.writeln("command run and done: "+command+" args: "+args);
			cb();
		});
	}
	else {
		cb();
	}
}
};

/**
@toc 3.
@method commandsBower
*/
HelperCommandsGenerator.prototype.commandsBower = function commandsBower() {
if(this.optSubGenerators.indexOf('helper-commands') >-1) {
	var cb = this.async();
	var self =this;
	
	if(this.optBowerInstall !==undefined && this.optBowerInstall) {
		var command ='bower';
		var args =['update', '&&', 'bower', 'install'];
		var cmd =this.spawnCommand(command, args);
		cmd.on('exit', function(code) {
			self.log.writeln('child process exited with code: '+code);
			self.log.writeln("command run and done: "+command+" args: "+args);
			cb();
		});
	}
	else {
		cb();
	}
}
};

/**
@toc 4.
@method commandsGrunt
*/
HelperCommandsGenerator.prototype.commandsGrunt = function commandsGrunt() {
if(this.optSubGenerators.indexOf('helper-commands') >-1) {
	var cb = this.async();
	var self =this;
	
	if(this.optGruntQ !==undefined && this.optGruntQ) {
		var command ='grunt';
		var args =['q'];
		var cmd =this.spawnCommand(command, args);
		cmd.on('exit', function(code) {
			self.log.writeln('child process exited with code: '+code);
			self.log.writeln("command run and done: "+command+" args: "+args);
			cb();
		});
	}
	else {
		cb();
	}
}
};

/**
@toc 5.
@method commandsSelenium
*/
HelperCommandsGenerator.prototype.commandsSelenium = function commandsSelenium() {
if(this.optSubGenerators.indexOf('helper-commands') >-1) {
	var cb = this.async();
	var self =this;
	
	if(this.optSeleniumInstall !==undefined && this.optSeleniumInstall) {
		var command ='./node_modules/protractor/bin/webdriver-manager update';
		var args =[];
		var cmd =this.spawnCommand(command, args);
		cmd.on('exit', function(code) {
			self.log.writeln('child process exited with code: '+code);
			self.log.writeln("command run and done: "+command+" args: "+args);
			cb();
		});
	}
	else {
		cb();
	}
}
};