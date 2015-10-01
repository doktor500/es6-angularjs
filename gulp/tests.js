var _ = require('lodash');
var conf = require('./conf');
var gulp = require('gulp');
var path = require('path');
var Server = require('karma').Server;
var wiredep = require('wiredep');

function listFiles(specSrc) {
  var wiredepOptions = _.extend({}, conf.wiredep, { dependencies: true, devDependencies: true });
  var src = [
    path.join(conf.paths.src, '/**/*.html'),
    path.join(conf.paths.src, '/**/*.js'),
    path.join(conf.paths.tmp, '/serve/app/app.module.js')
  ];
  var paths = _.union(src, specSrc);
  return wiredep(wiredepOptions).js.concat(paths);
}

function runTests(singleRun, specSrc, done) {
  var config = {
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: singleRun,
    autoWatch: !singleRun,
    files: listFiles(specSrc)
  };
  new Server(config, done).start();
}

function unit() {
  return [path.join(conf.paths.spec.unit, '/**/*.js')];
}

function integration() {
  return [path.join(conf.paths.spec.integration, '/**/*.js')];
}

function all() {
  return _.union(unit(), integration());
}

gulp.task('test:all', ['test', 'test:e2e']);

gulp.task('test:nolint', ['config-local', 'scripts:nolint'], function(done) {
  runTests(true, all(), done);
});

gulp.task('test', ['config-local', 'test:lint', 'scripts'], function(done) {
  runTests(true, all(), done);
});

gulp.task('test:auto', ['config-local', 'test:lint', 'watch'], function(done) {
  runTests(false, all(), done);
});

gulp.task('test:unit', ['config-local', 'test:lint', 'scripts'], function(done) {
  runTests(true, unit(), done);
});

gulp.task('test:unit:auto', ['config-local', 'test:lint', 'watch'], function(done) {
  runTests(false, unit(), done);
});

gulp.task('test:integration', ['config-local', 'test:lint', 'scripts'], function(done) {
  runTests(true, integration(), done);
});

gulp.task('test:integration:dev', ['config-dev', 'test:lint', 'scripts'], function(done) {
  runTests(true, integration(), done);
});

gulp.task('test:integration:auto', ['config-local', 'test:lint', 'watch'], function(done) {
  runTests(false, integration(), done);
});

gulp.task('test:integration:dev:auto', ['config-dev', 'test:lint', 'scripts'], function(done) {
  runTests(false, integration(), done);
});
