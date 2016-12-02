export class ServiceRequestService {
  constructor($http, $q) {
    'ngInject';

    this.http = $http;
    this.q = $q;
    this.url = `${process.env.API_URL}serviceRequests`;
  }

  findAll() {
    return this.http
      .get(this.url)
      .then(response => response.data._embedded.serviceRequests)
      .catch(() => []);
  }

  add(serviceRequest) {
    return this.http
      .post(this.url, serviceRequest)
      .then(response => response.data);
  }
}
