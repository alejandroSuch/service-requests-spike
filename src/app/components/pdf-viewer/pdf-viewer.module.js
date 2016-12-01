import angular from 'angular';
import { PdfViewerComponent } from './pdf-viewer.component';

export const PdfViewerModule = angular
  .module('pdf-viewer-module', [])
  .component('pdfViewer', PdfViewerComponent)
  .name;
