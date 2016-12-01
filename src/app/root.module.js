import angular from 'angular';
// import ngFormly from 'angular-formly';
import ngMessages from 'angular-messages';
import uiBootstrap from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';
// import ocLazyLoad from 'oclazyload';
// import ngFormlyBootstrap from 'angular-formly-templates-bootstrap';
// import { combineReducers } from 'redux';
import ngRedux from 'ng-redux';

import { RootComponent } from './root.component';

// import reducers from './root.reducers';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from './common/common.module';

// require('bootstrap/dist/css/bootstrap.css');
require('../assets/styles.css');

const depencencies = [
  CommonModule, ComponentsModule, /* ngFormly, ngFormlyBootstrap, */
  ngMessages, ngRedux, /* ocLazyLoad, */ uiBootstrap, uiRouter,
];

const INITIAL_PATH = '/service-request/list';

export const RootModule = angular
  .module('sets.module', depencencies)
  .component('app', RootComponent)
  .config(($urlRouterProvider, $compileProvider) => {
    'ngInject';

    $urlRouterProvider.otherwise(INITIAL_PATH);
    // $ngReduxProvider.createStoreWith(reducers, []);
    $compileProvider.debugInfoEnabled(process.env.DEBUG_INFO_ENABLED);
  })
  .run(() => {
  })
  .name;
