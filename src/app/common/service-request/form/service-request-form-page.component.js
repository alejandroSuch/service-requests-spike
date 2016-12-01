const componentTemplate = require('./service-request-form-page.component.html');

class ServiceRequestFormPageCtrl {
  constructor(ServiceRequestService, $state) {
    'ngInject';

    this.serviceRequestService = ServiceRequestService;
    this.state = $state;
  }

  onSubmit({ serviceRequest }) {
    serviceRequest.id = parseInt(Math.random() * 1000, 10);

    this.serviceRequestService
      .add(serviceRequest)
      .then(() => this.state.go('serviceRequest.list'))
      .catch(() => alert('esto ha ido malamente'));
  }
}

export const ServiceRequestFormPage = {
  template: componentTemplate,
  controller: ServiceRequestFormPageCtrl
};
