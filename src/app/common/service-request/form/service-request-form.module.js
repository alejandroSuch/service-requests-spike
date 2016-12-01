import angular from 'angular';
import { ServiceRequestForm } from './service-request-form.component';
import { ServiceRequestFormPage } from './service-request-form-page.component';

export const ServiceRequestFormModule = angular
  .module('service.request.form.module', [])
  .component('serviceRequestForm', ServiceRequestForm)
  .component('serviceRequestFormPage', ServiceRequestFormPage)
  .name;
