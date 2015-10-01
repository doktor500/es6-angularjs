import _ from 'lodash';
import backends from '~/src/app/backend/backends';

class AppBackend {
  /* @ngInject */
  static load(environment) {
    const Backend = AppBackend._current(environment);
    angular.module('todo-app-backend', Backend.dependencies()).config(Backend.loadModule);
  }

  /* @ngInject */
  static setUp($httpBackend, environment) {
    const Backend = AppBackend._current(environment);
    new Backend($httpBackend).configure();
  }

  static _current(environment) {
    return _.find(backends, (Backend) => Backend.type() === environment);
  }
}

export default AppBackend;
