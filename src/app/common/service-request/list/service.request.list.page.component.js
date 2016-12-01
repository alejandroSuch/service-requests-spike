const componentTemplate = require('./service.request.list.page.component.html');

class ServiceRequestListPageCtrl {
  constructor(ServiceRequestService) {
    'ngInject';

    this.ServiceRequestService = ServiceRequestService;
  }

  $onInit() {
    this.ServiceRequestService
      .findAll()
      .then((requests) => {
        this.requests = requests || [];
      });
  }
}

export const ServiceRequestListPage = {
  template: componentTemplate,
  controller: ServiceRequestListPageCtrl
};
