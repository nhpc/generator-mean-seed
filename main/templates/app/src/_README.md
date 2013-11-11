# <%= appName %> Frontend (AngularJS MVC Framework)

Built using Mean-Seed: https://github.com/jackrabbitsgroup/generator-mean-seed

## Common components and conventions to be aware of and use
- LESS / styles
	- classes: Any of the LESS files in the main `less` folder should be used within HTML files. These are pre-defined common classes. BEFORE you define any styles, make sure to check these first and use them. If a style class doesn't already exist, in general create it here (unless it's super specific and will never be used again). Currently we follow this "Twitter Bootstrap style" where most pages do NOT have their own stylesheet but rather leverage pre-existing common components (directives which have their own stylesheets and/or common classes) rather than using lots of variables and mixins.
	- mixins & variables (anything in `less/mixins` and `less/variables`)
- javascript: directives & services
	- anything in the `lib` folder (3rd party dependencies - i.e. `moment.js`)
	- `modules/directives` and `modules/services`
	
## Best practices
- MODULARIZE!!
- try to make everything a directive (if it interacts with the DOM) or service (if it does NOT interact with the DOM)
	- directives should NOT have any backend API calls or HTTP requests in them and in general should NOT modify data (use a service for that). They should simply take data and display it. They can call services to manipulate data.
	- services are where ALL data manipulation and formatting should happen
		- do NOT alter data in contollers - call a service function instead (services should typically exist for each model/data type and should have CRUD operation functions. With regards to data, controllers should ideally only have an equal assignment sign `=` for returns from function calls (to services).
		- services CAN have backend API calls if the service is a model. Model services are common and the model typically will have a `read` function that will load from one of three places (in order):
			- javascript/memory
			- localStorage
			- backend (via API/AJAX call)
				- if necessary, services may have 'transformFromBackend' and 'transformForBackend' functions that convert/format data between frontend (which may need additional display data/fields/values) and backend.
- keep controllers as slim as possible - they should ONLY handle wiring - just a bunch of function calls between different things (setting up directives, making API/AJAX calls, making service function calls)
	
## A note on how to structure common/reusable LESS/style components
There are TWO ways to pre-define styles. There are pros and cons to each and in general the "Classes" approach is better at first and for simpler things but the "Mixins" approach is better where higher customization is needed. But the most important thing is to pick one approach and stick to it so all the HTML files are similarly structured and consistent.
1. Mixins: define styles within a LESS mixin then define a class that uses that mixin.
	1. Pros:
		1. All changes are kept within LESS/CSS files (no need to touch HTML files to change styles)
	2. Cons:
		1. Each HTML element needs it's own UNIQUELY named (i.e. namespaced) class. This leads to very verbose HTML files with long class names
		2. Reading an HTML file requires also having the LESS file open to be able to understand how things are styled (the HTML file is not self-explanatory and not very useful by itself)
2. Classes: define common classes with LESS files then reference those common classes within the HTML files
	1. Pros:
		1. Once the classes are learned, reading HTML files become self-explanatory since these common classes will show up often.
		2. Many new pages/files will require little to no new classes or styles defined (some pages won't even have a new LESS file at all).
		3. Ensures a themed and consistent look throughout the site due to the shared classes.
	2. Cons:
		1. Have to be careful with these "global classes" to ensure no conflicts with namespacing
		2. Can make it difficult to customize things away from these global classes. Can require leveraging CSS selector precedence rules (which is messy and bad for performance) to overwrite the common styles. Without careful arhitecting from the start, it can become difficult to extend the common classes.
		3. Can lead to having many (common) classes on an element to achieve the desired look and may still need a custom class and styles - at this point it's easier to just use ONE custom class and mixins to achieve the desired look.
	3. Best practices:
		1. Keep common classes simple and modularized so it's easy to extend them.
		2. Do NOT apply styles to basic core elements (i.e. <li> or <form> elements) or with nested CSS selectors (i.e. `form input` or `form >div`) since this makes it very hard to over-ride these and can lead to unexpected behavior when you want a NON-STYLED div that accidentally is styled from these descendent and nested style rules that you weren't aware of when you wrote the HTML. It should NEVER happen that styles are applied without the developer's knowledge - every "global style" should require adding a class to the element. NOTE: Twitter Bootstrap does this and hence this rule - it's super annoying to try to over-ride Twitter Bootstrap and very time consuming and difficult to debug weird stylings that are inherited without your knowledge.. And then once you diagnose the problem it requires lots of descendent or nested selectors to over-write those default global styles which leads to bad code and bad performance. There should be virtually NO descendent or nested selectors - just pure, singular classes - except in VERY rare circumstances. This requires typing more classes in the HTML markup but pays off in the long run.

## Frameworks, MVC (Model View Controller) and Flow
AngularJS is an MVC (Model View Controller) Javscript frontend framework. 'Views' are the HTML template partial files, the 'controllers' are the javascript controllers and 'models' take a bit broader definition as both are the $scope variable data bindings (used in the HTML templates) and as javascript data stored (i.e. in memory or localStorage - typically copies of backend AJAX retrieved data). Angular directives (modularized components holding the 'view', 'controller' and 'model' for this component) and services (data - mostly 'models') are the most widely used components.

The typical steps (or flow) of the frontend architecture is:
1. index.html --> router: `index.html` is the main entry point for ALL pages and does the initial setup (loading all resources). Via Angular's `ng-view` directive, this goes to `common/js/app.js` to route to the appropriate page
2. router + auth --> load specific page (partial): `common/js/app.js` is the router to go the correct page (as specified in the URL). This also first checks authentication (i.e. see if the user is logged in or not) and redirects accordingly. Any common, pre-page-load action happens via functions called here. Currently it's just `modules/services/auth`. Upon successfully authentication, the specific page is called/loaded.
3. page partial --> page controller + directives: The correct page partial is loaded and that HTML partial (almost always) references the relevant javascript controller (which holds the $scope and other javascript data used for rendering the page and stuffing the HTML template). Any Angular directives are also called via the HTML partial.
4. page controller --> services: controllers dependency inject any Angular services they need and use them accordingly.
5. current page --> new page: Via <a ng-href> HTML links or direct $location.url redirects via the javascript controller, user actions lead to changing to new pages (go back to step 2 with the router).


## Common / Non-modularized / Site-specific files
You'll likely have to edit these files at some point.
NOTE: this does NOT include files in the `common` directory, which obviously are also site-specific.
- `modules/services/nav/nav.js`

### `common` directory files most likely/often to be updated
- js
	- app.js
- less [every file in the this main folder plus the following sub-folders/files below]
	- variables
		- colors.less
- config
	- buildfilesModules.json
	- buildfilesModuleGroups.json
- modules
	-services
		nav/nav.js

## Frontend file structure

### Summary

Based (almost exactly) off AngularUI. It does NOT follow the Angular-Seed folder structure.
Files are organized in a modular way. Each "component" is a folder containing all the necessary javascript, css/less, html/template/partial, test and any other resources (images, etc.) necessary for that component. Anything that's a shared resource that can't be fully modularized goes in the `common` folder.

### File / folder structure

- ie.html	HTML page for Internet Explorer not supported page/message/redirect
- ie.css	Styles for Internet Explorer not supported page
- index.html	Main entry point for ALL pages (Angular is a Single Page App architecture). This bootstraps the app (loads Angular and all other css and javascript resources) and sets up the main layouts (header, content - `ng-view`, footer).
- index*.html		Grunt template files and generated files for the main index.html entry point to the entire Angular app. ONLY edit `-grunt` suffix files as the rest are GENERATED by Grunt.
- build All grunt generated production (concatenated, minified) files. INCLUDES css and any other production generated files (again mimics AngularUI)
	- temp Temporary build files (could potentially auto delete them after the build process but you can just ignore these)
- common All common files - just like a module but for shared / global stuff
	- font		Holds all font files (including font-icons)
	- img	Image files
	- js
		- app.js Main/entry AngularJS file that loads modules and declares routes
	- less	LESS (CSS pre-processor) files. This is where all the COMMON/global classes are declared. Read through and memorize these as you'll use them often!
		- mixins		Custom defined LESS mixins that along with LessHat mixins can/should be used for writing LESS styles for other (modularized) pages/views/directives.
		- variables		Custom defined LESS variables that can/should be used for writing LESS styles for other (modularized) pages/views/directives.
			- colors.less		Holds the themes/colors for this app. You should almost always be using a pre-defined color variable; do NOT use a hardcoded color code (i.e. `#ff00aa` or `rgb(100,100,150)` or `blue`) if you can avoid it. Keep things referencing common/global variables and mixins so it's easy to change later (this applies to things outside of just colors as well).
- config
	- buildfilesModules.json	Holds all the javascript and css final files for use in the build process (i.e. to generate final files in the `build` folder). You will change this file often (each time you create a new page/directive/service).
	- buildfilesModuleGroups.json	Pairs with buildfilesModules.json
	- karma.conf-grunt.js	Holds Karma testing configuration. This files generates karma.conf.js
	- karma.conf.js	NEVER edit this file directly - it's auto generated by grunt
- lib ALL non-bower 3rd party code and dependencies - including css, images, etc. NO 3rd party code should be anywhere but in this folder.
- modules
	- directives
	- services		Angular services (models/data and libraries of common functions). The important ones are listed below (NOT an exhaustive list).
		- auth		Authentication (the `app.js` router calls this function before each page load to see if the user is logged in or not).
		- http		$http wrapper for AJAX (backend api) requests.
		- nav		Sets the navigation (header and footer) for each page.
		- storage	Persistent, client side (local)storage.
		- config-grunt.js		Template file for generating config.js. This holds common config files used througout the app.
		- config.js		Do NOT edit this file - it's generated by grunt. Edit config-grunt.js instead.
		- models
			- user
				- UserModel.js		Holds the information/data on the currently logged in user.
	- pages	Holds Angular javascript controllers and tests, html partials, less/css styles all in one folder as a modular component. The important/common folders are listed/detailed below (not an exhaustive list).
		- layout		The main layout file for the entire app (referenced in `index.html`). This is a parent controller to ALL page controllers so all page controllers inherit from LayoutCtrl. Thus it defines some common variables on the $scope such as `$scope.appPath` that can be used everywhere else. It also does some basic layout and authentication/login handling.
		- header
		- footer
		- home
		- login
		- signup
		- logout
		- passwordReset
		- [page_name]
			- [page_name].less
			- [page_name].html
			- [Page_name]Ctrl.js
			- [Page_name]Ctrl.spec.js
- test	Some more Karma / Protractor setup / config



## Main files
- index-grunt.html This builds index.html. Index.html is the main, and only, entry file to the AngularJS application. It includes all the resources (css, script files), sets up the divs for the header, content, & footer, and has the ng-view div that is where all the content goes.

- index-prod-grunt.html and other such files are specific index files for other things like the production build, phonegap app, etc.

- ie.html & ie.css are Internet Explorer redirects for older versions. These just display a page that says "IE is not supported, try another browser" with links to other browsers.

## Other key files
- common/js/app.js is the Angular router and module loader. Each time a new module (directive or service) is created, it needs to be added/defined at the top of this file. And similarly, to create a new page / route, define it here.

- common/less fold has all the LESS CSS files.



## General Workflow
** Make sure to run grunt and ensure all code is LINTED, TESTED and DOCUMENTED before submitting ANY code!! **

- GIT:
	- Make some changes.
	- Add them with `git add -A`.
	- Commit them with `git commit -m '[descriptive message here]'`.
	- Use `git pull` to sync your code with changes other coders may have made.
	- Use `git push` to push your changes to re-sync the central repo.
- Building (grunt)
	- Everytime you pull code, run `grunt` from the command line. Do this from the root folder of the site (the folder that has `Gruntfile.js` in it).
	- If `package.json` changed, first run `npm install` (again run from root folder) THEN run `grunt`.
	
- Best practices with GIT
	- commit, pull, and push often. At least once a day, often more. Each time you make changes and have a stable, bug free, complete version of the code, push/sync it. This will reduce frequeny of manual merge conflicts.


## TODO
- modularize the non-modularized files so the configurations (all the custom code) can edited separately from the functions and generic code.