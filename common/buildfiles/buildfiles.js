/**
@fileOverview

@toc
1. subdirs
2. getFullKeys
3. update - the main function to call that will call the others
*/

'use strict';

var ArrayMod =require('../array/array.js');

var self;

/**
@param {Object} opts
*/
function Buildfiles(opts) {
	self =this;
}

/**
Recursive function that takes a path and searches for the first directory/part of it within the subObj.dirs array and adds it in if it doesn't exist
@toc 1.
@method subdirs
@param {Object} subObj the current (nested) object we'll search the 'dirs' key for 'name' and update if not found
@param {String} path The path that will be broken into directories to match with the 'name' key value to search for and add in if not found
@param {Object} finalObj The final object to stuff in to the LAST (most nested) object.
@param {Object} params
@return {Object} subObj The NEW nested object, now inside the 'name' key object
*/
Buildfiles.prototype.subdirs =function(subObj, path, finalObj, params) {
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
	
	// console.log('path: '+path+' curSubdir: '+curSubdir+' newPath: '+newPath);
	
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
			subObj.dirs[subDirIndex] =this.subdirs(newObj, newPath, finalObj, params);
		}
	}
	
	return subObj;
};

/**
Recursive function to iterate through the buildfilesModules.json object searching the 'dirs' arrays for certain (nested) keys
@toc 2.
@method getFullKeys
@param {Object} base The full buildfilesModules.json object
@param {Array} dirKeys The keys inside the 'dirs' arrays to search the 'name' field for
@param {Object} params
@return {Array} keys The full set of keys in order, including 'dirs' to get to the object identified by dirKeys
@usage
	var path ='app/src/config/buildfilesModules.json';
	var bfObj = JSON.parse(this.readFileAsString(path));
	var dirKeys =['modules', 'pages'];
	var keys =getFullKeys(bfObj, dirKeys, {});
*/
Buildfiles.prototype.getFullKeys =function(base, dirKeys, params) {
	//if first time, initialize params.keys, which is where we'll store the keys for the recursive calls
	if(params.keys ===undefined) {
		params.keys =[];
	}
	var ii, newBase;
	for(ii =0; ii<base.dirs.length; ii++) {
		if(base.dirs[ii].name ==dirKeys[0]) {
			params.keys =params.keys.concat(['dirs', ii]);
			newBase =base.dirs[ii];
			break;
		}
	}
	
	dirKeys =dirKeys.slice(1, dirKeys.length);
	if(dirKeys.length && dirKeys.length >0) {		//go again
		params.keys =this.getFullKeys(newBase, dirKeys, params);
	}
	
	return params.keys;
}

/**
Updates a full buildfiles object
@toc 3.
@method update
@param {Object} base The full buildfilesModules.json object
@param {Array} dirKeys The keys inside the 'dirs' arrays to search the 'name' field for
@param {String} routePath The path to put the finalVal in (i.e. 'myfolder/sub1/')
@param {Mixed} finalVal The final object/array (or any value) to add in (to the correct place as specified by dirKeys)
@param {Object} params
@return {Object} The now updated base object with the finalVal stuffed in the appropriate place
@usage
	var path ='app/src/config/buildfilesModules.json';
	var bfObj = JSON.parse(this.readFileAsString(path));
	var dirKeys =['modules', 'pages'];
	var finalObj ={
		"name":"my-page",
		"files": {
			"html":['my-page.html'],
			"js":['MyPage.js'],
			"test":['MyPageCtrl.spec.js']
		}
	};
	bfObj =BuildfilesMod.update(bfObj, dirKeys, 'myfolder/sub1/', finalObj, {});
*/
Buildfiles.prototype.update =function(base, dirKeys, routePath, finalVal, params) {
	//get the keys to get to where we want to insert the new finalVal
	var keys =this.getFullKeys(base, dirKeys, {});
	console.log('keys: '+JSON.stringify(keys));
	
	//get the nested sub object
	var subObj =ArrayMod.evalBase(base, keys, {});
	// console.log('subObj: '+JSON.stringify(subObj));
	
	//use recursive function to go through all subdirs and create nested objects if they don't exist
	var retObj =this.subdirs(subObj, routePath, finalVal, {});
	// console.log('retObj: '+JSON.stringify(retObj));
	
	//set the new retObj in the appropriate place
	base =ArrayMod.setNestedKeyVal(base, keys, retObj, {});
	
	return base;
};

module.exports = new Buildfiles({});