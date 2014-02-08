/**
@todo
- test
	- make sure folder + 3 files get written properly
	- make sure 3 files get updated properly
	- run tests & make sure they work

- remove the need to check this.optSubGenerators in EVERY function (i.e. find a way to NOT call this generator AT ALL if sub generator is wrong, but hookFor doesn't seem to be able to be conditionally called based on prompts..?)

@toc
1. askFor
2. files
3. updateRoutesIndex
4. updateAllSpec
5. updateApiHelp
6. updateDBSchema

Manual instructions (what this generator does)
- Add a new api route group. To add an individual api call to an existing group, just edit the files below accordingly.
	1. Create a new folder in `app/modules/controllers` with the name of your new api endpoint namespace and fill it with the following files. In general, just copy an existing route and then edit the files to fit your new route.
		1. [your-module].api.js		The rpc route setup (endpoints, parameters, function calls)
		2. [your-module].js		The controller/model file that interacts with the database and actually does the work
		3. [your-module].test.js		Jasmine-node tests for these new routes
	2. `require` your new api file and set up the router endpoints in `app/routes/api/index.js`.
	3. Update `app/test/all.spec.js` to include and run your new tests. Typically, 3 additions need to be made:
		1. `require` [your-module].test.js file at the top.
		2. Call it in the `initModules` function. (Pass in the db, api, and any other modules you need access in your test file.)
		3. Actually run your tests. In general, these should have a `run` function that returns a promise when all tests are complete.
	4. Add an html link to `app/routes/api/rpc/api-help.html` to add your api to the reference. (The links are somewhere around line 365.)
	5. [CRUD only] Add a new collection to `app/db_schema.json`


NOTE: uses Yeoman this.spawnCommand call to run commands (since need to handle Windows/different operating systems and can't use 'exec' since that doesn't show (live) output)
*/

'use strict';
var fs =require('fs');

var util = require('util');
var yeoman = require('yeoman-generator');

var BuildfilesMod =require('../common/buildfiles/buildfiles.js');
var PromptsMod =require('../common/prompts/prompts.js');

