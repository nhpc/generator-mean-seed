Version numbers correspond to `package.json` version

# 1.0.7 (WIP)
## Features
- run core generators on a SEPARATE branch so changes can be MERGED in (with git) after they're updated - otherwise couldn't really update a seed once it was already generated since re-running the generator would just either overwrite or not change the changed files - neither would work.
	- add `helper-core-merge` subgenerator
	- add `optGitBranch` prompt option (defaults to 'master')
- add `common/prompts` for keeping prompt extending defaults/setting DRY
- modularize / separate `nav.js` to `nav.js` and `nav-config.js` where the config file has the custom / site-specific components and pages objects.


# 1.0.6 (2013-11-27)
## Breaking Changes
- rename / merge 'svc' and 'dtv' module namespace to single 'app' namespace
	- namespacing is very important to avoid conflicts but there's no reason to take up 2 separate namespaces.
- rename socialAuth directive to socialAuthBtn to not conflict with socialAuth service
	- you should remove the now outdated `app/src/modules/directives/socialAuth` folder if still there
- added `opt` prefix to all prompts for namespacing - i.e. to avoid conflicts with Yeoman properties/methods (such as npmInstall)
- changed prompts from skipInstall to install (from negative to positive - defaults to NOT run now), specifically:
	- `skipNpmInstall` to `optNpmInstall`
	- `skipBowerInstall` to `optBowerInstall`
	- `skipGrunt` to `optGruntQ`
	- `skipSeleniumInstall` to `optSeleniumInstall`
	
## Bug Fixes
- add `grunt-contrib-clean` for removing coverage folders first
	- this would sometimes cause the grunt task to fail if not cleaned up first
- add `bower update` to optBowerInstall helper command (could cause errors otherwise if outdated bower packages)
	
## Features
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