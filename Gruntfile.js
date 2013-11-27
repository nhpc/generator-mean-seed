/**
Lint files
*/

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			options:{
				// force: true
				//globalstrict: true
				//sub:true,
				node: true
			},
			// all: ['Gruntfile.js', 'core-default/**/*.js', 'ng-route/**/*.js']
			all: ['Gruntfile.js',
				'core-default/index.js', 'core-default-node/index.js', 'core-default-angular/index.js',
				'core-scss/index.js', 'core-scss-angular/index.js',
				'ng-route/index.js',
				'ng-directive/index.js',
				'helper-commands/index.js',
				'helper-log-next-steps/index.js'
			]
		},
		clean: {
			dev: [
				'coverage-node'
			]
		},
		jasmine_node: {
			specNameMatcher: "*.spec.js", // load only specs containing specNameMatcher
			projectRoot: "./",
			specFolders: ['common'],
			requirejs: false,
			forceExit: false,		//need this to be false otherwise it just exits after this task
			
			coverage: {
				savePath: 'coverage-node',
				excludes: [
					// '**/modules/services/**',		//not sure what the relative path is from but using 'app/modules/services' does NOT work - only '**/modules/services/**' and 'modules/services/**' work..
					// '**.test.js'
				],
				// matchall: true,
				options : {
					failTask: false,
					branches : 60,
					functions: 60,
					statements: 60,
					lines: 60
				}
			},
			options: {
				forceExit: false,		//need this to be false otherwise it just exits after this task
				match: '.',
				matchall: false,
				// matchall: true,
				extensions: 'js',
				specNameMatcher: 'spec',
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-jasmine-node-coverage-validation');

	// Default task(s).
	grunt.registerTask('default', ['clean', 'jshint', 'jasmine_node']);
};