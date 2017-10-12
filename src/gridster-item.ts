import { autoinject, bindable, customElement } from 'aurelia-framework';

import { GridsterComponent } from './gridster';
import { GridsterDraggable } from './services/gridster-draggable';
import { GridsterItem } from './interfaces/gridster-item';
import { GridsterResizable } from './services/gridster-resizable';
import { GridsterUtils } from './services/gridster-utils';
import { Renderer } from './renderer';

@autoinject
@customElement('gridster-item')
export class GridsterItemComponent {
  @bindable item: GridsterItem;
  @bindable itemChange = (_: GridsterItem) => { };
  @bindable itemResize = (_: GridsterItem) => { };
  $item: GridsterItem;
  el: HTMLElement;
  gridster: GridsterComponent;
  itemTop: number;
  itemLeft: number;
  itemWidth: number;
  itemHeight: number;
  top: number;
  left: number;
  width: number;
  height: number;
  itemMargin: number;
  drag: GridsterDraggable;
  resize: GridsterResizable;
  notPlaced: boolean;

  constructor(gridster: GridsterComponent, public renderer: Renderer) {
    this.$item = {
      cols: -1,
      rows: -1,
      x: -1,
      y: -1,
    };
    this.gridster = gridster;
    this.drag = new GridsterDraggable(this, gridster);
    this.resize = new GridsterResizable(this, gridster);
  }

  attached(): void {
    this.updateOptions();
    this.gridster.addItem(this);
  }

  updateOptions(): void {
    this.$item = GridsterUtils.merge(this.$item, this.item, {
      cols: undefined,
      rows: undefined,
      x: undefined,
      y: undefined,
      initCallback: undefined,
      dragEnabled: undefined,
      resizeEnabled: undefined,
      maxItemRows: undefined,
      minItemRows: undefined,
      maxItemCols: undefined,
      minItemCols: undefined,
      maxItemArea: undefined,
      minItemArea: undefined,
    });
  }

  detached(): void {
    this.gridster.removeItem(this);
  }

  setSize(noCheck: Boolean): void {
    if (this.gridster.mobile) {
      this.top = 0;
      this.left = 0;
      if (this.gridster.$options.keepFixedWidthInMobile) {
        this.width = this.$item.cols * this.gridster.$options.fixedColWidth;
      } else {
        this.width = this.gridster.curWidth - (this.gridster.$options.outerMargin ? 2 * this.gridster.$options.margin : 0);
      }
      if (this.gridster.$options.keepFixedHeightInMobile) {
        this.height = this.$item.rows * this.gridster.$options.fixedRowHeight;
      } else {
        this.height = this.width / 2;
      }
    } else {
      this.top = this.$item.y * this.gridster.curRowHeight;
      this.left = this.$item.x * this.gridster.curColWidth;
      this.width = this.$item.cols * this.gridster.curColWidth - this.gridster.$options.margin;
      this.height = this.$item.rows * this.gridster.curRowHeight - this.gridster.$options.margin;
    }
    if (!noCheck && this.top === this.itemTop && this.left === this.itemLeft &&
      this.width === this.itemWidth && this.height === this.itemHeight) {
      return;
    }
    if (this.gridster.$options.outerMargin) {
      this.itemMargin = this.gridster.$options.margin;
    } else {
      this.itemMargin = 0;
    }

    this.renderer.setStyle(this.el, 'display', this.notPlaced ? 'none' : 'block');
    this.renderer.setStyle(this.el, 'top', this.top + 'px');
    this.renderer.setStyle(this.el, 'left', this.left + 'px');
    this.renderer.setStyle(this.el, 'width', this.width + 'px');
    this.renderer.setStyle(this.el, 'height', this.height + 'px');
    this.renderer.setStyle(this.el, 'margin', this.itemMargin + 'px');
    if (this.width !== this.itemWidth || this.height !== this.itemHeight) {
      this.itemResize(this.item);
      if (this.gridster.$options.itemResizeCallback) {
        this.gridster.$options.itemResizeCallback(this.item, this);
      }
    }
    this.itemTop = this.top;
    this.itemLeft = this.left;
    this.itemWidth = this.width;
    this.itemHeight = this.height;
  }

  itemChanged(): void {
    this.itemChange(this.item);
    if (this.gridster.$options.itemChangeCallback) {
      this.gridster.$options.itemChangeCallback(this.item, this);
    }
  }

  checkItemChanges(newValue: GridsterItem, oldValue: GridsterItem): void {
    if (newValue.rows === oldValue.rows && newValue.cols === oldValue.cols && newValue.x === oldValue.x && newValue.y === oldValue.y) {
      return;
    }
    if (this.gridster.checkCollision(this.$item)) {
      this.$item.x = oldValue.x || 0;
      this.$item.y = oldValue.y || 0;
      this.$item.cols = oldValue.cols || 1;
      this.$item.rows = oldValue.rows || 1;
    } else {
      this.item.cols = this.$item.cols;
      this.item.rows = this.$item.rows;
      this.item.x = this.$item.x;
      this.item.y = this.$item.y;
      this.gridster.calculateLayout();
      this.itemChanged();
    }
  }

  canBeDragged(): boolean {
    return !this.gridster.mobile &&
      (this.$item.dragEnabled === undefined ? this.gridster.$options.draggable.enabled : this.$item.dragEnabled);
  }

  canBeResized(): boolean {
    return !this.gridster.mobile &&
      (this.$item.resizeEnabled === undefined ? this.gridster.$options.resizable.enabled : this.$item.resizeEnabled);
  }
}
