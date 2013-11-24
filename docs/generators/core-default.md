# core-default Generator

Scaffolds out an app from scratch using the following core technologies on top of MEAN + Git + Yeoman (Grunt, Bower, Yo) + NPM:

- MongoDB framework: mongo-db-native
- Node routing: RPC
- CSS Pre-process: LESS
- Testing
	- Jasmine (using node-jasmine) for backend tests
	- Protractor / JSTestDriver / Selenium for frontend E2E tests
		- Chromedriver
		- SauceLabs optional
	- Karma + Jasmine for frontend Unit tests
		- PhantomJS
	- Istanbul for Test Coverage
- Continuous Integration: Concrete
- Documentation: YUIDoc
- Node Running: Forever

See `package.json` and `bower.json` for a full list of dependencies (i.e. crypto, moment, lodash, q, mandrill) but the core technologies are listed above.


## Generators
[none]