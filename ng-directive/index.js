/**
@todo
- remove the need to check this.optSubGenerators in EVERY function (i.e. find a way to NOT call this generator AT ALL if sub generator is wrong, but hookFor doesn't seem to be able to be conditionally called based on prompts..?)

@toc
1. askFor
2. files
3. updateBuildfiles


NOTE: uses Yeoman this.spawnCommand call to run commands (since need to handle Windows/different operating systems and can't use 'exec' since that doesn't show (live) output)
*/

'use strict';
var fs =require('fs');

var util = require('util');
var yeoman = require('yeoman-generator');

var BuildfilesMod =require('../common/buildfiles/buildfiles.js');
var PromptsMod =require('../common/prompts/prompts.js');

var NgDirectiveGenerator = module.exports = function NgDirectiveGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	//copy over prompt options to 'this' scope for templating
	var xx;
	for(xx in this.options.props) {
		this[xx] =this.options.props[xx];
		// console.log(xx+': '+this[xx]);
	}
};

util.inherits(NgDirectiveGenerator, yeoman.generators.NamedBase);

/**
@toc 1.
@method askFor
*/
NgDirectiveGenerator.prototype.askFor = function askFor() {
if(this.optSubGenerators.indexOf('ng-directive') >-1) {
	var cb = this.async();
	
	var prompts = [
		{
			name: 'optDirectiveName',
			message: 'Directive name (i.e. my-directive)',
			//required input
			validate: function(input) {
				if(!input || !input.length) {
					return false;
				}
				else {
					return true;
				}
			}
		},
		{
			name: 'optDirectivePath',
			message: 'Directive path (relative to the modules/directives folder) - if want to put it one or more sub-folders (i.e. myfolder/ OR myfolder/mysubfolder/ ). Otherwise just leave blank.',
			default: '',
		},
		{
			type: 'list',
			name: 'optCssPreprocessor',
			message: 'What CSS pre-processor to use?',
			choices: [
				'less',
				'scss'
			],
			default: 'less'
		},
		{
			type: 'list',
			name: 'optGruntQ',
			message: 'Run Grunt (if skipped, you will have to run yourself after Yeoman completes)?',
			choices: [
				'1',
				'0'
			],
			default: '1'
		}
	];
	
	this.prompt(prompts, function (props) {
		//format some
		//ensure optDirectivePath has a trailing slash and NO leading slash
		//regex to remove all leading & trailing slashes first
		props.optDirectivePath =props.optDirectivePath.replace(/^\/*/, '').replace(/\/*$/, '');
		props.optDirectivePath +='/';		//add trailing slash
		
		var skipKeys =[];
		var toInt =['optGruntQ'];
		
		var newProps =PromptsMod.formProps(prompts, props, skipKeys, toInt, {});
		var xx;
		for(xx in newProps) {
			this.options.props[xx] =this[xx] =newProps[xx];
		}
		
		//handle some special ones (the skipKeys from above)
		
		//add some
		//this will change 'my-page' to 'MyPage'
		this.options.props.optDirectiveNameCamel =this.optDirectiveNameCamel = this._.capitalize(this._.camelize(this.optDirectiveName));
		
		this.options.props.optModulePrefix =this.optModulePrefix = 'app';		//hardcoded
		
		cb();
	}.bind(this));
}
};

/**
@toc 2.
@method files
*/
NgDirectiveGenerator.prototype.files = function files() {
if(this.optSubGenerators.indexOf('ng-directive') >-1) {

	var ii;
	
	var pathBase ='app/src/modules/directives/';		//hardcoded
	var pagePath =pathBase+this.optDirectivePath+this.optDirectiveName;
	//A. make all directories (do it at top so they're all created since templated files are collected here at the top)
	//create sub-directories first if they don't exist
	var subdirs =this.optDirectivePath.split('/');
	var curPath;
	var curPathBase =pathBase;		//will be used to track the current path as we go through the sub-directories
	for(ii =0; ii<subdirs.length; ii++) {
		if(subdirs[ii]) {
			curPath =curPathBase+subdirs[ii]+'/';
			// console.log('curPath: '+curPath);
			if(!fs.existsSync(curPath)) {
				this.mkdir(curPath);
			}
			curPathBase =curPath;		//save for next time
		}
	}
	// console.log('pagePath: '+pagePath);
	this.mkdir(pagePath);
	
	
	//B. template files (all templated files TOGETHER here)
	this.template('new-directive/_new-page.js', pagePath+'/'+this.optDirectiveName+'.js');
	this.template('new-directive/_new-page.spec.js', pagePath+'/'+this.optDirectiveName+'.spec.js');
	if(this.optCssPreprocessor =='less') {
		this.template('new-directive/_new-page.less', pagePath+'/'+this.optDirectiveName+'.less');
	}
	if(this.optCssPreprocessor =='scss') {
		this.template('new-directive/_new-page.scss', pagePath+'/_'+this.optDirectiveName+'.scss');
	}
	
	
	//C. copy files & directories
	//NOTE: leading with just a '.' sometimes doesn't copy over properly / gives error so add the '_' even though not templating
	
}
};

/**
@toc 3.
@method updateBuildfiles
*/
NgDirectiveGenerator.prototype.updateBuildfiles = function updateBuildfiles() {
if(this.optSubGenerators.indexOf('ng-directive') >-1) {

	var finalObj ={
		"name":this.optDirectiveName,
		"files": {
			"js":[this.optDirectiveName+'.js'],
			"test":[this.optDirectiveName+'.spec.js']
		}
	};
	if(this.optCssPreprocessor =='less') {
		finalObj.files.less =[this.optDirectiveName+'.less'];
	}
	else if(this.optCssPreprocessor =='scss') {
		finalObj.files.scss =['_'+this.optDirectiveName+'.scss'];
	}
	
	var path ='app/src/config/buildfilesModules.json';
	var bfObj = JSON.parse(this.readFileAsString(path));
	
	bfObj =BuildfilesMod.update(bfObj, ['modules', 'directives'], this.optDirectivePath, finalObj, {});
	
	//write new object back to file
	this.write(path, JSON.stringify(bfObj, null, '\t'));		//make sure to use the 3rd parameter to make the output JSON formatted (a tab character in this case)! - http://stackoverflow.com/questions/5670752/write-pretty-json-to-file-using-node-js
	
}
};