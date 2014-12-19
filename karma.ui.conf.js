module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // frameworks to use
	frameworks: ['ng-scenario'],


    // list of files / patterns to load in the browser
    files: [
	    'lib/dxjs/src/dx.core.js',
	    'lib/dxjs/src/dx.*.js',
	    'test/js/scenario-interactions/keydown.js',
        'test/js/*.ui.spec.js'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['dots'],


    // web server port
    port: 9878,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


	proxies: {
	  '/': 'http://localhost:3000/'
	},

	urlRoot: '/_karma_/',

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000
  });
};
