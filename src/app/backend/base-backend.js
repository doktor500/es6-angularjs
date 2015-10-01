class BaseBackend {
  constructor($httpBackend) {
    this.$httpBackend = $httpBackend;
  }

  static dependencies() {
    return [];
  }

  static loadModule() {
    // nothing to load
  }

  configure() {
    // nothing to configure
  }
}

export default BaseBackend;
