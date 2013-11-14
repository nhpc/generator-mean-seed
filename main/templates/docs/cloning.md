# Cloning

Follow these steps for duplicating the app/website/code to OTHER servers/machines AFTER Yeoman has been run.

Give these steps to any fellow developers for them to get set up - they do NOT need to run Yeoman since you've already generated the app for them - the main generator for Yeoman only needs to be run ONCE (and potentially can be used for updates). Though other developers WILL use other Yeoman generators (i.e. for creating a new route), just not the main/core generator that builds the app from scratch the first time.

NOTE: all commands should be run in a terminal/command prompt window.
In general you'll have 2-3 terminal/command prompt windows open at once - one for running MongoDB (if not running by default / as a service), one for running node.js, and one for commands (mostly grunt)

1. machine (global / program) installs (if you don't have them already)
	1. install git, nodejs, mongodb, phantomjs, java - see [here for Mac/Windows](https://github.com/jackrabbitsgroup/generator-mean-seed/blob/master/main/templates/docs/setup-server-windows-mac.md) or [here for Linux](https://github.com/jackrabbitsgroup/generator-mean-seed/blob/master/main/templates/docs/setup-server-linux.md)
	2. `sudo npm install -g grunt-cli yo bower generator-mean-seed jasmine-node less karma yuidocjs forever`
	3. IF using Github (to clone/push/pull from), set it up:
		1. `git config --global user.name "<your name>"`
			1. i.e. git config --global user.name "Joe Bob"
		2. `git config --global user.email "<your email>"`
			1. i.e. git config --global user.email youremail@email.com
		3. `git config --global --add color.ui true`
2. Clone the Git repository
	1. In command prompt, navigate to the folder where you want the app to be created in
		1. `cd /path/to/parent/folder`
	2. `git clone [repository location] [newFolderNameToCloneInto]`
	3. Go into your newly cloned directory: `cd /path/to/parent/folder/newFolderNameToCloneInto`
3. [Maybe] Setup configs (see below)
4. Do some setup / installs
	1. `npm install && bower install`
		1. NOTE: you'll have to re-run this any time `package.json` or `bower.json` changes
	2. `grunt q` to build assets
		1. NOTE: you'll have to re-run this any time a `*.less` or `*.html` file changes
	3. `./node_modules/protractor/bin/install_selenium_standalone` - for Protractor (local) tests
5. start server and view app
	1. `node run.js` to start node server (make sure MongoDB is already running first)
		1. Type `Ctrl + C` to quit/stop
	2. open a browser to `http://localhost:3000/` to view the site/app
6. run tests (and confirm they all pass!)
	1. `node run.js config=test` (in separate terminal/command line window)
	2. `grunt`
	

### More Info
See `setup-detailed.md` and `running.md` in the `docs` folder.



## Configs
`app/configs` holds the configuration files for the entire app, for EVERY environment. Configs are paired - for EACH environment there's a regular config (*.json) and a test config (*.test.json). The default `config.json` should work for your localhost (local development) so you shouldn't need to change anything. However, if you have issues or get errors when running grunt or viewing the site, create a NEW pair of config files and copy/set `config_environment.json` to use these new configs.

### Creating a new config pair

1. select a unique name for your new config (i.e. assuming this is for a local/localhost environment and your name is 'john', call it `localjohn` - we'll use this name for the rest of the steps; just replace it accordingly).
2. copy `config.json` and rename it `config-localjohn.json`. Then open this file and edit the values appropriately to match your environment. Typically this means changing (at least) the following:
	1. `operatingSystem` to whatever computer you're using (i.e. `windows` or `mac`)
	2. `forever` to `0`
	3. `server.domain` to `localhost`
	4. blank out the `sauceLabs` values so the Protractor tests will run locally using the Selenium Standalone Server.
3. copy `config-localjohn.json` and rename it `config-localjohn.test.json` and edit the values appropriately for your TEST environment. Typically this means changing the following:
	1. `server.port` (to a DIFFERENT port than you're using on the non test config)
	2. `server.socketPort` (to a DIFFERENT port than you're using on the non test config)
	3. `db.database` - i.e. to the same value as `app.name`
4. copy and set the `config_environment.json` to use this environment with: `cp app/config_environment.json config_environment.json` and then edit the file to set the `environment` key of your new environment: `localjohn`.

