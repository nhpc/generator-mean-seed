/**
@todo
- remove the need to check this.optSubGenerators in EVERY function (i.e. find a way to NOT call this generator AT ALL if sub generator is wrong, but hookFor doesn't seem to be able to be conditionally called based on prompts..?)

@toc
1. askFor
2. files
3. updateBuildfiles
4. updateAppJs


NOTE: uses Yeoman this.spawnCommand call to run commands (since need to handle Windows/different operating systems and can't use 'exec' since that doesn't show (live) output)
*/

'use strict';
var fs =require('fs');

var util = require('util');
var yeoman = require('yeoman-generator');

var BuildfilesMod =require('../common/buildfiles/buildfiles.js');
var PromptsMod =require('../common/prompts/prompts.js');

var NgRouteGenerator = module.exports = function NgRouteGenerator(args, options, config) {
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

util.inherits(NgRouteGenerator, yeoman.generators.NamedBase);

/**
@toc 1.
@method askFor
*/
NgRouteGenerator.prototype.askFor = function askFor() {
if(this.optSubGenerators.indexOf('ng-route') >-1) {
	var cb = this.async();
	
	var prompts = [
		{
			name: 'optRouteName',
			message: 'UNIQUE, full route name (i.e. my-page)',
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
			name: 'optRoutePath',
			message: 'Route path - if want to put it one or more sub-folders (i.e. myfolder/ OR myfolder/mysubfolder/ ). Otherwise just leave blank.',
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
		//ensure optRoutePath has a trailing slash and NO leading slash
		//regex to remove all leading & trailing slashes first
		props.optRoutePath =props.optRoutePath.replace(/^\/*/, '').replace(/\/*$/, '');
		props.optRoutePath +='/';		//add trailing slash
		// console.log('props.optRoutePath: '+props.optRoutePath);
		
		var skipKeys =[];
		var toInt =['optGruntQ'];
		
		var newProps =PromptsMod.formProps(prompts, props, skipKeys, toInt, {});
		var xx;
		for(xx in newProps) {
			this.options.props[xx] =this[xx] =newProps[xx];
		}
		
		//handle some special ones (the skipKeys from above)
		
		//add some
		this.options.props.optRouteNameCtrl =this.optRouteNameCtrl = this._.capitalize(this._.camelize(this.optRouteName))+'Ctrl';
		
		cb();
	}.bind(this));
}
};

/**
@toc 2.
@method files
*/
NgRouteGenerator.prototype.files = function files() {
if(this.optSubGenerators.indexOf('ng-route') >-1) {

	var ii;
	
	var pathBase ='app/src/modules/pages/';
	var pagePath =pathBase+this.optRoutePath+this.optRouteName;
	//A. make all directories (do it at top so they're all created since templated files are collected here at the top)
	//create sub-directories first if they don't exist
	var subdirs =this.optRoutePath.split('/');
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
	this.template('new-page/_new-page.html', pagePath+'/'+this.optRouteName+'.html');
	if(this.optCssPreprocessor =='less') {
		this.template('new-page/_new-page.less', pagePath+'/'+this.optRouteName+'.less');
	}
	if(this.optCssPreprocessor =='scss') {
		this.template('new-page/_new-page.scss', pagePath+'/_'+this.optRouteName+'.scss');
	}
	this.template('new-page/_NewPageCtrl.js', pagePath+'/'+this.optRouteNameCtrl+'.js');
	this.template('new-page/_NewPageCtrl.spec.js', pagePath+'/'+this.optRouteNameCtrl+'.spec.js');
	
	
	//C. copy files & directories
	//NOTE: leading with just a '.' sometimes doesn't copy over properly / gives error so add the '_' even though not templating
	
}
};

/**
@toc 3.
@method updateBuildfiles
*/
NgRouteGenerator.prototype.updateBuildfiles = function updateBuildfiles() {
if(this.optSubGenerators.indexOf('ng-route') >-1) {

	var finalObj ={
		"name":this.optRouteName,
		"files": {
			"html":[this.optRouteName+'.html'],
			"js":[this.optRouteNameCtrl+'.js'],
			"testUnit":[this.optRouteNameCtrl+'.spec.js']
		}
	};
	if(this.optCssPreprocessor =='less') {
		finalObj.files.less =[this.optRouteName+'.less'];
	}
	else if(this.optCssPreprocessor =='scss') {
		finalObj.files.scss =['_'+this.optRouteName+'.scss'];
	}
	
	var path ='app/src/config/buildfilesModules.json';
	var bfObj = JSON.parse(this.readFileAsString(path));
	
	bfObj =BuildfilesMod.update(bfObj, ['modules', 'pages'], this.optRoutePath, finalObj, {});
	
	//write new object back to file
	this.write(path, JSON.stringify(bfObj, null, '\t'));		//make sure to use the 3rd parameter to make the output JSON formatted (a tab character in this case)! - http://stackoverflow.com/questions/5670752/write-pretty-json-to-file-using-node-js
	
}
};

/**
@toc 4.
@method updateAppJs
*/
NgRouteGenerator.prototype.updateAppJs = function updateAppJs() {
if(this.optSubGenerators.indexOf('ng-route') >-1) {
	var path ='app/src/common/js/app.js';
	// var contents =this.read(path);
	var contents =this.readFileAsString(path);
	var indexStart =contents.indexOf('//end: yeoman generated routes here');
	if(indexStart >-1) {
		// var indexEnd =contents.indexOf('/n', indexStart);
		// console.log(indexStart+' '+indexEnd);
		// if(indexEnd >-1) {
		if(1) {
			var newData ="$routeProvider.when(appPathRoute+'"+this.optRouteName+"', {templateUrl: pagesPath+'"+this.optRoutePath+this.optRouteName+"/"+this.optRouteName+".html',\n"+
			"		resolve: {\n"+
			"			auth: function(appAuth) {\n"+
			"				return appAuth.checkSess({});\n"+
			"			}\n"+
			"		}\n"+
			"	});\n";
			// var newContents =contents.slice(0, (indexEnd+1))+newData+contents.slice((indexEnd+1), contents.length);
			var newContents =contents.slice(0, (indexStart))+newData+contents.slice((indexStart), contents.length);
			this.write(path, newContents);
		}
	}
}
};