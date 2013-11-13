# <%= appName %>

## Demo
- [Website](http://198.199.118.44:3000/)
- [Continuous Integration](http://198.199.118.44:3010/)
	- This automatically deploys and tests the yeoman generated mean-seed website on each Github push (from local development)
- [Github Repo with Generated Code](https://github.com/jackrabbitsgroup/mean-seed-gen)

## Quick Start

1. machine (global / program) installs (if you don't have them already)
	1. install git, nodejs, mongodb, phantomjs
	2. `sudo npm install -g grunt-cli yo bower generator-mean-seed jasmine-node less karma yuidocjs forever`
2. `yo mean-seed` (from the NEW directory you want to create the app in)
	1. `npm install && bower install` (if not already run successfully by Yeoman or any time `package.json` or `bower.json` change)
	2. `./node_modules/protractor/bin/install_selenium_standalone` (if not already run successfully by Yeoman)
	3. `grunt q` to build assets (if not already run successfully by Yeoman and any time a `*.less` or `*.html` file changes)
3. start server and view app
	1. `node run.js` to start node server (make sure MongoDB is already running first)
	2. open a browser to `http://localhost:3000/` to view the site/app
4. run tests
	1. `node run.js config=test` (in separate terminal/command line window)
	2. `grunt`



## Setup + Running (Longer Version)
- see `setup-running.md` in the `docs` folder
	
	
## More Info
- see the `docs` folder for more documentation. Key docs (roughly in order of priority) listed below:
	- setup-running.md (if you want more info/help than from the Quick Start section above)
	- overview.md
	- file-structure.md
	- common-actions.md
	- deploy.md
	- testing.md
	- continuous-integration.md
	- frontend-angular.md
	- backend-node.md
	- design.md

	

## MEAN (Mongo Express Angular Node) seed
- Built using Mean-Seed: https://github.com/jackrabbitsgroup/generator-mean-seed
	- see here for more details - technology used, dependencies, limitations/compatibility, code standards, directory/file structure, workflow, etc.
- *MongoDB, Express.js, AngularJS, Node.js + Yeoman (Grunt, Bower, Yo) + Jasmine, Karma, Protractor*