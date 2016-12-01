import angular from 'angular';
import { ServiceRequestListComponent } from './service.request.list.component';
import { ServiceRequestListPage } from './service.request.list.page.component';

export const ServiceRequestListModule = angular
  .module('service.request.list.module', [])
  .component('serviceRequestListPage', ServiceRequestListPage)
  .component('serviceRequestList', ServiceRequestListComponent)
  .name;
