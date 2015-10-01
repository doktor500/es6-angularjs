var browserSync = require('browser-sync');
var conf = require('./conf');
var gulp = require('gulp');
var path = require('path');
var wiredep = require('wiredep');
var $ = require('gulp-load-plugins')();
var _ = require('lodash');

function styles(args) {
  function transform(filePath) {
    filePath = filePath.replace(conf.paths.src + '/app/', '');
    return '@import "' + filePath + '";';
  }

  var lessOptions = {
    options: ['bower_components', path.join(conf.paths.src, '/app')]
  };

  var lessSrc = [
    path.join(conf.paths.src, '/app/**/*.less'),
    path.join('!' + conf.paths.src, '/app/index.less')
  ];

  var injectFiles = gulp.src(lessSrc, { read: false });

  var injectOptions = {
    transform: transform,
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src([path.join(conf.paths.src, '/app/index.less')])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep.stream(_.extend({}, args, conf.wiredep)))
    .pipe($.sourcemaps.init())
    .pipe($.less(lessOptions)).on('error', conf.errorHandler('Less'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')))
    .pipe(browserSync.reload({ stream: true}));
}

function stylesDefault() {
  return styles({ devDependencies: true });
}

function stylesDist() {
  return styles({ devDependencies: false });
}

gulp.task('styles', stylesDefault);
gulp.task('styles:dist', stylesDist);
