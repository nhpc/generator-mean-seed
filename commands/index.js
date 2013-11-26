/**
@todo
- remove the need to check this.optSubGenerators in EVERY function (i.e. find a way to NOT call this generator AT ALL if sub generator is wrong, but hookFor doesn't seem to be able to be conditionally called based on prompts..?)

@toc
1. askFor
2. commandsNpm
3. commandsBower
4. commandsGrunt
5. commandsSelenium

NOTE: uses Yeoman this.spawnCommand call to run commands (since need to handle Windows/different operating systems and can't use 'exec' since that doesn't show (live) output)
*/

'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var CommandsGenerator = module.exports = function CommandsGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	//copy over prompt options to 'this' scope for templating
	var xx;
	for(xx in this.options.props) {
		this[xx] =this.options.props[xx];
	}
};

util.inherits(CommandsGenerator, yeoman.generators.NamedBase);

/**
@toc 1.
@method askFor
*/
CommandsGenerator.prototype.askFor = function askFor() {
if(this.optSubGenerators.indexOf('commands') >-1) {

	var cb = this.async();

	var prompts = [
	];

	this.prompt(prompts, function (props) {
		var ii, jj, kk, skip, curName;
		var skipKeys =[];
		var toInt =[];
		for(ii =0; ii<prompts.length; ii++) {
			curName =prompts[ii].name;
			skip =false;
			for(jj =0; jj<skipKeys.length; jj++) {
				if(curName ==skipKeys[jj]) {
					skip =true;
					break;
				}
			}
			if(!skip) {		//copy over
				//convert to integer (from string) if necessary
				for(kk =0; kk<toInt.length; kk++) {
					if(curName ==toInt[kk]) {
						props[curName] =parseInt(props[curName], 10);
					}
				}
				
				this.options.props[curName] =this[curName] =props[curName];
			}
		}
		
		//handle some special ones (the skipKeys from above)

		cb();
	}.bind(this));

}
};

/**
@toc 2.
@method commandsNpm
*/
CommandsGenerator.prototype.commandsNpm = function commandsNpm() {
if(this.optSubGenerators.indexOf('commands') >-1) {
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
CommandsGenerator.prototype.commandsBower = function commandsBower() {
if(this.optSubGenerators.indexOf('commands') >-1) {
	var cb = this.async();
	var self =this;
	
	if(this.optBowerInstall !==undefined && this.optBowerInstall) {
		var command ='bower';
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
@toc 4.
@method commandsGrunt
*/
CommandsGenerator.prototype.commandsGrunt = function commandsGrunt() {
if(this.optSubGenerators.indexOf('commands') >-1) {
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
CommandsGenerator.prototype.commandsSelenium = function commandsSelenium() {
if(this.optSubGenerators.indexOf('commands') >-1) {
	var cb = this.async();
	var self =this;
	
	if(this.optSeleniumInstall !==undefined && this.optSeleniumInstall) {
		var command ='./node_modules/protractor/bin/install_selenium_standalone';
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