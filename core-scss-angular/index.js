/**
@todo
- once forminput, etc. are fixed on Angular 1.2.0, update bower.json to no longer be 1.2.0-rc.3
- remove the need to check this.optSubGenerators in EVERY function (i.e. find a way to NOT call this generator AT ALL if sub generator is wrong, but hookFor doesn't seem to be able to be conditionally called based on prompts..?)

@toc
1. filesAngular

NOTE: uses Yeoman this.spawnCommand call to run commands (since need to handle Windows/different operating systems and can't use 'exec' since that doesn't show (live) output)
*/

'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

// var exec = require('child_process').exec;
// var spawn = require('child_process').spawn;

var CoreScssAngularGenerator = module.exports = function CoreScssAngularGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	//copy over prompt options to 'this' scope for templating
	var xx;
	for(xx in this.options.props) {
		this[xx] =this.options.props[xx];
	}
};

util.inherits(CoreScssAngularGenerator, yeoman.generators.NamedBase);

/**
@toc 1.
@method filesAngular
*/
CoreScssAngularGenerator.prototype.filesAngular = function filesAngular() {
if(this.optSubGenerators.indexOf('core-scss-angular') >-1) {
	
	//A. make all directories (do it at top so they're all created since templated files are collected here at the top)
	this.mkdir('app/src');
	this.mkdir('app/src/config');
	this.mkdir('app/src/config/protractor');
	this.mkdir('app/src/common');
	this.mkdir('app/src/common/font');
	this.mkdir('app/src/common/img');
	this.mkdir('app/src/common/js');
	this.mkdir('app/src/common/scss');
	this.mkdir('app/src/lib');
	this.mkdir('app/src/test');
	this.mkdir('app/src/modules');
	this.mkdir('app/src/modules/directives');
	this.mkdir('app/src/modules/pages');
	this.mkdir('app/src/modules/services');
	
	
	//B. template files (all templated files TOGETHER here)
	this.template('_bower.json', 'bower.json');
	this.template('_yuidoc-frontend.json', 'yuidoc-frontend.json');
	
	
	//C. copy files & directories
	//NOTE: leading with just a '.' sometimes doesn't copy over properly / gives error so add the '_' even though not templating
	//main / root folder files
	this.copy('_.bowerrc', '.bowerrc');
	
	this.copy('app/src/ie.css', 'app/src/ie.css');
	this.copy('app/src/ie.html', 'app/src/ie.html');
	this.copy('app/src/index-grunt.html', 'app/src/index-grunt.html');
	this.copy('app/src/index-phonegap-grunt.html', 'app/src/index-phonegap-grunt.html');
	this.copy('app/src/index-prod-grunt.html', 'app/src/index-prod-grunt.html');
	this.copy('app/src/index-triggerio-grunt.html', 'app/src/index-triggerio-grunt.html');
	
	//config
	this.copy('app/src/config/buildfilesModuleGroups.json', 'app/src/config/buildfilesModuleGroups.json');
	this.copy('app/src/config/buildfilesModules.json', 'app/src/config/buildfilesModules.json');
	this.copy('app/src/config/karma.conf-grunt.js', 'app/src/config/karma.conf-grunt.js');
	this.copy('app/src/config/karma-no-coverage.conf-grunt.js', 'app/src/config/karma-no-coverage.conf-grunt.js');
	this.copy('app/src/config/protractor.conf-grunt.js', 'app/src/config/protractor.conf-grunt.js');
	
	//common
	this.directory('app/src/common/font');
	this.directory('app/src/common/img');
	this.directory('app/src/common/js');
	
	//this will copy over a grunt generated file (app/src/common/scss/_base.scss) but it's fine since it will be over-writen by grunt later)
	this.directory('app/src/common/scss');
	
	//lib
	this.directory('app/src/lib');
	
	//test
	this.directory('app/src/test');
	
	//modules
	this.directory('app/src/modules/directives');
	this.directory('app/src/modules/pages');
	
	this.directory('app/src/modules/services');
	/*
	this.directory('app/src/modules/services/auth');
	
	this.copy('app/src/modules/services/config/config-grunt.js');
	
	this.directory('app/src/modules/services/http');
	this.directory('app/src/modules/services/models');
	this.directory('app/src/modules/services/nav');
	this.directory('app/src/modules/services/socialAuth');
	this.directory('app/src/modules/services/storage');
	*/
}
};