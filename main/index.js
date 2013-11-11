/**
@todo
- remove the need to check this.subGenerator in EVERY function (i.e. find a way to NOT call this generator AT ALL if subGenerator is wrong, but hookFor doesn't seem to be able to be conditionally called based on prompts..?)

NOTE: uses Yeoman this.spawnCommand call to run commands (since need to handle Windows/different operating systems and can't use 'exec' since that doesn't show (live) output)
*/

'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

// var exec = require('child_process').exec;
// var spawn = require('child_process').spawn;

var MainGenerator = module.exports = function MainGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	//copy over prompt options to 'this' scope for templating
	var xx;
	for(xx in this.options.props) {
		this[xx] =this.options.props[xx];
		console.log(xx+': '+this[xx]);
	}
};

util.inherits(MainGenerator, yeoman.generators.NamedBase);

MainGenerator.prototype.askFor = function askFor() {
if(this.subGenerator =='main') {
	var cb = this.async();
	
	var prompts = [
	];
	
	this.prompt(prompts, function (props) {
		
		cb();
	}.bind(this));
}
};

MainGenerator.prototype.files = function files() {
if(this.subGenerator =='main') {

	//A. make all directories (do it at top so they're all created since templated files are collected here at the top)
	this.mkdir('app');
	this.mkdir('app/configs');
	this.mkdir('app/test');
	this.mkdir('app/routes');
	this.mkdir('app/routes/api');
	this.mkdir('app/routes/api/rpc');
	this.mkdir('app/modules');
	this.mkdir('app/modules/controllers');
	this.mkdir('app/modules/controllers/auth');
	this.mkdir('app/modules/controllers/follow');
	this.mkdir('app/modules/controllers/user');
	this.mkdir('app/modules/services');
	this.mkdir('app/modules/services/array');
	this.mkdir('app/modules/services/crud');
	this.mkdir('app/modules/services/datetime');
	this.mkdir('app/modules/services/lookup');
	this.mkdir('app/modules/services/mongodb');
	this.mkdir('app/modules/services/string');
	this.mkdir('app/modules/services/security');
	this.mkdir('app/modules/services/emailer');
	this.mkdir('app/modules/services/email');
	this.mkdir('app/modules/services/email/emailTemplates');
	this.mkdir('app/modules/services/email/emailTemplates/templates');
	this.mkdir('app/modules/services/email/emailTemplates/templates/passwordReset');
	this.mkdir('app/modules/services/email/emailTemplates/templates/test');
	this.mkdir('app/modules/services/texter');
	
	
	//B. template files (all templated files TOGETHER here)
	this.template('_bower.json', 'bower.json');
	this.template('_package.json', 'package.json');
	this.template('_README.md', 'README.md');
	this.template('_yuidoc-backend.json', 'yuidoc-backend.json');
	this.template('_yuidoc-frontend.json', 'yuidoc-frontend.json');
	//config
	this.template('app/configs/_config.json', 'app/configs/config.json');
	this.template('app/configs/_config.test.json', 'app/configs/config.test.json');
	
	
	//C. copy files & directories
	//NOTE: leading with just a '.' sometimes doesn't copy over properly / gives error so add the '_' even though not templating
	this.copy('_.bowerrc', '.bowerrc');
	this.copy('_.gitignore', '.gitignore');
	this.copy('CHANGELOG.md', 'CHANGELOG.md');
	this.copy('Gruntfile.js', 'Gruntfile.js');
	this.copy('run.js', 'run.js');
	
	//app folder
	this.copy('app/config_environment.json', 'app/config_environment.json');
	this.copy('app/database.js', 'app/database.js');
	this.copy('app/db_schema.json', 'app/db_schema.json');
	this.copy('app/dependency.js', 'app/dependency.js');
	this.copy('app/index.js', 'app/index.js');
	this.copy('app/server.js', 'app/server.js');
	
	//backend node tests
	this.directory('app/test');
	/*
	this.copy('app/test/all.spec.js', 'app/test/all.spec.js');
	this.copy('app/test/apiTestHelpers.js', 'app/test/apiTestHelpers.js');
	*/
	
	//node routes & api
	this.directory('app/routes');
	/*
	this.copy('app/routes/index.js', 'app/routes/index.js');
	
	this.copy('app/routes/api/base.js', 'app/routes/api/base.js');
	this.copy('app/routes/api/index.js', 'app/routes/api/index.js');
	
	this.copy('app/routes/api/rpc/api-help.html', 'app/routes/api/rpc/api-help.html');
	this.copy('app/routes/api/rpc/index.js', 'app/routes/api/rpc/index.js');
	*/
	
	//node modules
	
	//node controllers (routes / api calls)
	this.directory('app/modules/controllers');
	/*
	this.copy('app/modules/controllers/auth/auth.api.js', 'app/modules/controllers/auth/auth.api.js');
	this.copy('app/modules/controllers/auth/auth.js', 'app/modules/controllers/auth/auth.js');
	this.copy('app/modules/controllers/auth/auth.test.js', 'app/modules/controllers/auth/auth.test.js');
	
	this.copy('app/modules/controllers/follow/follow.api.js', 'app/modules/controllers/follow/follow.api.js');
	this.copy('app/modules/controllers/follow/follow.js', 'app/modules/controllers/follow/follow.js');
	this.copy('app/modules/controllers/follow/follow.test.js', 'app/modules/controllers/follow/follow.test.js');
	
	this.copy('app/modules/controllers/user/user.api.js', 'app/modules/controllers/user/user.api.js');
	this.copy('app/modules/controllers/user/user.js', 'app/modules/controllers/user/user.js');
	this.copy('app/modules/controllers/user/user.test.js', 'app/modules/controllers/user/user.test.js');
	*/
	
	//node services
	this.directory('app/modules/services');
	/*
	this.copy('app/modules/services/array/array.js', 'app/modules/services/array/array.js');
	
	this.copy('app/modules/services/crud/crud.js', 'app/modules/services/crud/crud.js');
	
	this.copy('app/modules/services/datetime/datetime.js', 'app/modules/services/datetime/datetime.js');
	
	this.copy('app/modules/services/lookup/lookup.js', 'app/modules/services/lookup/lookup.js');
	
	this.copy('app/modules/services/mongodb/mongodb.js', 'app/modules/services/mongodb/mongodb.js');
	
	this.copy('app/modules/services/string/string.js', 'app/modules/services/string/string.js');
	
	//node api/route security / auth
	this.copy('app/modules/services/security/security.js', 'app/modules/services/security/security.js');
	
	//node email
	this.copy('app/modules/services/emailer/index.js', 'app/modules/services/emailer/index.js');
	
	//node emailTemplates (for use with NodeMailer)
	this.copy('app/modules/services/email/emailTemplates/index.js', 'app/modules/services/email/emailTemplates/index.js');
	this.copy('app/modules/services/email/emailTemplates/templater.js', 'app/modules/services/email/emailTemplates/templater.js');
	this.copy('app/modules/services/email/emailTemplates/test.emailer.js', 'app/modules/services/email/emailTemplates/test.emailer.js');
	this.copy('app/modules/services/email/emailTemplates/transport.js', 'app/modules/services/email/emailTemplates/transport.js');
	
	this.copy('app/modules/services/email/emailTemplates/templates/passwordReset/html.ejs', 'app/modules/email/emailTemplates/templates/passwordReset/html.ejs');
	this.copy('app/modules/services/email/emailTemplates/templates/passwordReset/style.css', 'app/modules/email/emailTemplates/templates/passwordReset/style.css');
	this.copy('app/modules/services/email/emailTemplates/templates/passwordReset/text.ejs', 'app/modules/email/emailTemplates/templates/passwordReset/text.ejs');
	
	this.copy('app/modules/services/email/emailTemplates/templates/test/html.ejs', 'app/modules/email/emailTemplates/templates/test/html.ejs');
	this.copy('app/modules/services/email/emailTemplates/templates/test/style.css', 'app/modules/email/emailTemplates/templates/test/style.css');
	this.copy('app/modules/services/email/emailTemplates/templates/test/text.ejs', 'app/modules/email/emailTemplates/templates/test/text.ejs');
	
	//node texting / SMS
	this.copy('app/modules/services/texter/index.js', 'app/modules/services/texter/index.js');
	*/
}
};

