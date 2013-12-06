/**
@todo
- remove the need to check this.optSubGenerators in EVERY function (i.e. find a way to NOT call this generator AT ALL if sub generator is wrong, but hookFor doesn't seem to be able to be conditionally called based on prompts..?)

@toc
1. files

NOTE: uses Yeoman this.spawnCommand call to run commands (since need to handle Windows/different operating systems and can't use 'exec' since that doesn't show (live) output)
*/

'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

// var exec = require('child_process').exec;
// var spawn = require('child_process').spawn;

var CoreDefaultNodeGenerator = module.exports = function CoreDefaultNodeGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	//copy over prompt options to 'this' scope for templating
	var xx;
	for(xx in this.options.props) {
		this[xx] =this.options.props[xx];
	}
};

util.inherits(CoreDefaultNodeGenerator, yeoman.generators.NamedBase);

/**
@toc 1.
@method files
*/
CoreDefaultNodeGenerator.prototype.files = function files() {
if(this.optSubGenerators.indexOf('core-default-node') >-1) {

	//A. make all directories (do it at top so they're all created since templated files are collected here at the top)
	this.mkdir('docs');
	// this.mkdir('docs/files');
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
	this.template('_package.json', 'package.json');
	this.template('_README.md', 'README.md');
	this.template('_yuidoc-backend.json', 'yuidoc-backend.json');
	this.template('_Gruntfile.js', 'Gruntfile.js');
	this.template('_.gitignore', '.gitignore');
	this.template('_version.js', 'version.txt');
	
	//config
	this.template('app/configs/_config.json', 'app/configs/config.json');
	this.template('app/configs/_config.test.json', 'app/configs/config.test.json');
	
	//docs
	// this.template('docs/files/_file-structure.md', 'docs/files/file-structure.md');
	
	
	//C. copy files & directories
	//NOTE: leading with just a '.' sometimes doesn't copy over properly / gives error so add the '_' even though not templating
	
	this.copy('CHANGELOG.md', 'CHANGELOG.md');
	this.copy('run.js', 'run.js');
	this.copy('ci.js', 'ci.js');
	this.copy('spawn_command.js', 'spawn_command.js');
	
	//docs
	this.directory('docs');
	// this.copy('docs/overview.md', 'docs/overview.md');
	// this.directory('docs/backend-node');
	// this.directory('docs/conventions-style-guide');
	// this.directory('docs/frontend-angular');
	// this.directory('docs/setup-running');
	// this.directory('docs/testing-automation');
	// this.directory('docs/tools-dependencies');
	
	// this.copy('docs/files/configs.md');
	
	
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