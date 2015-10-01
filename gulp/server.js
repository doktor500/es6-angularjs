var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');
var util = require('util');

require('http-proxy-middleware');

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'
}));

function browserSyncInit(baseDir, browser) {
  var routes = null;
  if (baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  /*
   * You can add a proxy to your backend by uncommenting the line bellow.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
   */
  // server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', proxyHost: 'jsonplaceholder.typicode.com'});

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: (browser ? browser : 'default')
  });
}

gulp.task('serve', ['serve:local']);

gulp.task('serve:dev', ['config-dev', 'watch'], function() {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:local', ['config-local', 'watch'], function() {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build:dist'], function() {
  browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['config-dev', 'scripts', 'inject'], function() {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src], []);
});

gulp.task('serve:e2e:dev', ['config-dev', 'scripts', 'inject'], function() {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src], []);
});

gulp.task('serve:e2e:local', ['config-local', 'scripts', 'inject'], function() {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src], []);
});

gulp.task('serve:e2e:dist', ['build:dist'], function() {
  browserSyncInit(conf.paths.dist, []);
});
