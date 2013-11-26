# Common actions

## Frontend / AngularJS
Roughly in order of most to least common:
- To add a new route/page: `yo mean-seed` and select `ng-route` then follow the prompts
	
- To add a common component / module (directive or service), do **one** of:
	1. Use the [angular-module generator](https://github.com/jackrabbitsgroup/generator-angular-module) to make a Bower component then include it.
		- These are SEPARATE, version controlled repos and only the final compiled *.min.js file (and potentially a *.less or _*.scss file as well for directives) is/are included here in this project. So all building and testing is done separately and then when the module is built, add it to `bower.json` and run `bower install`. This is the preferred method for all directives IF they're common enough to warrant other people wanting to use this module AND you're ready and willing to maintain it (since it will be out in the wild now, publicly available!).
		- Make sure to include / reference your new files (.js and optionally .less or .scss) in `buildfilesModules.json`
	2. OR create a new folder and add your new files to `modules/directives` or `modules/services`. Almost always namespace your module into the pre-existing "dtv" (for directives) or "svc" (for services) angular modules. This makes it so you shouldn't have to update `common/app.js` to add this new module.
		- If you're creating a new angular module, add it in to `common/js/app.js`. Though in general try to group modules together - i.e. in "dtv" or "svc" modules. Should virtually NEVER have a module with just one file in it; if that's the case just group it with something else or put in the "dtv" or "svc" modules.
		- Add the new module as a *FOLDER* and that folder should have:
			- The *actual file* (directive or service) itself.
			- A *"test"* folder or file with .spec.js test(s) for this directive/service.
			- A .less (or .scss) file(s) [for directives only - services should not touch the DOM].
		- Make sure to include / reference your new files (.js and optionally .less or .scss) in `buildfilesModules.json`
		
	
## TODO
- create yeoman subgenerators for all common actions
	- frontend/angular
		- new local angular module (directive / service)
		