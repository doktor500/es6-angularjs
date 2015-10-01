class RestService {
  /* @ngInject */
  constructor($http, backendURL) {
    this.http = $http;
    this.backendURL = backendURL;
  }

  list(resource) {
    return this.http.get(`${this.backendURL}/${resource}`).then((response) => response.data);
  }

  add(resource, data) {
    return this.http.post(`${this.backendURL}/${resource}`, data);
  }

  update(resource, data) {
    return this.http.put(`${this.backendURL}/${resource}/${data.id}`, data);
  }

  delete(resource, data) {
    return this.http.delete(`${this.backendURL}/${resource}/${data.id}`);
  }
}

export default RestService;
