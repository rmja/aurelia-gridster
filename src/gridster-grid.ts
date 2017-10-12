import { GridsterCustomElement } from './gridster';
import { Renderer } from './renderer';
import { autoinject } from 'aurelia-dependency-injection';

@autoinject
export class GridsterGridCustomElement {
  el: HTMLElement;
  columns: number;
  rows: number;
  height: number;
  width: number;
  margin: number;
  columnsHeight: number;
  rowsWidth: number;

  constructor(private gridster: GridsterCustomElement, public renderer: Renderer) {
    this.gridster.gridLines = this;
    this.columns = 0;
    this.rows = 0;
    this.height = 0;
    this.width = 0;
    this.columnsHeight = 0;
    this.rowsWidth = 0;
  }

  updateGrid(): void {
    if (this.gridster.$options.displayGrid === 'always' && !this.gridster.mobile) {
      this.renderer.setStyle(this.el, 'display', 'block');
    } else if (this.gridster.$options.displayGrid === 'onDrag&Resize' && this.gridster.dragInProgress) {
      this.renderer.setStyle(this.el, 'display', 'block');
    } else if (this.gridster.$options.displayGrid === 'none' || !this.gridster.dragInProgress || this.gridster.mobile) {
      this.renderer.setStyle(this.el, 'display', 'none');
    }
    this.gridster.setGridDimensions();
    this.margin = this.gridster.$options.margin;
    this.height = this.gridster.curRowHeight - this.margin;
    this.width = this.gridster.curColWidth - this.margin;
    this.columns = Math.max(this.gridster.columns, Math.floor(this.gridster.curWidth / this.gridster.curColWidth)) || 0;
    this.rows = Math.max(this.gridster.rows, Math.floor(this.gridster.curHeight / this.gridster.curRowHeight)) || 0;
    this.columnsHeight = this.gridster.curRowHeight * this.rows;
    this.rowsWidth = this.gridster.curColWidth * this.columns;
  }
}
