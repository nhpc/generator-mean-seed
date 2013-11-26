# Generators

Generators (used interchangeably with "subgenerators" since they are ALL subgenerators the mean-seed generator) are broken into the following types:

1. Core
	1. These seed the app from scratch and make choices as to what core technologies are used
		1. ALL cores should use the following:
			1. MEAN (MongoDB, Express, AngularJS, Node.js)
			2. Git
			3. Yeoman (Yo, Grunt, Bower)
			4. NPM
		2. but outside of that, different cores give flexibility. Some (non-exhaustive) examples below:
			1. CSS pre-processor: LESS vs SCSS
			2. Testing framework / language: Jasmine vs Mocha
			3. MongoDB framework: mongo-db-native vs Mongoose
	2. Naming convention: "core-[core name]" i.e. "core-default" is the main (default) core.
	
2. Module
	1. These are added on top of an existing Core. Modules may or may not support more than one Core.
	2. Naming convention:
		1. "[core name]-[module name]" IF this module only works for ONE Core
			1. I.e. "default-ng-route"
		2. "[module name]" (no core prefix) IF this module works for MULTIPLE Cores
			1. I.e. "ng-route"
		3. "module name" prefixes:
			1. "ng-*" for Angular modules (i.e. generating a directive, service, new route/page)
				1. I.e. "ng-route"
			2. "node-*" for Node.js modules (i.e. generating a new API route, service)
				1. I.e. "node-route"
				
3. Helper
	1. These are (typically) NOT standalone generators and are just for modularity and to keep things DRY - other generators may use these to perform common actions such as running commands or logging next steps output. See `helpers.md` for a list and more info.
	2. Naming convention: "helper-[helper name]" i.e. "helper-commands".
				
				
## Adding a new generator
1. Copy an existing generator folder and modify accordingly
	1. Make sure to name it with the naming conventions / prefixes above!
2. Update the following files:
	1. `Gruntfile.js` (jshint for linting whatever files you want to lint)
	2. `app/index.js` for calling your generator (search for `core-default` or an existing generator and update/add yours accordingly)
3. Add documentation for your new generator to the `docs/generators` folder (either in `modules.md` if it's a non-Core specific module or in the appropriate `core-*.md` file.
