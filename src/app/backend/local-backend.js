import fixtures from '~/src/fixtures/fixtures';
import DevBackend from '~/src/app/backend/dev-backend';

const HTTP_OK = 200;

class LocalBackend extends DevBackend {

  static type() {
    return 'local';
  }

  configure() {
    this.$httpBackend.whenGET(/\.html/).passThrough();
    this.$httpBackend.whenGET('/todo').respond(fixtures.todos);
    this.$httpBackend.whenPOST(/todo/).respond(HTTP_OK);
    this.$httpBackend.whenPUT(/todo/).respond(HTTP_OK);
    this.$httpBackend.whenDELETE(/todo/).respond(HTTP_OK);
  }
}

export default LocalBackend;
