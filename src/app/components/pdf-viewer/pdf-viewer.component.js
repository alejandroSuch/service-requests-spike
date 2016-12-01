import { PDFJS } from 'pdfjs-dist';

const componentTemplate = require('./pdf-viewer.component.html');

//  TODO: IMPORTANT!! worker must be manually put on destination. In other case this will work, but with a fake worker
PDFJS.workerSrc = '../pdf.worker.js';

class PdfViewerCtrl {
  constructor($element, $q, $log) {
    'ngInject';

    this.$element = $element;
    this.url = null;
    this.pdf = null;
    this.renderTasks = [];
    this.$q = $q;
    this.log = $log;
    this.component = this.$element[0].querySelector('.pdf--viewer--component');
  }

  $onChanges(changesObj) {
    if (changesObj.url) {
      this.url = changesObj.url.currentValue;
      this.cancelRender();

      //  this.clear();

      this.addSpinner();
      this.drawPdf();
      this.destroyPdf();
    }
  }

  cancelRender() {
    this.renderTasks = this.renderTasks || [];

    this.renderTasks.forEach((task) => {
      task.cancel();
    });
  }

  clear() {
    //  this.component.innerText = '';

    while (this.component.lastChild) {
      this.component.removeChild(this.component.lastChild);
    }
  }

  destroyPdf() {
    if (this.pdf) {
      const deferred = this.$q.defer();

      this.pdf
        .destroy()
        .then(() => {
          this.log.info('Previous PDF destroyed');
          deferred.resolve(true);
        });

      return deferred.promise;
    }
    return this.$q.when(true);
  }

  drawPdf() {
    //  TODO: THIS PARAMS SHALL BE PARAMETRIZED
    const params = {
      url: this.url,
      httpHeaders: {
        Authorization: 'Basic ZXN1X2g6NHwzaiRuZHJwNXVkaA=='
      }
    };

    PDFJS
      .getDocument(params)
      .then((_pdf) => {
        this.pdf = _pdf;
        this.drawPages();
      });
  }

  drawPages() {
    if (!this.pdf) {
      return;
    }

    const width = this.getCanvasWidth();
    const canvasPromises = [];

    for (let page = 1; page <= this.pdf.numPages; page++) {
      const deferred = this.$q.defer();
      canvasPromises.push(deferred.promise);

      this.pdf
        .getPage(page)
        .then((pageToRender) => {
          const pageInfo = pageToRender.pageInfo;

          // eslint-disable-next-line angular/document-service
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const outputScale = this.getOutputScale(ctx);
          const scale = (width / pageInfo.view[2]) * outputScale.sx;
          const _width = (Math.floor(pageInfo.view[2]) * outputScale.sx * scale) || 0;
          const _height = (Math.floor(pageInfo.view[3]) * outputScale.sy * scale) || 0;

          const canvasHeight = ((_height * width) / _width);

          canvas.setAttribute('width', _width);
          canvas.setAttribute('height', _height);
          canvas.style.width = `${width}px`;
          canvas.style.border = '1px solid black';
          canvas.style.height = `${canvasHeight}px`;
          canvas.className = 'pdf-page';

          if (outputScale.scaled) {
            ctx.scale(outputScale.sx, outputScale.sy);
          }

          this.renderTasks.push(pageToRender.render({
            canvasContext: ctx,
            viewport: pageToRender.getViewport(scale)
          }));

          deferred.resolve(canvas);
        });
    }

    this.$q.all(canvasPromises).then((canvases) => {
      this.clear();
      // eslint-disable-next-line angular/document-service
      const div = document.createElement('div');

      canvases.forEach((_canvas) => {
        div.appendChild(_canvas);
      });

      this.component.appendChild(div);
    });
  }

  addSpinner() {
    // eslint-disable-next-line angular/document-service
    let iElement = document.createElement('i');
    iElement.className = 'fa fa-spinner fa-pulse';

    // eslint-disable-next-line angular/document-service
    let spinner = document.createElement('h1');
    spinner.className = 'text-center spinner';
    spinner.appendChild(iElement);

    //  TODO: APPEND SPINNER
    //  spinner.css('padding-top', ($(element).parent().height() >> 1) - 40);
    //  append spinner as element child

    this.component.appendChild(spinner);
  }

  getCanvasWidth() {
    return this.$element.parent()[0].offsetWidth * 0.75;
  }

  getOutputScale(ctx) {
    // eslint-disable-next-line angular/window-service
    let devicePixelRatio = window.devicePixelRatio || 1;
    let backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio
      || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;

    let pixelRatio = devicePixelRatio / backingStoreRatio;

    return {
      sx: pixelRatio,
      sy: pixelRatio,
      scaled: pixelRatio !== 1
    };
  }
}

export const PdfViewerComponent = {
  template: componentTemplate,
  bindings: {
    url: '<'
  },
  controller: PdfViewerCtrl
};
