import RestService from '~/src/app/common/rest-service';

class HttpServiceApi {
  get() {}
  post() {}
  put() {}
  delete() {}
}

describe('Rest service', () => {

  const backendURL = 'http://app';
  let restService, http, q, rootScope;

  beforeEach(angular.mock.module('todo-app'));

  beforeEach(angular.mock.inject(($q, $rootScope) => {
    q = $q;
    rootScope = $rootScope;
    http = new HttpServiceApi();
    restService = new RestService(http, backendURL);
  }));

  it('requests a list of resources', () => {
    given:
    let result;
    const resource = 'resource';
    const resources = ['resource1', 'resource2'];
    const getAction = sinon.stub(http, 'get').returns(q.when({ data: resources }));

    when:
    restService.list(resource).then((response) => result = response);

    then:
    chai.expect(getAction).to.have.been.calledWith(`${backendURL}/${resource}`);

    when:
    rootScope.$apply();

    then:
    chai.expect(result).to.be.deep.equal(resources);
  });

  it('sends a request to add a resource', () => {
    given:
    const id = 1;
    const data = { id: id };
    const resource = 'resource';
    const addAction = sinon.stub(http, 'post');

    when:
    restService.add(resource, data);

    then:
    chai.expect(addAction).to.have.been.calledWith(`${backendURL}/${resource}`, data);
  });

  it('sends a request to update a resource', () => {
    given:
    const id = 1;
    const data = { id: id };
    const resource = 'resource';
    const putAction = sinon.stub(http, 'put');

    when:
    restService.update(resource, data);

    then:
    chai.expect(putAction).to.have.been.calledWith(`${backendURL}/${resource}/${id}`, data);
  });

  it('sends a request to delete a resource', () => {
    given:
    const id = 1;
    const data = { id: id };
    const resource = 'resource';
    const deleteAction = sinon.stub(http, 'delete');

    when:
    restService.delete(resource, data);

    then:
    chai.expect(deleteAction).to.have.been.calledWith(`${backendURL}/${resource}/${id}`);
  });
});