var NodeControllerGenerator = module.exports = function NodeControllerGenerator(args, options, config) {
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

util.inherits(NodeControllerGenerator, yeoman.generators.NamedBase);

/**
@toc 1.
@method askFor
*/
NodeControllerGenerator.prototype.askFor = function askFor() {
if(this.optSubGenerators.indexOf('node-controller') >-1) {
	var cb = this.async();
	
	var prompts = [
		{
			name: 'optControllerName',
			message: "UNIQUE, full controller (singular, not plural) name (i.e. 'product' or 'user-product')",
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
			type: 'list',
			name: 'optControllerType',
			message: 'What type of controller?',
			choices: [
				'crud',
			],
			default: 'crud'
		}
	];
	
	this.prompt(prompts, function (props) {
		//format some
		
		var skipKeys =[];
		var toInt =[];
		
		var newProps =PromptsMod.formProps(prompts, props, skipKeys, toInt, {});
		var xx;
		for(xx in newProps) {
			this.options.props[xx] =this[xx] =newProps[xx];
		}
		
		//handle some special ones (the skipKeys from above)
		
		this.options.props.optControllerName =this.optControllerName =this.optControllerName.toLowerCase();		//ensure lower case to start
		//add some
		this.options.props.optControllerNameCamel =this.optControllerNameCamel = this._.camelize(this.optControllerName);
		this.options.props.optControllerNameUnderscore =this.optControllerNameUnderscore = this.optControllerName.replace(/-/g, '_');
		this.options.props.optControllerNameCaps =this.optControllerNameCaps = this._.capitalize(this.optControllerNameCamel);
		this.options.props.optControllerNameUpper =this.optControllerNameUpper = this.optControllerNameCamel.toUpperCase();
		
		this.options.props.optControllerName =this.optControllerName =this.optControllerNameCamel;		//now having them set option as snake case so convert it here - NOTE: must do this LAST though since other formatting above assumes/depends on snake case!
		
		cb();
	}.bind(this));
}
};

/**
@toc 2.
@method files
*/
NodeControllerGenerator.prototype.files = function files() {
if(this.optSubGenerators.indexOf('node-controller') >-1) {

	var ii;
	
	var pathBase ='app/modules/controllers/';
	var controllerPath =pathBase+this.optControllerNameCamel;
	//A. make all directories (do it at top so they're all created since templated files are collected here at the top)
	//create sub-directories first if they don't exist
	this.mkdir(controllerPath);
	
	
	//B. template files (all templated files TOGETHER here)
	if(this.optControllerType =='crud') {
		this.template('newCrud/_newCrud.api.js', controllerPath+'/'+this.optControllerNameCamel+'.api.js');
		this.template('newCrud/_newCrud.js', controllerPath+'/'+this.optControllerNameCamel+'.js');
		this.template('newCrud/_newCrud.test.js', controllerPath+'/'+this.optControllerNameCamel+'.test.js');
	}
	
	
	//C. copy files & directories
	//NOTE: leading with just a '.' sometimes doesn't copy over properly / gives error so add the '_' even though not templating
	
}
};

/**
@toc 3.
@method updateRoutesIndex
*/
NodeControllerGenerator.prototype.updateRoutesIndex = function updateRoutesIndex() {
if(this.optSubGenerators.indexOf('node-controller') >-1) {
	var path ='app/routes/api/index.js';
	// var contents =this.read(path);
	var contents =this.readFileAsString(path);
	
	var indexStart, newData;
	
	//require api file
	indexStart =contents.indexOf('//end: yeoman generated REQUIRE here');
	if(indexStart >-1) {
		newData ="var "+this.optControllerNameCaps+"Api =require(pathPart+'"+this.optControllerNameCamel+"/"+this.optControllerNameCamel+".api.js');\n";
		contents =contents.slice(0, (indexStart))+newData+contents.slice((indexStart), contents.length);
	}
	
	//init api module
	indexStart =contents.indexOf('//end: yeoman generated INIT API MODULES here');
	if(indexStart >-1) {
		newData ="var "+this.optControllerNameCamel+"Api = new "+this.optControllerNameCaps+"Api({\n"+
		"	db: db\n"+
		"});\n";
		contents =contents.slice(0, (indexStart))+newData+contents.slice((indexStart), contents.length);
	}
	
	//set up endpoint
	indexStart =contents.indexOf('//end: yeoman generated ENDPOINTS here');
	if(indexStart >-1) {
		newData =this.optControllerNameCamel+": {\n"+
		"	modules: {\n"+
		"		"+this.optControllerNameCamel+": "+this.optControllerNameCamel+"Api\n"+
		"	},\n"+
		"	middleware: []\n"+
		"},\n";
		contents =contents.slice(0, (indexStart))+newData+contents.slice((indexStart), contents.length);
	}
	
	//write it (actually update the file now)
	this.write(path, contents);
}
};

/**
@toc 4.
@method updateAllSpec
*/
NodeControllerGenerator.prototype.updateAllSpec = function updateAllSpec() {
if(this.optSubGenerators.indexOf('node-controller') >-1) {
	var path ='app/test/all.spec.js';
	// var contents =this.read(path);
	var contents =this.readFileAsString(path);
	
	var indexStart, newData;
	
	//require api file
	indexStart =contents.indexOf('//end: yeoman generated REQUIRE here');
	if(indexStart >-1) {
		newData ="var "+this.optControllerNameCaps+"Tests =require(pathParts.modules+'/controllers/"+this.optControllerNameCamel+"/"+this.optControllerNameCamel+".test.js');\n";
		contents =contents.slice(0, (indexStart))+newData+contents.slice((indexStart), contents.length);
	}
	
	//init test module
	indexStart =contents.indexOf('//end: yeoman generated INIT MODULES here');
	if(indexStart >-1) {
		newData =this.optControllerNameCaps+"Tests = new "+this.optControllerNameCaps+"Tests({db: db, api:api});\n";
		contents =contents.slice(0, (indexStart))+newData+contents.slice((indexStart), contents.length);
	}
	
	//run tests
	indexStart =contents.indexOf('//end: yeoman generated RUN TESTS here');
	if(indexStart >-1) {
		newData =".then("+this.optControllerNameCaps+"Tests.run({}))\n";
		contents =contents.slice(0, (indexStart))+newData+contents.slice((indexStart), contents.length);
	}
	
	//write it (actually update the file now)
	this.write(path, contents);
}
};

/**
@toc 5.
@method updateApiHelp
*/
NodeControllerGenerator.prototype.updateApiHelp = function updateApiHelp() {
if(this.optSubGenerators.indexOf('node-controller') >-1) {
	var path ='app/routes/api/rpc/api-help.html';
	// var contents =this.read(path);
	var contents =this.readFileAsString(path);
	
	var indexStart, newData;
	
	//add link
	indexStart =contents.indexOf('<!-- end: yeoman generated LINK here');
	if(indexStart >-1) {
		newData ="<li><a href='/api/"+this.optControllerNameCamel+"/help'>"+this.optControllerNameCaps+"</a></li>\n";
		contents =contents.slice(0, (indexStart))+newData+contents.slice((indexStart), contents.length);
	}
	
	//write it (actually update the file now)
	this.write(path, contents);
}
};

/**
@toc 6.
@method updateDBSchema
*/
NodeControllerGenerator.prototype.updateDBSchema = function updateDBSchema() {
if(this.optSubGenerators.indexOf('node-controller') >-1) {
	var path ='app/db_schema.json';
	// var contents =this.read(path);
	var contents =this.readFileAsString(path);
	
	var indexStart, newData;
	
	//add collection
	indexStart =contents.lastIndexOf('}');		//add to end
	if(indexStart >-1) {
		newData ='	,"'+this.optControllerNameUnderscore+'":\n'+		//need leading comma for previous collection
		'	{\n'+
		'	}\n';
		contents =contents.slice(0, (indexStart))+newData+contents.slice((indexStart), contents.length);
	}
	
	//write it (actually update the file now)
	this.write(path, contents);
}
};