# generator-mean-seed

[Yeoman](http://yeoman.io) Generator for MEAN-seed - MongoDB, Express.js, AngularJS, Node.js + Yeoman (Grunt, Bower, Yo) + Jasmine, Karma, Protractor (for automated testing)


## Demo & Tests
- [MEAN-seed Website/App after Yeoman build](http://198.199.118.44:3000/)
- [Continuous Integration / Tests](http://198.199.118.44:3010/)
	- This automatically deploys and tests the yeoman generated mean-seed website on each Github push (from local development)
- [Github Repo with Generated Code](https://github.com/jackrabbitsgroup/mean-seed-gen)
	
	
	
## Getting Started

NOTE: This assumes you already have the necessary programs (i.e. Git, Node.js, MongoDB, PhantomJS) installed; see [here for Mac](core-default-node/templates/docs/setup-running/server-mac.md) or [here for Windows](core-default-node/templates/docs/setup-running/server-windows.md)or [here for Linux](core-default-node/templates/docs/setup-running/server-linux.md)

Install Yeoman Yo, Bower, Grunt and other global node modules we'll need, if you don't have them already:
```
$ npm install -g yo bower grunt-cli jasmine-node karma yuidocjs forever less
```

Install this generator:
```
$ npm install -g generator-mean-seed
```

Naviagate to a (new) directory where you want to create your AngularJS and node.js app and initiate the generator then follow the prompts:
```
$ yo mean-seed
```

- NOTE: you can also (first) create a `yo-configs` folder with .json files for the prompts so you don't have to type them all out. This is useful for storing multiple different configurations for different projects - just tell the generator which config to use and you're all set! See the [yo_configs folder](yo-configs) for examples.
- NOTE: if you get an EACCESS / permission denied error during the npm install, find the folder that had permissions issues (from the log output) and run `sudo chown -R $USER [path to problematic folder]`.
	- http://foohack.com/2010/08/intro-to-npm/#what_no_sudo

[See here](core-default-node/templates/_README.md) for more/full info and steps.

### Next Steps
- See the generated README.md file in your new mean-seed app!



## (Sub)Generators List

- core-default
- core-scss
- ng-route

See the [docs/generators](docs/generators) folder for more info.

More generators coming - feel free to create one and submit a pull request!



## Documentation / More Info
See the [generated README.md](core-default-node/templates/_README.md) file and the `docs` folder for all documentation. Each (sub)folder typically has an `overview.md` file - start there. Some key docs (roughly in order of priority) listed below:

- [overview.md](core-default-node/templates/docs/overview.md)
- [setup-running folder](core-default-node/templates/docs/setup-running/)
	- [setup-running/overview.md](core-default-node/templates/docs/setup-running/overview.md)
- [tools-dependencies folder](core-default-node/templates/docs/tools-dependencies/)
- [files folder](core-default-node/templates/docs/files/)
- [testing-automation folder](core-default-node/templates/docs/testing-automation/)
- [frontend-angular/common-actions.md](core-default-node/templates/docs/frontend-angular/common-actions.md)
- [backend-node/common-actions.md](core-default-node/templates/docs/backend-node/common-actions.md)


## Miscellaneous

### What is Yeoman?

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


### License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)



## Contributing
- while you can fork on Github, we're actually trying a new approach of leveraging Yeoman for different 'core' builds to avoid all the forks. The reason for 'forking' a project is to change it and add functionality that conflicts with or would add too much code bloat to the original repository. However, with Yeoman, we can add EVERYTHING into this ONE project and by using generators, the end user/developer can take ONLY what (s)he wants. So there's no code bloat or worry of this becoming a "kitchen sink" seed with too many features. That's the beauty of Yeoman! So, to contribute, build another subgenerator - either a 'core' generator or a 'module' generator. All the 'core' generators essentially become like the typical 'forks' - a user will decide what core (s)he wants to use and THEN what modules to include with that core.
	- core: see the `core-default` folder/generator for an example
	- module: see the `ng-route` folder/generator for an example
- NOTE: this is still a new idea/approach to contributing and is a work in progress - suggestions welcome!



## TODO
Roughly in order of priority:
- modularize the non-modularized files so the configurations (all the custom code) can be edited separately from the functions and generic code.
	- make a 'core' and keep that separate from the 'modules' and custom code so the core can be updated and re-pulled into existing projects with minimal merge conflicts.
	- Use Yeoman builds (INSTEAD of Github forks) for all the different 'core' builds and then rename this one as just one (of many) core builds.
		- this leverages the incredible power of Yeoman and removes the need for many Github forks and pull requests - ALL code can be put into the Yeomen generator WITHOUT worrying about code bloat since ONLY the parts the end user wants will be built! That way, we don't have to worry about many different versions / forks and things getting out of date - each 'core' will be similar to a 'fork' but all cores can leverage the SAME modules and common parts - at least in theory!
		- potential additional Yeoman builds:
			- 'node-mongoose' for a Mongoose Yeoman build for people who want to use Mongoose instead of mongo-db-native as the node-mongo interface
		

- Shift all Facebook calls to backend? Is this possible? So we can then remove the HUGE 170kb minified Facebook Javascript SDK that's just used for login..
