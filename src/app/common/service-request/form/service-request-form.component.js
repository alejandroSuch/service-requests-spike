const componentTemplate = require('./service-request-form.component.html');

class ServiceRequestFormCtrl {
  constructor(EventEmitter) {
    'ngInject';

    this.reset();
    this.eventEmitter = EventEmitter;
  }

  reset() {
    this.serviceRequest = {};
  }

  doSubmission() {
    this.onSubmit(this.eventEmitter({ serviceRequest: this.serviceRequest }));
    this.reset();
  }
}

export const ServiceRequestForm = {
  template: componentTemplate,
  controller: ServiceRequestFormCtrl,
  bindings: {
    onSubmit: '&'
  }
};
