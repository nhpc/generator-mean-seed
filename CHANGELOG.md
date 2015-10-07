Version numbers correspond to `package.json` version.

Versioning: See [http://semver.org/](http://semver.org/)
Development (WIP - Work In Progress) or small fixes versions (in-between full versions) are typically `*-x` versions. This allows rapid iteration and you can pull in updates (by updating your generator with `npm install -g generator-mean-seed`) as often as you like. Or you can just wait for the final release of the version.
The dashed `*-x` numbers PRECEDE the new version release (i.e. v1.0.9-1 is AFTER v1.0.8 but BEFORE v1.0.9)

Since this is a generator project, these changes refer to BOTH the generator itself AND to generated code so changes are SEPARATED and indicated where possible so people can find the changes that actually affect them (i.e. changes to the generator itself don't affect people just using the GENERATED code - end developers who aren't contributors to the generator just need to know about changes to the generators they're using).

Conventions / labels:

- have '**Internal**' (for interal changes that don't affect the end-generated code) and '**Generators**' sub-sections.
	- within the 'Generators' sub-sections, use brackets at the end to list the generators that were affected, i.e. [core-default, ng-route].
		- use '**[_all]**' for changes that affect ALL generators.
		- in general, try to order changes from most to least in terms of the number and size of how many generators were affected (i.e. put '_all' and 'core-*' changes at the top).
		

# 1.1.25 (2015-10-02)
## Bug Fixes
### Generators
- fix: updated e2e tests to match new google login scheme

## Features
### Generators
- chore: update `package.json` dependencies [core-default, core-scss]
	- NOTE: updated `protractor` to `2.4.0` so you will need to re-run `./node_modules/protractor/bin/webdriver-manager update`
	- NOT updated on purpose:
		 - `mongodb`
		 - `grunt-shell-spawn`
		 - `grunt-karma`, `karma` (causes unit tests to hang)
		 - `protractor@2.5.0` (does not currently support node<0.12)

# 1.1.24 (2015-07-12)
## Bug Fixes
### Internal
- fix spawn commands to work on mac

## Features
### Generators
- chore: update `package.json` dependencies [core-default, core-scss]


# 1.1.23 (2015-05-30)
## Bug Fixes
### Internal
- add `underscore` as a dependency

### Generators
- update grunt forever run script to use `--uid` option instead of `-m` option for naming and add `minUptime` and `spinSleepTime` options [core-default, core-scss]


## Features
### Generators
- chore: update `package.json` dependencies [core-default, core-scss]
	- NOTE: updated `protractor` to `2.1.0` so you will need to re-run `./node_modules/protractor/bin/webdriver-manager update`
	- NOT updated on purpose:
		 - `mongodb`, `karma-phantomjs-launcher`
		 - `grunt-shell-spawn` (breaks things on Windows)
- chore: update AngularJS to `1.4.0` [core-default, core-scss]


# 1.1.22 (2015-05-30)
## Bug Fixes
### Internal
- pull request for proper versions of dependencies


# 1.1.21 (2015-04-24)
## Features
- docs: add MEAN-seed video course link for learning to code with MEAN stack


# 1.1.20 (2015-04-13)
## Bug Fixes
### Generators
- karma config add missing comma [core-default, core-scss]


# 1.1.19 (2015-04-13)
## Features
### Internal
- package.json update for new repo location


# 1.1.18 (2015-04-12)
## Features
### Generators
- chore: update `package.json` dependencies [core-default, core-scss]
	- update `protractor` to `2.0.0`
	- revert `grunt-shell-spawn` from `0.3.2` to `0.3.0` since higher versions breaks on Windows..?
- docs: update `deploy.md` Continuous Integration Concrete set up `forever start` step directory from `.` to `APP_PATH` to avoid errors.
- docs / karma config: update for karma / phantomjs memory issues for failing automated tests


# 1.1.17 (2015-03-02)
## Features
### Generators
- chore: update Facebook login link to use v2.0 [core-default, core-scss]


# 1.1.16 (2015-02-25)
## Features
### Generators
- chore: update `package.json` dependencies [core-default, core-scss]
	- did NOT update `grunt-shell-spawn` from `0.3.0` to `0.3.1` since it breaks on Windows..?
- chore: update AngularJS to `1.4.0-beta.5` [core-default, core-scss]


# 1.1.15 (2015-01-02)
## Features
### Generators
- test: refactor protractor e2e tests to be modularized, use pageObjects, and add in social login (facebook, google, twitter) tests [core-default, core-scss]
	- add in `e2e` object in `config.json` with testing credentials
		- NOTE: make sure to add your credentials here and add this key/object to all config files. You will likely need to create some new social logins for testing purposes and may have to "accept permissions" for first time runs during the test
	- remove old `route.scenarios.js`
	- add backend `e2eMocks` api route
	- add frontend `e2e` page


# 1.1.14 (2015-01-02)
## Features
### Generators
- refactor: switch Google+ login to use server side flow to save over half a second on (page) load time [core-default, core-scss]
	- remove google library frontend javascript file and `socialAuth` service all together, as well as `angular-google-auth` bower dependency
	- add backend google node controller and googleapis npm dependency
	- configs: google clientSecret and callback_url now required in (all) `config.json` files
		- MAKE SURE to add this callback_url ( http(s)://[your_domain]/callback-google-auth ) AND a test version (port 3005 typically) also to the "redirect URIs" section in the Google Developers Console: https://console.developers.google.com
- chore: update `package.json` dependencies [core-default, core-scss]


# 1.1.13 (2014-12-24)
## Features
### Generators
- chore: update `package.json` dependencies [core-default, core-scss]
- chore: update AngularJS to `1.3.8` [core-default, core-scss]


# 1.1.12 (2014-12-16)
## Features
### Generators
- chore: update `package.json` dependencies [core-default, core-scss]
- chore: update AngularJS to `1.3.7` [core-default, core-scss]
		

# 1.1.11 (2014-12-02)
## Bug Fixes
### Generators
- chore: update google plusone/gapi script so it works again [core-default, core-scss]

## Features
### Generators
- auth.js frontend fix to skip redirect url for non login pages (e.g. user-delete) [core-default, core-scss]
- chore: update `package.json` dependencies [core-default, core-scss]
- chore: update AngularJS to `1.3.5` [core-default, core-scss]


# 1.1.10 (2014-11-10)
## Features
### Generators
- chore: update `package.json` dependencies [core-default, core-scss]
	- fix karma units tests for new Jasmine 2.0 syntax (since updated `karma-jasmine` to `0.2.3`)
- chore: update AngularJS to `1.3.2` [core-default, core-scss]


# 1.1.9 (2014-10-29)
## Bug Fixes
### Generators
- fix improper (backend) `lodash.merge` and `lodash.extend` usage [core-default, core-scss]

## Features
### Generators
- chore: update `package.json` dependencies [core-default, core-scss]
- chore: update AngularJS to `1.3.0` [core-default, core-scss]
- move `angular-mocks` to bower to ensure it is always up to date; remove the old `lib/angular` folder accordingly [core-default, core-scss]


# 1.1.8 (2014-10-08)
## Bug Fixes
### Generators
- properly prefix `$templateCache` variables with grunt `ngtemplates` task (as of a few versions ago, the templates had a bad prefix path name so were not doing anything so this re-fixes it!) [core-default, core-scss]

## Features
### Generators
- chore: update `package.json` dependencies [core-default, core-scss]
- chore: update AngularJS to `1.3.0-rc.4` [core-default, core-scss]


# 1.1.7 (2014-10-01)
## Features
### Generators
- update to support browserstack with Protractor [core-default, core-scss]
- chore: update `package.json` dependencies [core-default, core-scss]
	- NOTE: protactor was only updated to `1.2.0` since `1.3.0` does not currently seem to work with browserstack..
- support test environment on frontend, so running test server will ALSO use test confing on FRONTEND (previously this was not possible) [core-default, core-scss]
	- add new `index-test-grunt.html` and `modules/services/config-test-grunt.js` files and update Gruntfile, buildfilesModules, buildfilesModulesGroups to use these files. Update backend to serve `index-test.html` if on test environment.
- twitter testing configs update: add `127.0.0.1` as `server.domain` option as well as update callback url to have `3005` testing port [core-default, core-scss]
	
## Bug Fixes
### Generators
- fix `config-grunt.js` and `config-test-grunt.js` cfgJson generation "+=" that should just be "=" on recursive call so now arrays of objects can be used in configs [core-default, core-scss]


# 1.1.6 (2014-09-01)
## Features
### Generators
- chore: update `package.json` dependencies: body-parser, express, qs, karma [core-default, core-scss]
- chore: update AngularJS to 1.3.0-rc.0 [core-default, core-scss]
	- add in `<base />` tag to `index.html` files
	- fix / update karma tests accordingly
		- update `jQuery` to `2.1.1` for karma tests
		- update `angular-mocks.js` to current for karma tests
		- add karma check (via user-agent `PhantomJS`) to NOT use HTML5 location in `app.js` to avoid `$location:nobase` error
		

# 1.1.5 (2014-08-26)
## Features
### Generators
- chore: update `package.json` dependencies: moment, mongodb, qs, grunt-dev-update, karma, protractor [core-default, core-scss]
- chore: update `bower.json` to Angular 1.3.0-beta.19 [core-default, core-scss]
- switch `bower.json` formatting/indent to spaces instead of tabs since running bower seems to update `bower.json` and lead to merge conflicts otherwise.. [core-default, core-scss]

## Bug Fixes
### Generators
- dont have `:/` for empty port in `config.js` frontend file (dirPaths sometimes were messed up if an empty port) [core-default, core-scss]


# 1.1.4 (2014-08-19)
## Bug Fixes
### Generators
- update google plusone/gapi script so it works again [core-default, core-scss]

## Features
### Generators
- return full `rawData` from frontend Google plus person/profile call (so can access name, gender, image, etc.). Also pull and save name and image by default (backend `Auth.socialLogin` now supports passing back a `user._imageUrl` key for saving images) [core-default, core-scss]
- chore: update `package.json` dependencies: body-parser, express, morgan, qs [core-default, core-scss]


# 1.1.3 (2014-08-11)
## Breaking Changes
### Generators
- refactor `User.update` (`user/update`) backend call to take a `user` object as a parameter rather than passing all the data directly back without being nested. This fixes a bug where `authority_keys` would get inserted into the user collection. [core-default, core-scss]

## Bug Fixes
### Generators
- call `appNav.setNav` from `HeaderCtrl` on every nav update so other controllers/modules can get the updated nav [core-default, core-scss]
- enforce uniqueness on email and phone number for `User.update` call (prevent updates if trying to update with an email and/or phone that's already in use) [core-default, core-scss]
- delete/remove `sess_id` in backend `User.update` call to prevent over-writting session id (back to a string)

## Features
### Generators
- add in frontend `error-msg` Angular service for abstracting out and customizing backend API call error messages. Add in unique error codes in backend `auth` api controller accordingly. [core-default, core-scss]
- chore: update `package.json` dependencies - body-parser, compression, express, method-override, qs, request, karma, karma-coverage [core-default, core-scss]
	- rename `coverage` back to `coverage-angular` for folder in `Gruntfile.js` since karma-coverage@0.2.6 seems to have fixed the 0.2.5 bug


# 1.1.2 (2014-08-02)
## Breaking Changes
### Generators
- support multiple sessions (i.e. same login/user on multiple devices and/or browsers) by changing `user.sess_id` in the database from a single string to an array of strings [core-default, core-scss]
	- backend still passes back just `sess_id` as a string for the CURRENT session even though the database now stores `user.sess_id` as an array. This keeps the frontend the same; just need to pass back an additional `sess_id` parameter on all logout calls to only kill THAT session.
	- IMPORTANT: for EACH server (i.e. production, dev/staging, local), run 'dbUpdate/sessId' by going to `http://[domain]:[port]/api/dbUpdate/help` and clicking "run interactive test" in the DbUpdate.sessId section to update your existing database to the new array format
	
## Features
### Generators
- chore: update `package.json` dependencies - moment, mongodb, grunt-contrib-less, karma-coverage, grunt-dev-update [core-default, core-scss]
- switch `package.json` to exact version matches rather than `~` semver matching (since at least one package did have breaking changes on a minor version update so this keeps all dependencies the same across all environments to avoid this issue) [core-default, core-scss]

## Bug Fixes
### Generators
- rename `coverage-angular` to `coverage` for folder in `Gruntfile.js` since karma-coverage@0.2.5 doesn't seem to actually use/obey the defined `dir` and/or `subdir` names in `karma.conf`.. [core-default, core-scss]
- fix Facebook (& Twitter) social login picture pulling by removing any GET URL params before trying to get the file extension [core-default, core-scss]


# 1.1.1 (2014-07-28)
## Breaking Changes
### Generators
- update frontend (bower) dependencies [core-default, core-scss]
	- angular 1.2.5 to 1.3.0-beta.17 - this SHOULD be largely backwards compatible but check the angular changelogs to make sure
		- update `index.html` layout/content animate accordingly
		
## Features
### Generators
- npm/node dependency updates [core-default, core-scss]
	- grunt-contrib-clean 0.5.x to 0.6.x


# 1.1.0 (2014-07-26)
## Breaking Changes
### Generators
- update backend (node) dependencies. These SHOULD be backwards compatible in most (all) cases unless your app utilizes any of these dependencies directly. [core-default, core-scss]
	- express 3.x to 4.x
		- added express connect packages accordingly: body-parser, compression, cookie-parser, errorhandler, method-override, morgan
	- socket.io 0.9.x to 1.0.x
	- async 0.2.x to 0.9.x
	- lodash 1.0.x to 2.4.x
	- moment 2.0.x to 2.7.x
	- q 0.9.x to 1.0.x
	- request 2.16.x to 2.39.x
	- dev dependencies
		- grunt-angular-templates 0.3.x to 0.5.x
		- grunt-contrib-concat 0.3.x to 0.5.x
		- grunt-contrib-copy 0.4.x to 0.5.x
		- grunt-contrib-cssmin 0.7.x to 0.10.x
		- grunt-contrib-jshint 0.7.x to 0.10.x
		- grunt-contrib-less 0.8.x to 0.11.x
		- grunt-contrib-uglify 0.2.x to 0.5.x
		- grunt-contrib-watch 0.5.x to 0.6.x
		- grunt-contrib-yuidoc 0.4.x to 0.5.x
		- grunt-forever-multi 0.4.x to 0.5.x
		- grunt-http 1.0.x to 1.4.x
		- grunt-karma 0.6.x to 0.8.x
		- istanbul 0.1.x to 0.3.x
		- karma 0.10.x to 0.12.x
		- karma-coverage 0.1.x to 0.2.x
		- protractor 0.16.x to 1.0.x
			- update (Gruntfile) to use selenium server 2.42.2
			- protractor spec tests language update: update `ptor` to `browser` and `protractor.By` to `by`
			
## Bug Fixes
### Generators
- get `grunt e2e` and `grunt test-frontend` to actually run/work standalone to match documentation [core-default, core-scss]

## Features
### Generators
- add in `devUpdate` grunt task to default task to output out of date node/npm packages/dependencies [core-default, core-scss]


# 1.0.10 (2014-06-24)
## Features
### Generators
- remove hammer.js as a dependency (switch to included ngTouch) to remove the "not found" error and reduce dependencies [core-default, core-scss]
- update node package.json dependencies
	- mongodb to 1.4.7
- add twitter authenticate url option so can auto login user (comment out the link part accordingly) [core-default, core-scss]
- add `vanityPortString` `config.json` optional key for forming publicPath if do not want to show/use a port (or want to use a different one) [core-default, core-scss]
- set the generated email (for social logins) to '@_fakeemail_.com' to easily differentiate it from real emails [core-default, core-scss]
- add Facebook and Twitter image profile pulling [core-default, core-scss]
	- set new `pull_pic` parameter to 0 to skip pulling images as the default is now to pull them and save images locally / on the server
- pull name from Twitter [core-default, core-scss]
- add Facebook and Twitter social sharing [core-default, core-scss]
	- update `config.json` to include `facebook.appSecret` and 'publish_actions' in `facebook.scope`
- support SSL CA certs in `config.json` [core-default, core-scss]

## Bug Fixes
### Generators
- update google plus one javascript library dependency to fix error


# 1.0.9 (2014-05-07)
## Features
### Internal
- fix versioning to match [semver](http://semver.org/) properly (1.0.9-3 is BEFORE 1.0.9, NOT after!)
	- updated from 1.0.8-2 to 1.0.9-3 appropriately

### Generators
- url: remove 'refresh=1' duplicate(s) [core-default, core-scss]
- nav: support icon buttons (3 total types now - text only, icon only, icon and text) [core-default, core-scss]
	- add login / logout header toggle based on logged in status
- add `node-controller` generator for easy creation of a new (CRUD) API backend route/controller  [core-default, core-scss, node-controller]
	- also have `basic` generator for just a scaffold of a backend route (to avoid copy-paste)
- add Twitter social login support (frontend and backend) and simplified button styles for better cross browser compatibility [core-default, core-scss]
- add backend auth userImport support for social login id matching - email or phone no longer required if have a social (facebook, google, twitter) id [core-default, core-scss]
- add `grunt test-backend-dev` task for quicker/dev running of backend tests [core-default, core-scss]
- update to `grunt-buildfiles` v0.3.6 to suppport `ifOpts` on `configPaths` as well as `moduleGroupsSkipPrefix` [core-default, core-scss]
- Gruntfile: replace `filePathsJsCustom` with `filePathsJsTest.karmaUnitCoverage` for karma test coverage. Also use new `testCov` variable instead of directly `cfgJson.test_coverage` so can modify coverage thresholds (i.e. per grunt task) if needed. [core-default, core-scss]
- remove `app.js` from karma coverage (since adding more routes can lower coverage below thresholds) [core-default, core-scss]
- add jQuery to (unit) TESTS only (for easier `.find()` selectors) [core-default, core-scss]
- switch backend API error to return full error object rather than just message (could be a semi-breaking change pending how you're currently using the error message returned) [core-default, core-scss]


## Breaking Changes
### Generators
- moved facebook auth to all server side [core-default, core-scss]
	- works with Chrome iOS (the FB JS SDK has a bug and does not)
	- removed angular-facebook-auth service and Facebook JS SDK - saved 160k in frontend loading size!
- rename `twitter-auth-callback` to `callback-twitter-auth` for consistency (make sure to update `config.json` and dev.twitter.com application settings accordingly) [core-default, core-scss]
- added https support [core-default, core-scss]
	- `config.json` changes
		- new `server.scheme` key for https
		- new `server.httpPort` for http port to run BOTH https & http port and redirect http to https
		- new `server.httpRedirectPort` that defaults to `server.port` but can be `false` for a no port redirect from http to https
		- socket.io now MUST listen on the same port (socketPort is default set to the same port as serverPort and should not be changed)
		- new `server.socketIOEnabled` boolean key since io.listen call moved to `server.js` and bundled with express app server / SSL credentials
	- new `optServerHttpPort` and `optTestServerHttpPort` keys in `yo-configs/default.json`
- changed class `a-div-color` to `a-block` [core-default, core-scss]
- updated to protractor v0.16.1 (from v0.10.0) [core-default, core-scss]
	- `selenium` installation directory (which has `chromedriver.exe` and `selenium-server-standalone-2.39.0.jar`) moved into `./node_modules/protractor` (instead of in the root folder)
	- to update:
		- delete `selenium` folder (from root folder)
		- run `./node_modules/protractor/bin/webdriver-manager update`
- updated Concrete CI to jackrabbitsgroup fork to fix a bug where after 50 runs the recent ones wouldn't show up anymore. NOTE: the most recent runs now show up on the BOTTOM rather than the top - eventually we may re-write the CI on top of mean-seed to allow for more robust frontend displays with Angular, etc. But for now it gets the job done.
	- to update:
		- uninstall concrete then reinstall with the new fork - follow updated instructions in [deploy.md](core-default-node/templates/docs/setup-running/deploy.md)


## Bug Fixes
### Generators
- fix auth social login to add/update other user fields (i.e. first_name, last_name, email) [core-default, core-scss]
- socialLogin now always returns user data and sess_id (even after initial create/login) [core-default, core-scss]
- nav: header: add `{{button.classes.button}}` to all buttons, including html only buttons [core-default, core-scss]
- fix google login by updating plusone js script [core-default, core-scss]
- fix facebook login by updating facebook.all.min.js script [core-default, core-scss]
- fix IE <=9 `ie.html` redirect to work no matter the (nested) path [core-default, core-scss]



# 1.0.8 (2013-12-28)
## Features
### Internal
- CHANGELOG: add 'Internal' and 'Generator' separation sub-headers
- update unit test templates [ng-route, ng-directive, ng-service]
- add roadmap.md doc with to do items

### Generators
- LOTS of frontend karma-unit tests added - minimum coverage threshold set to 85%
- add `version.txt` file with this generator version [core-default, core-scss]
- faster development (building, testing)- add grunt watch/dev tasks (with livereload for build): `grunt dev`, `grunt dev-test`, `grunt dev-karma-cov`, `grunt dev-build` for faster/auto building and testing during development [core-default, core-scss]
	- switch to keeping selenium server (and karma server) running with grunt and then just connecting to it rather than completely starting up and shutting down each time
	- karma unit tests (in dev mode) run without coverage to fix the bug that you can't see test details on the console
- fix node-coverage by adding grunt-exit task at end to ensure converage outputs and fails if below thresholds
- update Angular to 1.2.5 [core-default, core-scss]
- support multiple timeoutTrigs instances in http service so timeouts do not conflict with or clear each other if there are multiple http calls running at once [core-default, core-scss]
- add layout directive (move resize / DOM stuff from LayoutCtrl to here instead) [core-default, core-scss]
- package.json - move grunt, etc. to devDependencies [core-default, core-scss]
- add backend realtime service with socket.io for out of the box web socket / realtime [core-default, core-scss]
	- uncomment socket.io frontend index.html include
	- add `dev-test/socketio` frontend page with demo chat using socket.io
	- add `angular-socket-io` frontend bower dependency and corresponding `appSocket` service
- namespace / re-org frontend development / test pages (design, test) to `dev-test` folder [core-default, core-scss]


## Breaking Changes
### Generators
- refactor `appConfig` service to not have duplicate fields from `config.json` (so now just use `appConfig.cfgJson` directly instead) [core-default, core-scss]
- refactor `appAuth` service to support more robust authentication checking - no more `noLoginRequired` or `loginPage`; instead use `auth` object with `loggedIn` key [core-default, core-scss]



# 1.0.7 (2013-12-02)
## Features
### Generators
- support defaults for prompts even with yo-config *.json files so they do not all have to be specified **[_all]**
- buildfiles - allow E2E tests in any directory (not just test) and distinguish unit from e2e tests with new `testUnit` (for Karma Unit tests) and `testE2E` (for Protractor end-to-end tests) keys for what files to include for each test runner **[_all]**
	- update `ng-route`, `ng-directive` and `ng-service` generators accordingly to switch to "testUnit" key
- handle core updates (after initial generation) by running core generators on a SEPARATE 'yo-[core-name]' branch so changes can be MERGED in (with git) after they're updated - otherwise couldn't really update a seed once it was already generated since re-running the generator would just either overwrite or not change the changed files - neither would work. **[core-default, core-scss]**
	- add `optGitBranch` prompt option (defaults to 'master')
- modularize / separate `nav.js` to `nav.js` and `nav-config.js` where the config file has the custom / site-specific components and pages objects. **[core-default, core-scss]**

### Internal
- add `helper-core-merge` and `helper-core-commands-init` (sub)generators	
- add `common/commands` to keep running commands DRY
- add `common/prompts` for keeping prompt extending defaults/setting DRY


## Bug Fixes
### Generators
- force karma-coverage npm package to be 0.1.2 (new 0.1.3 doesn't install on Windows) [core-default, core-scss]


# 1.0.6 (2013-11-27)
## Breaking Changes
### Generators
- rename / merge 'svc' and 'dtv' module namespace to single 'app' namespace **[core-default, core-scss]**
	- namespacing is very important to avoid conflicts but there's no reason to take up 2 separate namespaces.
- rename socialAuth directive to socialAuthBtn to not conflict with socialAuth service **[core-default, core-scss]**
	- you should remove the now outdated `app/src/modules/directives/socialAuth` folder if still there
- added `opt` prefix to all prompts for namespacing - i.e. to avoid conflicts with Yeoman properties/methods (such as npmInstall) **[_all]**
- changed prompts from skipInstall to install (from negative to positive - defaults to NOT run now), specifically: **[core-default, core-scss]**
	- `skipNpmInstall` to `optNpmInstall`
	- `skipBowerInstall` to `optBowerInstall`
	- `skipGrunt` to `optGruntQ`
	- `skipSeleniumInstall` to `optSeleniumInstall`
	
## Bug Fixes
### Generators
- add `grunt-contrib-clean` for removing coverage folders first **[core-default, core-scss]**
	- this would sometimes cause the grunt task to fail if not cleaned up first

### Internal	
- add `bower update` to optBowerInstall helper command (could cause errors otherwise if outdated bower packages)

## Features
### Internal
- add `ng-directive` (sub)generator
- add `ng-service` (sub)generator
- add SCSS support to `ng-route` generator

- add in 'core-scss' (sub)generator for using SASS/SCSS instead of LESS
- change to core generators
	- rename 'main' generator to 'core-default'
- modularize core generators to use/call frontend and backend generators to allow for greater code re-use (since LESS and SCSS both use the SAME backend code, we should not duplicate it)
	- the check in each generator checks an array for `indexOf()` now so multiple this.optSubgenerators can be active at once.
	- add in 'helper' generators:
		- `helper-commands`
		- `helper-log-next-steps`

- add `common` folder for private functions / modules to use in/share across generators to keep things modularized and DRY
	- add `buildfiles` for updating buildfilesModules.json file and use this in ng-route generator
	- add `array` for array operations

- add grunt-jasmine-node-coverage-validation and grunt-contrib-clean for jasmine node tests and coverage

- add `docs` folder with generator documentation

- rename `coverage` folder to `coverage-angular` for frontend test coverage output


# 1.0.5 (2013-11-23)
## Features
- update ng-route subgenerator to support nested (sub)folders
- style: fix buildfilesModules.json to use strict proper json syntax (i.e. have spaces after colons) for less git diff when auto-generating an updated version
- add grunt for dev (linting)
- documentation update - modularize into folders
- move protractor test specs to buildfilesModules


# 1.0.4 (2013-11-20)
## Features
- add test coverage (via Istanbul) for jasmine-node and angular karma unit tests (not yet for Protractor frontend E2E tests) and auto fail Grunt if below coverage thresholds
- self-run test server (run.js) for tests so no longer need a 2nd window/process with `node run.js config=test` to run tests; just one step now: `grunt`
	- remove grunt-wait task / npm install
- switch to Mandrill for email as default, remove email-templates (more complicated)
- add Continuous Integration failed and worked ci.js script to auto rollback to last Git commit on failure and email the person who made the commit as well as (optionally) any other emails as set in config.json in ci.emails_failed array


# 1.0.3 (2013-11-13)
## Features
- added demo and links to generated code and Continuous Integration server
- documentation update
	- deploy.md added
	- cloning.md added


# 1.0.2
## Features
- add `docs` directory to `main` subgenerator

## Bug Fixes
- removed karma.conf.js copy command as this is a grunt generated file and does not exist originally


# 1.0.1

## Features
- support Angular 1.2.0 - switch all directives from `compile` to `template` function
- add `docs` folder with documentation / readme's


# 1.0.0

## Features

## Bug Fixes

## Breaking Changes