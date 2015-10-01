var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

function start(event) {
  if (isOnlyChange(event)) {
    gulp.start('styles');
  } else {
    gulp.start('inject');
  }
}

function reload(event) {
  browserSync.reload(event.path);
}

gulp.task('watch', ['scripts:watch', 'inject'], function() {
  var rootSrc = [path.join(conf.paths.src, '/*.html'), 'bower.json'];
  var htmlSrc = path.join(conf.paths.src, '/app/**/*.html');
  var cssSrc = [path.join(conf.paths.src, '/app/**/*.css'), path.join(conf.paths.src, '/app/**/*.less')];
  gulp.watch(rootSrc, ['inject']);
  gulp.watch(cssSrc, start);
  gulp.watch(htmlSrc, reload);
});
