class App {
  /* @ngInject */
  static run($log, environment) {
    $log.info('Todo app running');
    $log.info(`Environment: ${environment}`);
  }
}

export default App;
