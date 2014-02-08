# Module Generators (non-Core specific)

### ng-route
Scaffolds a new Angular page:

- creates a new folder in `src/modules/pages` (optionally in one or more sub-directories) with:
	- new-page.html
	- new-page.less (or new-page.scss)
	- NewPageCtrl.js
	- NewPageCtrl.spec.js
- updates `buildfilesModules.json` accordingly to include your new page
- updates `app.js` accordingly to include a new route to your page at URL `new-page`


### ng-directive
Scaffolds a new Angular directive:

- creates a new folder in `src/modules/directives` (optionally in one or more sub-directories) with:
	- new-directive.less (or new-directive.scss)
	- new-directive.js
	- new-directive.spec.js
- updates `buildfilesModules.json` accordingly to include your new directive
- [since it assumes the 'app' module namespace, there's no need to update `app.js`]


### ng-service
Scaffolds a new Angular service (factory or provider):

- creates a new folder in `src/modules/services` (optionally in one or more sub-directories) with:
	- new-service.js
	- new-service.spec.js
- updates `buildfilesModules.json` accordingly to include your new service
- [since it assumes the 'app' module namespace, there's no need to update `app.js`]


### node-controller
Scaffolds a new Node API route/controller:

- creates a new folder in `app/modules/controllers` with:
	- newController.api.js
	- newController.js
	- newController.test.js
- requires/adds in your new controller in `app/routes/api/index.js`
- requires/adds in your new controller in `app/test/all.spec.js` to include and run your new tests
- adds an html link to `app/routes/api/rpc/api-help.html` to add your api to the reference. (The links are somewhere around line 365.)
- [CRUD only] Add a new collection to `app/db_schema.json`
