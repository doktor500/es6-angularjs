class RouterConfig {
  /* @ngInject */
  static init($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', { url: '/', template: '<todo></todo>' });
    $urlRouterProvider.otherwise('/');
  }
}

export default RouterConfig;
