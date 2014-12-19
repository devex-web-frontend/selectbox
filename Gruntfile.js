module.exports = function(grunt) {
	'use strict';

	var isDevelopmentRun = !grunt.option('prod');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			files: ['src/**/*.js']
		},
		clean: {
			install: [grunt.file.readJSON('.bowerrc').directory],
			css: ['test/css/']
		},
		connect: {
			testserver: {
				options: {
					port: 3000,
					base: '.'
				}
			}
		},
		stylus: {
			site: {
				files: [
					{
						src: ['src/**/*.styl','test/**/*.styl'],
						dest: 'test/css/',
						ext: '.css',
						expand: true,
						flatten: true
					}
				]
			}
		},
		karma: {
			options: {
				singleRun: !isDevelopmentRun,
				autoWatch: isDevelopmentRun
			},
			ui: {
				configFile: 'karma.ui.conf.js',
				browsers: ['Chrome']
			},
			unit: {
				configFile: 'karma.unit.conf.js',
				browsers: ['PhantomJS']
			}
		},

		shell: {
			install: {
				command: 'node node_modules/bower/bin/bower install'
			}
		},

		jscs: {
			options: {
				config: '.jscsrc'
			},
			files: ['src/**/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-interactive-shell');
	grunt.loadNpmTasks('grunt-jscs-checker');

	grunt.registerTask('install', ['clean:install', 'shell:install']);
	grunt.registerTask('css', ['clean:css', 'stylus']);

	grunt.registerTask('check_style', ['jscs', 'jshint']);
	grunt.registerTask('test_unit', ['karma:unit']);
	grunt.registerTask('test_ui', ['connect:testserver', 'karma:ui']);
	grunt.registerTask('test', ['check_style', 'test_unit', 'test_ui']);
	grunt.registerTask('build', ['css','install', 'test']);
	grunt.registerTask('default', ['build']);
};