MainGenerator.prototype.filesAngular = function filesAngular() {
if(this.subGenerator =='main') {
	
	//A. make all directories (do it at top so they're all created since templated files are collected here at the top)
	this.mkdir('app/src');
	this.mkdir('app/src/config');
	this.mkdir('app/src/config/protractor');
	this.mkdir('app/src/common');
	this.mkdir('app/src/common/font');
	this.mkdir('app/src/common/img');
	this.mkdir('app/src/common/js');
	this.mkdir('app/src/common/less');
	// this.mkdir('app/src/common/less/mixins');
	// this.mkdir('app/src/common/less/variables');
	this.mkdir('app/src/lib');
	this.mkdir('app/src/test');
	this.mkdir('app/src/modules');
	this.mkdir('app/src/modules/directives');
	this.mkdir('app/src/modules/pages');
	this.mkdir('app/src/modules/services');
	
	
	//B. template files (all templated files TOGETHER here)
	this.template('app/src/_README.md', 'app/src/README.md');
	
	
	//C. copy files & directories
	//NOTE: leading with just a '.' sometimes doesn't copy over properly / gives error so add the '_' even though not templating
	//main / root folder files
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
	this.copy('app/src/config/karma-e2e.conf.js', 'app/src/config/karma-e2e.conf.js');
	this.copy('app/src/config/protractor.conf-grunt.js', 'app/src/config/protractor.conf-grunt.js');
	
	//common
	this.directory('app/src/common/font');
	this.directory('app/src/common/img');
	this.directory('app/src/common/js');
	
	//this will copy over a grunt generated file (app/src/common/less/_base.less) but it's fine since it will be over-writen by grunt later)
	this.directory('app/src/common/less');
	/*
	this.copy('app/src/common/less/_base-grunt.less', 'app/src/common/less/_base-grunt.less');
	this.copy('app/src/common/less/body-other.less', 'app/src/common/less/body-other.less');
	this.copy('app/src/common/less/bootstrap-parts.less', 'app/src/common/less/bootstrap-parts.less');
	this.copy('app/src/common/less/buttons.less', 'app/src/common/less/buttons.less');
	this.copy('app/src/common/less/fonts.less', 'app/src/common/less/fonts.less');
	this.copy('app/src/common/less/form.less', 'app/src/common/less/form.less');
	this.copy('app/src/common/less/layout.less', 'app/src/common/less/layout.less');
	this.copy('app/src/common/less/layout-animate.less', 'app/src/common/less/layout-animate.less');
	this.copy('app/src/common/less/list.less', 'app/src/common/less/list.less');
	this.copy('app/src/common/less/margin-padding.less', 'app/src/common/less/margin-padding.less');
	this.copy('app/src/common/less/pop-up.less', 'app/src/common/less/pop-up.less');
	this.copy('app/src/common/less/reset.less', 'app/src/common/less/reset.less');
	this.copy('app/src/common/less/typography.less', 'app/src/common/less/typography.less');
	
	this.copy('app/src/common/less/variables/colors.less', 'app/src/common/less/variables/colors.less');
	this.copy('app/src/common/less/variables/_dir-paths.tpl', 'app/src/common/less/variables/_dir-paths.tpl');
	
	this.directory('app/src/common/less/mixins');
	*/
	
	//lib
	this.directory('app/src/lib');
	
	//test
	this.directory('app/src/test');
	
	//modules
	this.directory('app/src/modules/directives');
	this.directory('app/src/modules/pages');
	
	//this will copy over a grunt generated file (app/src/modules/services/config/config.js) but it's fine since it will be over-writen by grunt later)
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

MainGenerator.prototype.commandsNpm = function commandsNpm() {
if(this.subGenerator =='main') {
	var cb = this.async();
	var self =this;
	
	if(this.skipNpmInstall ===undefined || !this.skipNpmInstall) {
		var command ='npm';
		var args =['install'];
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

MainGenerator.prototype.commandsBower = function commandsBower() {
if(this.subGenerator =='main') {
	var cb = this.async();
	var self =this;
	
	if(this.skipBowerInstall ===undefined || !this.skipBowerInstall) {
		var command ='bower';
		var args =['install'];
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

MainGenerator.prototype.commandsGrunt = function commandsGrunt() {
if(this.subGenerator =='main') {
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

MainGenerator.prototype.commandsSelenium = function commandsSelenium() {
if(this.subGenerator =='main') {
	var cb = this.async();
	var self =this;
	
	if(this.skipSeleniumInstall ===undefined || !this.skipSeleniumInstall) {
		var command ='./node_modules/protractor/bin/install_selenium_standalone';
		var args =[];
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

MainGenerator.prototype.logNextSteps = function logNextSteps() {
if(this.subGenerator =='main') {
	this.log.writeln('Next steps:\n1. IF on Windows, run `./node_modules/protractor/bin/install_selenium_standalone`\n2. IF skipped any of the auto installs, run the install/build scripts - npm, bower, grunt\n3. Run `node run.js`\n4. Open a browser to `http://localhost:3000` to view the app!\nSee the README.md file for more info.');
}
};