describe('Rest service', () => {

  const HTTP_OK = 200;
  let restService, httpBackend;

  beforeEach(angular.mock.module('todo-app'));

  beforeEach(angular.mock.inject(($injector, $httpBackend) => {
    restService = $injector.get('restService');
    httpBackend = $httpBackend;
  }));

  it('returns a promise that contains a list of resources', () => {
    given:
    let result;
    const resources = [{ content: 'content' }];
    httpBackend.expectGET('/resource').respond(resources);

    when:
    restService.list('resource').then((allResources) => result = allResources);

    and:
    httpBackend.flush();

    then:
    chai.expect(result).to.be.deep.equal(resources);
  });

  it('returns a promise that contains the result of adding a resource', () => {
    given:
    let success;
    const resource = { id: 1 };
    httpBackend.expectPOST('/resource', resource).respond(HTTP_OK);

    when:
    restService.add('resource', resource).then(() => success = true);

    and:
    httpBackend.flush();

    then:
    chai.expect(success).to.be.deep.equal(true);
  });

  it('returns a promise that contains the result of updating a resource', () => {
    given:
    let success;
    const resource = { id: 1 };
    httpBackend.expectPUT(`/resource/${resource.id}`).respond(HTTP_OK);

    when:
    restService.update('resource', resource).then(() => success = true);

    and:
    httpBackend.flush();

    then:
    chai.expect(success).to.be.deep.equal(true);
  });

  it('returns a promise that contains the result of deleting a resource', () => {
    given:
    let success;
    const resource = { id: 1 };
    httpBackend.expectDELETE(`/resource/${resource.id}`).respond(HTTP_OK);

    when:
    restService.delete('resource', resource).then(() => success = true);

    and:
    httpBackend.flush();

    then:
    chai.expect(success).to.be.deep.equal(true);
  });
});
