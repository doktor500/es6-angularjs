var conf = require('./conf');
var browserSync = require('browser-sync');
var gulpUtil = require('gulp-util');
var webpackStream = require('webpack-stream');

function process(args, callback) {
  var webpackOptions = {
    watch: args.watch,
    module: {
      preLoaders: args.lint ? [{ test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader'}] : [],
      loaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
    },
    eslint: {
      failOnWarning: true,
      failOnError: true
    },
    output: { filename: 'app.module.js' }
  };

  if (args.watch) {
    webpackOptions.devtool = 'inline-source-map';
  }

  var webpackChangeHandler = function(err, stats) {
    if (err) {
      conf.errorHandler('Webpack')(err);
    }
    gulpUtil.log(stats.toString({
      colors: gulpUtil.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false
    }));
    browserSync.reload();
    if (args.watch) {
      args.watch = false;
      callback();
    }
  };

  return webpackStream(webpackOptions, null, webpackChangeHandler);
}

module.exports = process;
