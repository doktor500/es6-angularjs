var conf = require('./conf');
var gulp = require('gulp');
var path = require('path');
var webpack = require('./webpack');

function process(watch, callback) {
  return gulp.src(path.join(conf.paths.src, '/app/app.module.js'))
    .pipe(webpack(watch, callback))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
}

gulp.task('scripts', function() {
  return process({ watch: false, lint: true });
});

gulp.task('scripts:nolint', function() {
  return process({ watch: false, lint: false });
});

gulp.task('scripts:watch', ['scripts'], function(callback) {
  return process({ watch: true, lint: true }, callback);
});
