'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var fs = require('fs');


var MeanSeedGenerator = module.exports = function MeanSeedGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	//hooks to call sub generators - ORDER MATTERS! They'll be called in the order they are listed
	
	this.hookFor('mean-seed:core-default', {
		args: ['name'],		//apparently this is required - get an error if don't have it - even though we don't use or need it..
		options: {
			options: this.options
		}
	});
	
	this.hookFor('mean-seed:core-scss', {
		args: ['name'],		//apparently this is required - get an error if don't have it - even though we don't use or need it..
		options: {
			options: this.options
		}
	});
	
	this.hookFor('mean-seed:core-default-node', {
		args: ['name'],		//apparently this is required - get an error if don't have it - even though we don't use or need it..
		options: {
			options: this.options
		}
	});
	
	this.hookFor('mean-seed:core-default-angular', {
		args: ['name'],		//apparently this is required - get an error if don't have it - even though we don't use or need it..
		options: {
			options: this.options
		}
	});
	
	this.hookFor('mean-seed:core-scss-angular', {
		args: ['name'],		//apparently this is required - get an error if don't have it - even though we don't use or need it..
		options: {
			options: this.options
		}
	});
	
	this.hookFor('mean-seed:ng-route', {
		args: ['name'],		//apparently this is required - get an error if don't have it - even though we don't use or need it..
		options: {
			options: this.options
		}
	});
	
	//NOTE: order matters - call this toward end / LAST!
	this.hookFor('mean-seed:commands', {
		args: ['name'],		//apparently this is required - get an error if don't have it - even though we don't use or need it..
		options: {
			options: this.options
		}
	});
	
	//NOTE: order matters - call this toward end / LAST!
	this.hookFor('mean-seed:log-next-steps', {
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
				'core-default',
				'core-scss',
				'ng-route'
			],
			default: 'core-default'
		}
	];

	this.prompt(prompts, function (props) {
		this.options.props ={};
		
		//use an array for subGenerators in case want to use more than one (i.e. for modularizing to multiple subgenerators)
		var generators =[props.subGenerator];
		var moreGenerators =false;
		var logNextStepsMsg =false;
		
		if(props.subGenerator =='core-default') {
			logNextStepsMsg ='Next steps:\n1. IF on Windows or you skipped the auto install, run `./node_modules/protractor/bin/install_selenium_standalone`\n2. IF skipped any of the auto installs, run the install/build scripts - npm, bower, grunt\n3. Run `node run.js`\n4. Open a browser to `http://localhost:3000` to view the app!\n5. (optional) Git init and commit - `git init . && git add -A && git commit -m \'init\'`\nSee the README.md file for more info.';
			moreGenerators =['core-default-node', 'core-default-angular', 'commands', 'log-next-steps'];
		}
		else if(props.subGenerator =='core-scss') {
			logNextStepsMsg ='Next steps:\n1. IF on Windows or you skipped the auto install, run `./node_modules/protractor/bin/install_selenium_standalone`\n2. IF skipped any of the auto installs, run the install/build scripts - npm, bower, grunt\n3. Run `node run.js`\n4. Open a browser to `http://localhost:3000` to view the app!\n5. (optional) Git init and commit - `git init . && git add -A && git commit -m \'init\'`\nSee the README.md file for more info.';
			moreGenerators =['core-default-node', 'core-scss-angular', 'commands', 'log-next-steps'];
		}
		else if(props.subGenerator =='ng-route') {
			logNextStepsMsg ='Next steps:\n1. IF you want to make a custom nav (header and/or footer) for this page, add it in `modules/services/nav/nav.js`\n2. Edit the files (html, less, js) for your new page!';
			moreGenerators =['commands', 'log-next-steps'];
		}
		
		if(moreGenerators) {
			generators =generators.concat(moreGenerators);
		}
		
		if(logNextStepsMsg) {
			this.options.props.logNextStepsMsg =this.logNextStepsMsg = logNextStepsMsg;
		}
		
		this.options.props.subGenerators =this.subGenerators = generators;
		
		cb();
	}.bind(this));
};
	
	
MeanSeedGenerator.prototype.askForConfig = function askForConfig() {
this.options.props.configFile =this.configFile ='';		//default
if(this.subGenerators.indexOf('core-default') >-1 || this.subGenerators.indexOf('core-scss') >-1) {		//only use config for certain sub-generators
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