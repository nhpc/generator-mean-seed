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
			message: 'What config file to use?',
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
		var configFile =props.configFile;
		//parse config file into a json object
		// var configPath =path.join(__dirname, configFile);
		var configPath =configFile;
		if(!fs.existsSync(configPath)) {
			console.log('ERROR: configFile '+configFile+' does not exist!');
		}
		else {
			var config = JSON.parse(this.readFileAsString(configPath));

			this.options.props ={};
			this.options.props.subGenerator =this.subGenerator = props.subGenerator;
			
			var xx;
			for(xx in config.prompts) {
				this[xx] =config.prompts[xx];
				this.options.props[xx] =config.prompts[xx];
				// console.log(xx+': '+this[xx]);
			}
			/*
			//set some defaults
			if(this.subGenerator ===undefined) {
				this.subGenerator ='main';
				this.options.props.subGenerator ='main';
			}
			*/
		}

		cb();
	}.bind(this));
};