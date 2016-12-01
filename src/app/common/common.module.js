import angular from 'angular';
import angularResource from 'angular-resource';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ServiceRequestModule } from './service-request/service-request.module';

export const CommonModule = angular
  .module('common.module', [angularResource, ServiceRequestModule])
  .component('appHeader', HeaderComponent)
  .component('appFooter', FooterComponent)
  // .config((LoopBackResourceProvider) => {
  //   'ngInject';
  //
  //   // Use a custom auth header instead of the default 'Authorization'
  //   LoopBackResourceProvider.setAuthHeader('X-Access-Token');
  //
  //   // Change the URL where to access the LoopBack REST API server
  //   LoopBackResourceProvider.setUrlBase(process.env.API_URL);
  // })
  .name;
