# Roadmap / To Do

To do list, roughly in prioritized order

- buildfiles: add a "skip" prefix (i.e. '_' or 'x_') for "commenting out" lines (since it's JSON so you can't just actually comment out)

- make a "built with mean-seed" readme / demo page (i.e. resembl and other projects)

- Fixes / testing
	- update ng-animate for 1.2.x since it doesn't work the way it used to?
		- i.e. index-* files for ng-view animation - is it working?
	- test / fix on IE 10 & 11
	- test / fix on Android 2.3 (i.e. no gradients - facebook button, etc.)

- add testing / CI for generator itself - commands to run the yo commands and then run tests?
	- test core-scss
	
- Add Generators
	- common actions
		- node api route
		- node local service
	- 'node-mongoose' for a Mongoose Yeoman build for people who want to use Mongoose instead of mongo-db-native as the node-mongo interface

- modularize the non-modularized files so the configurations (all the custom code) can be edited separately from the functions and generic code (mostly backend code left to do - see `site specific` comments in files)

- Add Tests / Coverage
	- backend (node) test coverage to 80%
	- finish / add e2e tests (test login, password-reset, anything else?)
	- frontend (angular) test coverage to 95%
	- backend (node) test coverage to 95%

- Shift all Facebook calls to backend? Is this possible? So we can then remove the HUGE 170kb minified Facebook Javascript SDK that's just used for login..

- change directory names to be hyphen instead of camelCase (i.e. src/modules/pages) - keep things consistent? / same as generators?
	
- give option in generator to specify angular module (i.e. don't force 'app'; instead allow 'svc', 'dtv' or whatever they want it to be called)?
	- similarly allow change from 'myApp' as angular app (though this will be more difficult and require lots of changes - in .spec files, etc.)

- update to 2 spaces instead of tabs for indentation (since bower.json, etc. force/use it anyway?)
	- but then have to update all generator templates to use appropriate amount of spaces everywhere too..

- add some modules?
	- frontend
		- datetime service? (one function momentjs doesn't have)

		
### Known 3rd Party Issues (waiting for fixes..)

- Bower update/install issues (will error and break the build..)
	- sometimes running `bower cache clean` will work
	- rolling back to bower 1.2.6 helps but doesn't seem to work 100% of the time?
		- https://github.com/angular/angular.js/issues/5502
		- https://github.com/bower/bower/issues/933
			- .bowerrc tmp & storage keys may fix?

- protractor phantom js hack? - https://github.com/angular/protractor/issues/85#issuecomment-26846255
	