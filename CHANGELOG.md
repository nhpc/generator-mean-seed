Version numbers correspond to `package.json` version

# 1.0.5
## Features
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