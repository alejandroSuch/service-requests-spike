const componentTemplate = require('./service.request.list.component.html');

class ServiceRequestListComponentCtrl {
  constructor() {
    'ngInject';

    this.requests = [];
  }

  $onChanges(changesObj) {
    const requests = changesObj.requests;

    if (requests) {
      this.requests = Object.assign([], requests.currentValue);
    }
  }
}

export const ServiceRequestListComponent = {
  template: componentTemplate,
  controller: ServiceRequestListComponentCtrl,
  bindings: {
    requests: '<'
  }
};

