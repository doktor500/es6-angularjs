class Log {
  /* @ngInject */
  constructor($log) {
    this.$log = $log;
  }

  log(message) {
    this.$log.log(message);
  }

  debug(message) {
    this.$log.debug(message);
  }

  error(message) {
    this.$log.error(message);
  }
}

export default Log;
