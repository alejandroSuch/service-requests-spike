require('bootstrap/dist/css/bootstrap.css');

import angular from 'angular';
// import ngFormly from 'angular-formly';
import ngMessages from 'angular-messages';
import uiBootstrap from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';
// import ocLazyLoad from 'oclazyload';
// import ngFormlyBootstrap from 'angular-formly-templates-bootstrap';
import { combineReducers } from 'redux';
import ngRedux from 'ng-redux';

import { RootComponent } from './root.component';

import { reducers } from './root.reducers'; 
import { ComponentsModule } from './components/components.module';
import { CommonModule } from './common/common.module';

let depencencies = [
    CommonModule, ComponentsModule, /* ngFormly, ngFormlyBootstrap, */ 
    ngMessages, ngRedux, /* ocLazyLoad, */ uiBootstrap, uiRouter
];

const MODULE_NAME = 'my-module';
const INITIAL_PATH = '/login';

export const RootModule = angular
    .module(MODULE_NAME, depencencies)
    .component('app', RootComponent)
    .config(function($urlRouterProvider, $ngReduxProvider, $compileProvider){
        'ngInject';

        $urlRouterProvider.otherwise(INITIAL_PATH);
        $ngReduxProvider.createStoreWith(reducers, []);
        $compileProvider.debugInfoEnabled(process.env.DEBUG_INFO_ENABLED);
    })
    .run(function(){ })
    .name;