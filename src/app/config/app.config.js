class AppConfig {
  /* @ngInject */
  static init($logProvider) {
    $logProvider.debugEnabled(true);
  }
}

export default AppConfig;
