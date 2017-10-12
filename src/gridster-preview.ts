import { GridsterCustomElement } from './gridster';
import { Renderer } from './renderer';
import { autoinject } from 'aurelia-dependency-injection';
import { inlineView } from 'aurelia-templating';

@autoinject
@inlineView('<template ref="el" class="gridster-preview"></template>')
export class GridsterPreviewCustomElement {
  el: HTMLElement;

  constructor(private gridster: GridsterCustomElement, public renderer: Renderer) {
    this.gridster.previewStyle = this.previewStyle.bind(this);
  }

  previewStyle() {
    if (!this.gridster.movingItem) {
      this.renderer.setStyle(this.el, 'display', 'none');
    } else {
      let margin = 0;
      const curRowHeight = this.gridster.curRowHeight;
      const curColWidth = this.gridster.curColWidth;
      if (this.gridster.$options.outerMargin) {
        margin = this.gridster.$options.margin;
      }
      this.renderer.setStyle(this.el, 'display', 'block');
      this.renderer.setStyle(this.el, 'height', (this.gridster.movingItem.rows * curRowHeight - margin) + 'px');
      this.renderer.setStyle(this.el, 'width', (this.gridster.movingItem.cols * curColWidth - margin) + 'px');
      this.renderer.setStyle(this.el, 'top', (this.gridster.movingItem.y * curRowHeight + margin) + 'px');
      this.renderer.setStyle(this.el, 'left', (this.gridster.movingItem.x * curColWidth + margin) + 'px');
      this.renderer.setStyle(this.el, 'marginBottom', margin + 'px');
    }
  }
}
