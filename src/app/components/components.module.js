import angular from 'angular';

import { PdfViewerModule } from './pdf-viewer/pdf-viewer.module';
import { EventEmitterModule } from './event-emitter/event-emitter.module';


export const ComponentsModule = angular
  .module('components.module', [PdfViewerModule, EventEmitterModule])
  .name;
