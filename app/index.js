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
			name: 'configFile',
			message: 'What config file to use? (type "none" or any bad file path to use prompts here instead)',
			default: 'yo-configs/default.json'
		},
		{
			name: 'subGenerator',
			message: 'What subgenerator to use?',
			default: 'main'
		}
	];
	
	// console.log('dirname: '+__dirname);

	this.prompt(prompts, function (props) {
		this.options.props ={};
		this.options.props.subGenerator =this.subGenerator = props.subGenerator;
	
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
};

MeanSeedGenerator.prototype.askForTwo = function askForTwo() {
if(!this.configFile) {		//only prompt if don't have config file
	var cb = this.async();

	var prompts = [
		{
			name: 'appName',
			message: 'Application name',
			default: 'myproject'
		},
		{
			name: 'appTitle',
			message: 'Application title',
			default: 'My Project'
		},
		{
			name: 'appDescription',
			message: 'Application description',
			default: 'My really cool app!'
		},
		{
			name: 'appKeywords',
			message: 'Application (NPM/Bower) keywords, space separated',
			default: 'mean-seed javascript angular node myproject app'
		},
		{
			name: 'githubName',
			message: 'Github User or Organization Name',
			default: 'jackrabbitsgroup'		//TESTING
		},
		{
			name: 'authorName',
			message: 'Author name and email (i.e. John Smith <johnsmith@email.com>)',
			default: 'John Smith <johnsmith@email.com>'		//TESTING
		},
		{
			type: 'list',
			name: 'operatingSystem',
			message: 'Operating system',
			choices: [
				'mac',
				'linux',
				'windows'
			],
			default: 'mac'
		},
		{
			name: 'serverPort',
			message: 'What port to run the application on?',
			default: 3000
		},
		{
			name: 'socketPort',
			message: 'What port to run any socket connections on?',
			default: 3001
		},
		{
			name: 'testServerPort',
			message: 'What port to run the TESTS on?',
			default: 3005
		},
		{
			name: 'testSocketPort',
			message: 'What port to run any socket connections for TESTS on?',
			default: 3006
		},
		{
			name: 'testDatabase',
			message: 'What (MongoDB) database to use for the TESTS?',
			default: 'test_temp'
		},
		{
			type: 'list',
			name: 'skipNpmInstall',
			message: 'Skip npm install (you will have to run yourself after Yeoman completes)?',
			choices: [
				'0',
				'1'
			],
			default: '0'
		},
		{
			type: 'list',
			name: 'skipBowerInstall',
			message: 'Skip bower install (you will have to run yourself after Yeoman completes)?',
			choices: [
				'0',
				'1'
			],
			default: '0'
		},
		{
			type: 'list',
			name: 'skipSeleniumInstall',
			message: 'Skip selenium (for protractor tests) install (you will have to run yourself after Yeoman completes)? NOTE: this may not work on Windows so you may have to install yourself anyway - see the README for more info.',
			choices: [
				'0',
				'1'
			],
			default: '0'
		},
		{
			type: 'list',
			name: 'skipGrunt',
			message: 'Skip running Grunt (you will have to run yourself after Yeoman completes)?',
			choices: [
				'0',
				'1'
			],
			default: '0'
		}
	];

	this.prompt(prompts, function (props) {
		var ii, jj, kk, skip, curName;
		var skipKeys =['appKeywords'];
		var toInt =['skipNpmInstall', 'skipBowerInstall', 'skipSeleniumInstall', 'skipGrunt'];
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
		this.options.props.appKeywords =this.appKeywords = props.appKeywords.split(' ');

		cb();
	}.bind(this));
}
};