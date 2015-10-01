import BaseBackend from '~/src/app/backend/base-backend';

class ProdBackend extends BaseBackend {
  static type() {
    return 'prod';
  }
}

export default ProdBackend;
