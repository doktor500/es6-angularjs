var _ = require('lodash');
var conf = require('./conf');
var gulp = require('gulp');
var gulpInject = require('gulp-inject');
var path = require('path');
var wiredep = require('wiredep').stream;

function inject(args) {
  var cssSrc = [
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ];

  var jsSrc = [
    path.join(conf.paths.tmp, '/serve/app/**/*.module.js'),
    path.join(conf.paths.tmp, '/serve/app/**/*.js'),
    path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/app/**/*.mock.js')
  ];

  var tmpSrc = [conf.paths.src, path.join(conf.paths.tmp, '/serve')];
  var injectStyles = gulp.src(cssSrc, { read: false });
  var injectScripts = gulp.src(jsSrc, { read: false });
  var injectOptions = { ignorePath: tmpSrc, addRootSlash: false };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe(gulpInject(injectStyles, injectOptions))
    .pipe(gulpInject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, args, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
}

function injectDefault() {
  return inject({ devDependencies: true });
}

function injectDist() {
  return inject({ devDependencies: false });
}

gulp.task('inject', ['scripts', 'styles'], injectDefault);
gulp.task('inject:dist', ['scripts', 'styles:dist'], injectDist);
