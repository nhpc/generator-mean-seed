/**
@fileOverview

@toc
*/

'use strict';

var self;

/**
@param {Object} opts
*/
function Buildfiles(opts) {
	self =this;
}

/**
@toc 1.
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

module.exports = new Buildfiles({});