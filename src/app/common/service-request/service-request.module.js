import angular from 'angular';
import uiRouter from 'angular-ui-router';

import { ServiceRequestComponent } from './service-request.component';
import { ServiceRequestService } from './service-request.service';
import { ServiceRequestFormModule } from './form/service-request-form.module';
import { ServiceRequestListModule } from './list/service.request.list.module';

const thirdPartyDependencies = [uiRouter];
const submodules = [ServiceRequestFormModule, ServiceRequestListModule];

export const ServiceRequestModule = angular
  .module('service.request.module', [...thirdPartyDependencies, ...submodules])
  .service('ServiceRequestService', ServiceRequestService)
  .component('serviceRequest', ServiceRequestComponent)
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('serviceRequest', {
        url: '/service-request',
        abstract: true,
        component: 'serviceRequest',
        redirectTo: 'serviceRequest.list'
      })
      .state('serviceRequest.new', {
        url: '/new',
        component: 'serviceRequestFormPage'
      })
      .state('serviceRequest.list', {
        url: '/list',
        component: 'serviceRequestList',
        resolve: {
          // eslint-disable-next-line no-shadow
          requests: (ServiceRequestService) => {
            'ngInject';

            return ServiceRequestService.findAll();
          }
        }
      });
  })
  .name;
