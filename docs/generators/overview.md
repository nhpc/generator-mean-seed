# Generators

Generators (used interchangeably with "subgenerators" since they are ALL subgenerators the mean-seed generator) are broken into the following types:

1. Core
	1. These seed the app from scratch AND handle updates and make choices as to what core technologies are used
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
	1. These are (typically) NOT standalone generators and are just for modularity and to keep things DRY - other generators may use these to perform common actions such as running commands or logging next steps output. See [helpers.md](helpers.md) for a list and more info.
	2. Naming convention: "helper-[helper name]" i.e. "helper-commands".
				
				
				
## Updates / Merging Strategy (for Cores)
The great advantage to Yeoman/Yo is automation and customized readme and other files (that normally would have to either be generic or in the .gitignore file to avoid constant merge conflicts). HOWEVER, this makes updates a bit more difficult since just running the generator again will just give the option to overwrite OR ignore updates to the seed (neither of which is good enough). SO, we do the updates (just overwrite all changes) on a SEPARATE branch (naming convention is 'yo-[name of core]') and THEN merge into the main (default is 'master') branch - this will then merge the ALREADY templated/generated updated seed so avoid the merge conflicts and any other conflicts will be merged (manually if it can't do it automatically). This should allow updating the seed be re-running the generator, WITHOUT just blinding overwriting any changes to the project since the last generation.

So the process is (all automated in Yeoman):

1. `git checkout yo-[core-name]` to switch to (and create first if necessary) a "updates only" 'yo-[core-name]' branch
2. run the generator for the core here on this SEPARATE branch (user should just overwrite (all) files to the new core/seed version)
3. `git add -A && git commit -am 'yo mean-seed update'` to commit the new updates on the SEPARATE branch
4. `git checkout master` to switch to (and create first if necessary) the main working branch (where we could have conflicts)
	1. *'master' is replaced with optGitBranch prompt, if set
5. `git merge yo-[core-name]` to merge in the new updates to the existing working branch - just as with any git merge or any update of a non-Yeoman/generator git repo that has updates.

So basically the first 4 steps create a 'custom repo' for THIS config/prompts set and then use THAT for the merge. So in essence the main generator is a template for updates and you first must generated the updated version of YOUR app (using YOUR config / generated files) to merge again, NOT against the raw templated version of the app.


## Adding a new generator
1. Copy an existing generator folder and modify accordingly
	1. Make sure to name it with the naming conventions / prefixes above!
2. Update the following files:
	1. `Gruntfile.js` (jshint for linting whatever files you want to lint)
	2. `app/index.js` for calling your generator (search for `core-default` or an existing generator and update/add yours accordingly)
3. Add documentation for your new generator to the `docs/generators` folder - either in [modules.md](modules.md) if it's a non-Core specific module or in the appropriate `core-*.md` file.
	1. Add your new generator to the list of generators on the main/root [README.md](../../README.md) file
	2. Update any associated `docs` folders / documentation (i.e. in the core generators) for how and when to use your generator (i.e. for 'common actions' sections of readme/documentation files)
