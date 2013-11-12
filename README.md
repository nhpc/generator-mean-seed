# generator-mean-seed

[Yeoman](http://yeoman.io) Generator for [MEAN-seed](https://github.com/jackrabbitsgroup/mean-seed) - MongoDB, Express.js, AngularJS, Node.js + Yeoman (Grunt, Bower, Yo) + Jasmine, Karma, Protractor


## Getting Started

Install Yeoman Yo, Bower, & Grunt if you haven't already:
```
$ npm install -g yo bower grunt-cli
```

Install this generator:
```
$ npm install -g generator-mean-seed
```

Naviagate to a (new) directory where you want to create your AngularJS and node.js app and initiate the generator then follow the prompts:
```
$ yo mean-seed
```
NOTE: you can also (first) create a `yo-configs` folder with .json files for the prompts so you don't have to type them all out. This is useful for storing multiple different configurations for different projects - just tell the generator which config to use and you're all set! See the [yo_configs folder](https://github.com/jackrabbitsgroup/generator-mean-seed/tree/master/yo-configs) for examples.

[See here](https://github.com/jackrabbitsgroup/generator-mean-seed/blob/master/main/templates/_README.md) for more/full info and steps.

### Next Steps
- See the generated README.md file in your new mean-seed app!



## Contributing
- while you can fork on Github, we're actually trying a new approach of leveraging Yeoman for different 'core' builds to avoid all the forks. The reason for 'forking' a project is to change it and add functionality that conflicts with or would add too much code bloat to the original repository. However, with Yeoman, we can add EVERYTHING into this ONE project and by using generators, the end user/developer can take ONLY what (s)he wants. So there's no code bloat or worry of this becoming a "kitchen sink" seed with too many features. That's the beauty of Yeoman! So, to contribute, build another subgenerator - either a 'core' generator or a 'module' generator. All the 'core' generators essentially become like the typical 'forks' - a user will decide what core (s)he wants to use and THEN what modules to include with that core.
	- core: see the `main` folder/generator for an example
	- module: see the `ng-route` folder/generator for an example
- NOTE: this is still a new idea/approach to contributing and is a work in progress - suggestions welcome!



## More Info

### What is Yeoman?

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


### License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)