'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var fs = require('fs');


var MeanSeedGenerator = module.exports = function MeanSeedGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	//call main sub-generator
	this.hookFor('mean-seed:main', {
		args: ['name'],		//apparently this is required - get an error if don't have it - even though we don't use or need it..
		options: {
			options: this.options
		}
	});
	
	//call ng-route sub-generator
	this.hookFor('mean-seed:ng-route', {
		args: ['name'],		//apparently this is required - get an error if don't have it - even though we don't use or need it..
		options: {
			options: this.options
		}
	});
	
	this.on('end', function () {
		// this.installDependencies({ skipInstall: options['skip-install'] });
		
		// this.log.writeln('Next steps:\n1. run `npm install && bower install`\n2. write your code then run `grunt`\n3. creat github repo\n4. commit & push `gh-pages` branch\n5. commit, tag, & push `master` branch\n6. (optional) register bower component');
	});

	// this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MeanSeedGenerator, yeoman.generators.Base);

MeanSeedGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	var prompts = [
		{
			type: 'list',
			name: 'subGenerator',
			message: 'What subgenerator to use?',
			choices: [
				'main',
				'ng-route'
			],
			default: 'main'
		}
	];

	this.prompt(prompts, function (props) {
		this.options.props ={};
		this.options.props.subGenerator =this.subGenerator = props.subGenerator;
		
		cb();
	}.bind(this));
};
	
	
MeanSeedGenerator.prototype.askForConfig = function askForConfig() {
this.options.props.configFile =this.configFile ='';		//default
if(this.subGenerator =='main') {		//only use config for certain sub-generators
	var cb = this.async();

	var prompts = [
		{
			name: 'configFile',
			message: 'What config file to use? (type "none" or any bad file path to use prompts here instead)',
			default: 'yo-configs/default.json'
		}
	];
	
	// console.log('dirname: '+__dirname);

	this.prompt(prompts, function (props) {
		var configFile =this.options.props.configFile =this.configFile =props.configFile;
		if(configFile) {
			//parse config file into a json object
			// var configPath =path.join(__dirname, configFile);
			var configPath =configFile;
			if(!fs.existsSync(configPath)) {
				console.log('configFile '+configFile+' does not exist, using prompts here');
				this.options.props.configFile =this.configFile ='';		//set configFile to blank to trigger prompts
			}
			else {
				var config = JSON.parse(this.readFileAsString(configPath));
				
				var xx;
				for(xx in config.prompts) {
					this[xx] =config.prompts[xx];
					this.options.props[xx] =config.prompts[xx];
					// console.log(xx+': '+this[xx]);
				}
			}
		}
			
		cb();
	}.bind(this));
}
};