var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var browserSync = require('browser-sync');
var gulpProtractor = require('gulp-protractor');

function runProtractor(done) {

  var params = process.argv;
  var args = params.length > 3 ? [params[3], params[4]] : [];

  function error(err) {
    throw err;
  }

  function end() {
    browserSync.exit();
    done();
  }

  gulp.src(path.join(conf.paths.spec.e2e, '/**/*.js'))
    .pipe(gulpProtractor.protractor({ configFile: 'protractor.conf.js', args: args }))
    .on('error', error)
    .on('end', end);
}

// Downloads the selenium webdriver
gulp.task('webdriver-update', gulpProtractor.webdriver_update);
gulp.task('webdriver-standalone', gulpProtractor.webdriver_standalone);
gulp.task('test:e2e', ['test:e2e:local']);
gulp.task('test:e2e:local', ['test:lint', 'serve:e2e:local', 'webdriver-update'], runProtractor);
gulp.task('test:e2e:dev', ['test:lint', 'serve:e2e:dev', 'webdriver-update'], runProtractor);
gulp.task('test:e2e:dist', ['test:lint', 'serve:e2e:dist', 'webdriver-update'], runProtractor);
