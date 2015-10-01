var eslint = require('gulp-eslint');
var gulp = require('gulp');

function lint(src) {
  return gulp.src(src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
}

function testLint() {
  return lint(['spec/**/*.js']);
}

function srcLint() {
  return lint(['src/**/*.js']);
}

gulp.task('src:lint', srcLint);
gulp.task('test:lint', testLint);
gulp.task('all:lint', ['src:lint', 'test:lint']);
gulp.task('lint', ['src:lint']);
