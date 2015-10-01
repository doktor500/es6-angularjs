var path = require('path');
var gulp = require('gulp');
var gulpNgConfig = require('gulp-ng-config');
var conf = require('./conf');
var closure = require('gulp-closure-compiler-service');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

function partials() {
  var files = [
    path.join(conf.paths.src, '/app/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.html')
  ];
  return gulp.src(files)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'todo-app',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
}

function html() {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe(closure())
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.replace('../../bower_components/bootstrap/fonts/', '../fonts/'))
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
}

function other() {
  var fileFilter = $.filter(function(file) {
    return file.stat.isFile();
  });

  var files = [
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,less}')
  ];

  return gulp.src(files)
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
}

function clean(done) {
  $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')], done);
}

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
function fonts() {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
}

function config(environment) {
  return gulp.src('src/app/app-config/config.json')
    .pipe(gulpNgConfig('app-config', {
      environment: environment,
      wrap: 'const todoAppConfig = () => {\n <%= module %>};\nexport default todoAppConfig;'
    }))
    .pipe(gulp.dest('./src/app/app-config'));
}

gulp.task('config-dev', function() {
  return config('dev');
});

gulp.task('config-local', function() {
  return config('local');
});

gulp.task('config-prod', function() {
  return config('prod');
});

gulp.task('partials', partials);
gulp.task('html', ['inject', 'partials'], html);
gulp.task('html:dist', ['inject:dist', 'partials'], html);
gulp.task('fonts', fonts);
gulp.task('other', other);
gulp.task('clean', clean);
gulp.task('build', ['build:dev']);
gulp.task('build:local', ['config-local', 'html', 'fonts', 'other']);
gulp.task('build:dev', ['config-dev', 'html', 'fonts', 'other']);
gulp.task('build:dist', ['config-prod', 'html:dist', 'fonts', 'other']);
