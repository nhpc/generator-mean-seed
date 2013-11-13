# Setup + Running

### Setup
1. [ONCE PER MACHINE/ENVIRONMENT] machine (global / program) installs
	1. Install git, nodejs, mongodb, and phantomjs
		1. See other README's (i.e. `docs/setup-server-windows-mac.md` or `docs/setup-server-linux.md`) or just google search for steps on how to do this.
		2. Configure git (required for pushing and pulling)
			1. `git config --global user.name "<your name>"`
			2. `git config --global user.email "<your email>"`
			3. `git config --global --add color.ui true`
	2. Install global NPM packages.
		1. `sudo npm install -g grunt-cli bower yo jasmine-node less karma yuidocjs forever generator-mean-seed`
			1. NOTE: karma doesn't seem to always work if install globally?? so it's in package.json now so will be installed locally (as well)
		2. NOTE: IF new global npm packages are installed, you'll need to run this again.
	3. Install Selenium server (for local Protractor tests, if using SauceLabs or another remote server, this can be skipped. Also NOTE this must be done AFTER `npm install` below since it requires Protractor first)
		1. `./node_modules/protractor/bin/install_selenium_standalone`

2. Create a new directory where you want your app to be and then navigate to it (with `cd`) and run yeoman generator with `yo mean-seed`
	1. You can skip the prompts if you want by using a JSON config file. To do so, create a `yo-configs` folder and add a JSON file to it with the answers to the prompts (see or copy a file in the `yo-configs` folder from here for reference: https://github.com/jackrabbitsgroup/generator-mean-seed ).
		1. To copy from the global generator-mean-seed install (and edit on command line - i.e. with `sudo vi default.json`) use `cp [path to generator-mean-seed]/yo-configs/default.json yo-configs/default.json` and then edit is as needed.
		2. To edit locally and then copy remotely to your server use `scp default.json [user]@[remote host ip/domain]:/[path to new app]/yo-configs/default.json`

3. Install nodejs and bower dependencies using `npm` and `bower`. This only needs to be done once initially, but must be re-run every time package.json is updated. When in doubt, run `npm install && bower install` from your project root since you can't run it too much (if you run it extra times it won't do anything).
```bash
cd /path/to/project
npm install && bower install
```
	1. NOTE: If you get an EACCESS error on `npm install`, try it with `sudo` in front..
	2. NOTE: If you are on Windows and get a bson error (or any errors, for that matter), try it with Cygwin. Sometimes it doesn't work on Git Bash, but it will on Cygwin due to permissions issues. See http://stackoverflow.com/questions/14100027/cant-install-js-bson for more information.

4. [ONLY if using NodeMailer with EmailTemplates for email AND on PRODUCTION / non-localhost SERVERS ONLY - this is NOT required so you can skip this step] Install email templates. Since there are both Windows and non-Windows versions and they can create installation issues if used on the wrong machine, these cannot be included in package.json and must instead be installed manually. If on Windows, use `email-templates-windows`.
```bash
cd /path/to/project
npm install email-templates
```

5. [OPTIONAL] Use a different / non-default config.json file
	1. All the config.json files for ALL environments should be in version control in the `app/configs` folder. To determine which file is used, the `config_environment.json` file is checked and IF it exists AND the `environment` key exists, that environment will be used. The naming conventions are: `config-[your environment].json` for the config (i.e. `config-triggerio.json`) and `config-[your environment].test.json` for the accompanying test config (for running tests, which should run on a DIFFERENT, dummy database as it will be wiped clean each time!). So if you want to use the non-default environment, do the steps below:
	2. FYI, the config.json file is used in the following files:
		1. Gruntfile.js
		2. run.js
		3. app/test/apiTestHelpers.js
```bash
# cd to root project directory
cd /path/to/project
# copy the config_environment.json file and set the `environment` key to your new environment.
cp app/config_environment.json config_environment.json
# Copy then EDIT your new config file
cp app/config.json app/config-[your environment].json
# Copy then EDIT your new config file for its test configuration (for backend tests)
cp app/config-[your environment].json app/config-[your environment].test.json
# Update your new, copied test config for the test environment - specifically, change 'db.database' and 'session.store.db' to a different testing database, such as 'test_temp'. Also, optionally, change the `server.port` so that way both the test server and the non-test server can run at the same time.
```


### Running
1. run MongoDB (if using local install of MongoDB and it's not already running)

2. [just in case] run `npm install && bower install` (from the root directory of this app - all commands are from the root directory of this app unless noted otherwise)

3. Run grunt from the root project folder (the folder that has "Gruntfile.js" in it) to build all files. Grunt should be run after most file changes and prior to any commits. NOTE: the default `grunt` command also runs tests and requires a node test server to be running first (more below) and there are other grunt commands as well.
	1. NOTE: you'll have to re-run this command every time you update a (frontend) .less or .html file to rebuild assets. When in doubt, re-run grunt!
```bash
grunt q
```

4. Start the node server from the root project folder.
	1. NOTE: you'll have to re-run this command to restart the server every time you change a (backend) node.js file
```bash
node run.js
```

5. To view the site and/or documentation, open a browser and go to the following urls. The precise urls used will depend on the domain and port specified in config.json. Assuming `localhost` and `3000`, they would be:
	1. View site: `http://localhost:3000/`
	2. View api docs: `http://localhost:3000/api/help`
	3. View YUI auto documentation (make sure to run `grunt yui` first to generate these pages):
		1. frontend: open `/yuidocs/frontend/index.html` in a browser
		2. backend: open `/yuidocs/backend/index.html` in a browser
		

### Notes		
1. The backend and frontend are separated. Frontend files are located in the `app/src` folder. Everything else is considered the backend, with the exception of:
	1. `Gruntfile.js`. This builds files for both the backend and frontend, since you only want to have to run it once.
	2. The `configs` folder. These files contain properties for both the backend and frontend.
	

### Running Tests
1. Open a new command prompt/terminal window and type `node run.js config=test` to run the test server (this connects to the test database and wipes it clean on each run)
2. Run `grunt` from the root app directory - this will run all tests:
	1. backend node.js Jasmine (API route) tests
	2. frontend Karma unit tests
	3. frontend Protractor / Selenium end-to-end (E2E) tests
