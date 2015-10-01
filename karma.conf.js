var istanbul = require('browserify-istanbul');

module.exports = function(config) {
  var configuration = {
    frameworks: ['jasmine', 'browserify', 'sinon', 'chai-as-promised', 'chai', 'sinon-chai'],
    reporters: ['progress', 'coverage'],
    browsers: ['PhantomJS'],
    plugins: [
      'karma-jasmine',
      'karma-browserify',
      'karma-sinon',
      'karma-chai',
      'karma-sinon-chai',
      'karma-chai-as-promised',
      'karma-coverage',
      'karma-sourcemap-loader',
      'karma-babel-preprocessor',
      'karma-phantomjs-launcher',
      'karma-ng-html2js-preprocessor'
    ],
    preprocessors: {
      'src/**/*.html': ['ng-html2js'],
      'src/**/*.js': ['babel', 'browserify', 'sourcemap', 'coverage'],
      'spec/unit/**/*.js': ['babel', 'browserify'],
      'spec/integration/**/*.js': ['babel', 'browserify']
    },
    babelPreprocessor: {
      options: {
        sourceMap: 'inline',
        blacklist: ['useStrict']
      },
      sourceFileName: function(file) {
        return file.originalPath;
      }
    },
    browserify: {
      debug: true,
      transform: [
        'babelify',
        'stringify',
        istanbul({
          ignore: ['**/spec/**', '**/backend/**', '**/config/**', '**/common/decorators/**', '**/src/app/app.module.js'],
          defaultIgnore: true
        })
      ]
    },
    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'todo-app-templates'
    },
    coverageReporter: {
      instrumenters: { isparta: require('isparta') },
      instrumenter: { 'src/**/*.js': 'isparta' },
      reporters: [{ type: 'html', dir: 'coverage/' }]
    }
  };

  config.set(configuration);
};
