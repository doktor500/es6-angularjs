import BaseBackend from '~/src/app/backend/base-backend';

class DevBackend extends BaseBackend {
  static type() {
    return 'dev';
  }

  static dependencies() {
    return ['ngMockE2E'];
  }

  static loadModule() {
    angular.module('ngMockE2E', ['ng']).config(DevBackend._backendDecorator());
  }

  static _backendDecorator() {
    return ['$provide', ($provide) => $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator)];
  }

  configure() {
    this.$httpBackend.whenGET(/^\w+.*/).passThrough();
    this.$httpBackend.whenPOST(/^\w+.*/).passThrough();
    this.$httpBackend.whenPUT(/^\w+.*/).passThrough();
    this.$httpBackend.whenDELETE(/^\w+.*/).passThrough();
  }
}

export default DevBackend;
