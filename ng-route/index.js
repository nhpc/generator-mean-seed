/**
@todo
- remove the need to check this.subGenerators in EVERY function (i.e. find a way to NOT call this generator AT ALL if subGenerator is wrong, but hookFor doesn't seem to be able to be conditionally called based on prompts..?)

NOTE: uses Yeoman this.spawnCommand call to run commands (since need to handle Windows/different operating systems and can't use 'exec' since that doesn't show (live) output)
*/

'use strict';
var fs =require('fs');

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
		// console.log(xx+': '+this[xx]);
	}
};

util.inherits(NgRouteGenerator, yeoman.generators.NamedBase);

NgRouteGenerator.prototype.askFor = function askFor() {
if(this.subGenerators.indexOf('ng-route') >-1) {
	var cb = this.async();
	
	var prompts = [
		{
			name: 'routeName',
			message: 'Route name (i.e. my-page)',
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
			name: 'routePath',
			message: 'Route path - if want to put it one or more sub-folders (i.e. myfolder/ OR myfolder/mysubfolder/ )',
			default: '',
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
		//format some
		//ensure routePath has a trailing slash and NO leading slash
		//regex to remove all leading & trailing slashes first
		props.routePath =props.routePath.replace(/^\/*/, '').replace(/\/*$/, '');
		props.routePath +='/';		//add trailing slash
		// console.log('props.routePath: '+props.routePath);
		
		var ii, jj, kk, skip, curName;
		var skipKeys =[];
		var toInt =['skipGrunt'];
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
		// this.options.props.appKeywords =this.appKeywords = props.appKeywords.split(' ');
		
		//add some
		this.options.props.routeNameCtrl =this.routeNameCtrl = this._.capitalize(this._.camelize(this.routeName))+'Ctrl';
		
		cb();
	}.bind(this));
}
};

NgRouteGenerator.prototype.files = function files() {
if(this.subGenerators.indexOf('ng-route') >-1) {

	var ii;
	
	var pathBase ='app/src/modules/pages/';
	var pagePath =pathBase+this.routePath+this.routeName;
	//A. make all directories (do it at top so they're all created since templated files are collected here at the top)
	//create sub-directories first if they don't exist
	var subdirs =this.routePath.split('/');
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
	this.template('new-page/_new-page.html', pagePath+'/'+this.routeName+'.html');
	this.template('new-page/_new-page.less', pagePath+'/'+this.routeName+'.less');
	this.template('new-page/_NewPageCtrl.js', pagePath+'/'+this.routeNameCtrl+'.js');
	this.template('new-page/_NewPageCtrl.spec.js', pagePath+'/'+this.routeNameCtrl+'.spec.js');
	
	
	//C. copy files & directories
	//NOTE: leading with just a '.' sometimes doesn't copy over properly / gives error so add the '_' even though not templating
	
}
};

NgRouteGenerator.prototype.updateBuildfiles = function updateBuildfiles() {
if(this.subGenerators.indexOf('ng-route') >-1) {
	var path ='app/src/config/buildfilesModules.json';
	var bfObj = JSON.parse(this.readFileAsString(path));
	var ii, jj, kk, found =false, modulesIndex =false, pagesIndex =false;
	for(ii =0; ii<bfObj.dirs.length; ii++) {
		if(bfObj.dirs[ii].name =='modules') {
			modulesIndex =ii;
			for(jj =0; jj<bfObj.dirs[ii].dirs.length; jj++) {
				if(bfObj.dirs[ii].dirs[jj].name =='pages') {
				
					var finalObj ={
						"name":this.routeName,
						"files": {
							"html":[this.routeName+'.html'],
							"less":[this.routeName+'.less'],
							"js":[this.routeNameCtrl+'.js'],
							"test":[this.routeNameCtrl+'.spec.js']
						}
					};
					// bfObj.dirs[ii].dirs[jj].dirs.push(finalObj);
					
					//use recursive function to go through all subdirs and create nested objects if they don't exist
					bfObj.dirs[ii].dirs[jj] =this._buildfilesSubdirs(bfObj.dirs[ii].dirs[jj], this.routePath, finalObj, {});
					
					found =true;
					break;
				}
			}
			if(found) {
				break;
			}
		}
	}
	
	//write new object back to file
	this.write(path, JSON.stringify(bfObj, null, '\t'));		//make sure to use the 3rd parameter to make the output JSON formatted (a tab character in this case)! - http://stackoverflow.com/questions/5670752/write-pretty-json-to-file-using-node-js
	
}
};

/**
Recursive function that takes a path and searches for the first directory/part of it within the subObj.dirs array and adds it in if it doesn't exist
@param {Object} subObj the current (nested) object we'll search the 'dirs' key for 'name' and update if not found
@param {String} path The path that will be broken into directories to match with the 'name' key value to search for and add in if not found
@param {Object} finalObj The final object to stuff in to the LAST (most nested) object.
@param {Object} params
@return {Object} subObj The NEW nested object, now inside the 'name' key object
*/
NgRouteGenerator.prototype._buildfilesSubdirs =function buildfilesSubdirs(subObj, path, finalObj, params) {
	var xx;
	var newObj;
	var newPath;
	//regex to remove all leading & trailing slashes
	path =path.replace(/^\/*/, '').replace(/\/*$/, '');
	
	var goTrig =true;
	//default set the current sub directory to the path (in case no slashes at all and this is the last one)
	var curSubdir =path;
	//if slash, remove the first directory and save the rest for the new path to pass to recursive call
	var indexSlash =path.indexOf('/');
	if(indexSlash >-1) {
		curSubdir =path.slice(0, indexSlash);
		newPath =path.slice((indexSlash+1), path.length);
	}
	else if(!curSubdir || curSubdir.length <1) {		//if blank, just add in finalObj now
		subObj.dirs.push(finalObj);
		goTrig =false;
	}
	
	console.log('path: '+path+' curSubdir: '+curSubdir+' newPath: '+newPath);
	
	if(goTrig) {
	
		var subDirIndex;		//need to save the index that corresponds to the newObj for re-stuffing it after recursive call (since each recursive call gets a SMALLER nested object returned and need to append that to the original object for the final return)
		
		//go through subObj and see if the curSubdir already exists as a name in the 'dirs' array
		var ii, found =false;
		for(ii =0; ii<subObj.dirs.length; ii++) {
			if(subObj.dirs[ii].name ==curSubdir) {
				found =true;
				//ensure it has a 'dirs' key
				if(subObj.dirs[ii].dirs ===undefined) {
					subObj.dirs[ii].dirs =[];
				}
				if(indexSlash <0) {		//if on LAST one, add in finalObj INSIDE the dirs array (assume dirs is empty since this should be a NEW page)
					subObj.dirs[ii].dirs.push(finalObj);
				}
				newObj =subObj.dirs[ii];
				subDirIndex =ii;		//save for re-stuffing later
				break;
			}
		}
		//if doesn't already exist, add it
		if(!found) {
			newObj ={
				name: curSubdir,
				dirs: []
			};
			if(indexSlash <0) {		//if on LAST one, add in finalObj INSIDE the dirs array (assume dirs is empty since this should be a NEW page)
				newObj.dirs.push(finalObj);
			}
			var len1 =subObj.dirs.length;
			subObj.dirs[len1] =newObj;
			subDirIndex =len1;		//save for re-stuffing later
		}
		
		//if still have one or more directories, recursively go again
		if(indexSlash >-1) {
			//need to set the dirs array for the correct index to the return value - NOT the entire subObj itself since the return will be the updated newObj, which is a SUBSET of subObj!
			subObj.dirs[subDirIndex] =this._buildfilesSubdirs(newObj, newPath, finalObj, params);
		}
	}
	
	return subObj;
};

NgRouteGenerator.prototype.updateAppJs = function updateAppJs() {
if(this.subGenerators.indexOf('ng-route') >-1) {
	var path ='app/src/common/js/app.js';
	// var contents =this.read(path);
	var contents =this.readFileAsString(path);
	var indexStart =contents.indexOf('//end: yeoman generated routes here');
	if(indexStart >-1) {
		// var indexEnd =contents.indexOf('/n', indexStart);
		// console.log(indexStart+' '+indexEnd);
		// if(indexEnd >-1) {
		if(1) {
			var newData ="$routeProvider.when(appPathRoute+'"+this.routeName+"', {templateUrl: pagesPath+'"+this.routePath+this.routeName+"/"+this.routeName+".html',\n"+
			"		resolve: {\n"+
			"			auth: function(svcAuth) {\n"+
			"				return svcAuth.checkSess({noLoginRequired:true});\n"+
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

NgRouteGenerator.prototype.commandsGrunt = function commandsGrunt() {
if(this.subGenerators.indexOf('ng-route') >-1) {
	var cb = this.async();
	var self =this;
	
	if(this.skipGrunt ===undefined || !this.skipGrunt) {
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

NgRouteGenerator.prototype.logNextSteps = function logNextSteps() {
if(this.subGenerators.indexOf('ng-route') >-1) {
	this.log.writeln('Next steps:\n1. IF you want to make a custom nav (header and/or footer) for this page, add it in `modules/services/nav/nav.js`\n2. Edit the files (html, less, js) for your new page!');
}
};