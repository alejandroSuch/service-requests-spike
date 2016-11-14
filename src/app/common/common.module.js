import angular from 'angular';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

export const CommonModule = angular
    .module('common.module', [ ])
    .component('appHeader', HeaderComponent)
    .component('appFooter', FooterComponent)
    .name;