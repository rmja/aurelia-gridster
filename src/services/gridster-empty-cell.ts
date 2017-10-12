import { Disposable, autoinject } from 'aurelia-framework';

import { GridsterComponent } from '../gridster';
import { GridsterItem } from '../interfaces/gridster-item';
import { GridsterUtils } from './gridster-utils';

@autoinject
export class GridsterEmptyCell {
  initialItem: GridsterItem;
  emptyCellClick: Disposable | null;
  emptyCellContextMenu: Disposable | null;
  emptyCellDrop: Disposable | null;
  emptyCellDrag: Disposable | null;
  emptyCellMMove: Disposable;
  emptyCellUp: Disposable;
  emptyCellMove: Disposable | null;

  constructor(private gridster: GridsterComponent) {
  }

  updateOptions(): void {
    if (this.gridster.$options.enableEmptyCellClick && !this.emptyCellClick && this.gridster.$options.emptyCellClickCallback) {
      this.emptyCellClick = this.gridster.renderer.listen(this.gridster.el, 'click', this.emptyCellClickCb.bind(this));
    } else if (!this.gridster.$options.enableEmptyCellClick && this.emptyCellClick) {
      this.emptyCellClick.dispose();
      this.emptyCellClick = null;
    }
    if (this.gridster.$options.enableEmptyCellContextMenu && !this.emptyCellContextMenu && this.gridster.$options.emptyCellContextMenuCallback) {
      this.emptyCellContextMenu = this.gridster.renderer.listen(this.gridster.el, 'contextmenu', this.emptyCellContextMenuCb.bind(this));
    } else if (!this.gridster.$options.enableEmptyCellContextMenu && this.emptyCellContextMenu) {
      this.emptyCellContextMenu.dispose();
      this.emptyCellContextMenu = null;
    }
    if (this.gridster.$options.enableEmptyCellDrop && !this.emptyCellDrop && this.gridster.$options.emptyCellDropCallback) {
      this.emptyCellDrop = this.gridster.renderer.listen(this.gridster.el, 'drop', this.emptyCellDragDrop.bind(this));
      this.emptyCellMove = this.gridster.renderer.listen(this.gridster.el, 'dragover', this.emptyCellDragOver.bind(this));
    } else if (!this.gridster.$options.enableEmptyCellDrop && this.emptyCellDrop && this.emptyCellMove) {
      this.emptyCellDrop.dispose();
      this.emptyCellMove.dispose();
      this.emptyCellMove = null;
      this.emptyCellDrop = null;
    }
    if (this.gridster.$options.enableEmptyCellDrag && !this.emptyCellDrag && this.gridster.$options.emptyCellDragCallback) {
      this.emptyCellDrag = this.gridster.renderer.listen(this.gridster.el, 'mousedown', this.emptyCellMouseDown.bind(this));
    } else if (!this.gridster.$options.enableEmptyCellDrag && this.emptyCellDrag) {
      this.emptyCellDrag.dispose();
      this.emptyCellDrag = null;
    }
  }

  emptyCellClickCb(e): void {
    if (this.gridster.movingItem || GridsterUtils.checkContentClassForEvent(this.gridster, e)) {
      return;
    }
    const item = this.getValidItemFromEvent(e);
    if (!item) {
      return;
    }
    this.gridster.$options.emptyCellClickCallback(e, item);
  }

  emptyCellContextMenuCb(e): void {
    if (this.gridster.movingItem || GridsterUtils.checkContentClassForEvent(this.gridster, e)) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    const item = this.getValidItemFromEvent(e);
    if (!item) {
      return;
    }
    this.gridster.$options.emptyCellContextMenuCallback(e, item);
  }

  emptyCellDragDrop(e): void {
    const item = this.getValidItemFromEvent(e);
    if (!item) {
      return;
    }
    this.gridster.$options.emptyCellDropCallback(e, item);
  }

  emptyCellDragOver(e): void {
    e.preventDefault();
    e.stopPropagation();
    if (this.getValidItemFromEvent(e)) {
      e.dataTransfer.dropEffect = 'move';
    } else {
      e.dataTransfer.dropEffect = 'none';
    }
  }

  emptyCellMouseDown(e): void {
    if (GridsterUtils.checkContentClassForEvent(this.gridster, e)) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    const item = this.getValidItemFromEvent(e);
    if (!item) {
      return;
    }
    this.initialItem = item;
    this.gridster.movingItem = item;
    this.gridster.previewStyle();
    this.emptyCellMMove = this.gridster.renderer.listen('window', 'mousemove', this.emptyCellMouseMove.bind(this));
    this.emptyCellUp = this.gridster.renderer.listen('window', 'mouseup', this.emptyCellMouseUp.bind(this));
  }

  emptyCellMouseMove(e): void {
    e.preventDefault();
    e.stopPropagation();
    const item = this.getValidItemFromEvent(e, this.initialItem);
    if (!item) {
      return;
    }

    this.gridster.movingItem = item;
    this.gridster.previewStyle();
  }

  emptyCellMouseUp(e): void {
    this.emptyCellMMove.dispose();
    this.emptyCellUp.dispose();
    const item = this.getValidItemFromEvent(e, this.initialItem);
    if (item) {
      this.gridster.movingItem = item;
    }
    this.gridster.$options.emptyCellDragCallback(e, this.gridster.movingItem);
    setTimeout(function () {
      this.initialItem = null;
      this.gridster.movingItem = null;
      this.gridster.previewStyle();
    }.bind(this));
  }

  getValidItemFromEvent(e, oldItem?: GridsterItem): GridsterItem | undefined {
    e.preventDefault();
    e.stopPropagation();
    GridsterUtils.checkTouchEvent(e);
    const rect = this.gridster.el.getBoundingClientRect();
    const x = e.clientX + this.gridster.el.scrollLeft - rect.left;
    const y = e.clientY + this.gridster.el.scrollTop - rect.top;
    const item: GridsterItem = {
      x: this.gridster.pixelsToPositionX(x, Math.floor),
      y: this.gridster.pixelsToPositionY(y, Math.floor),
      cols: this.gridster.$options.defaultItemCols,
      rows: this.gridster.$options.defaultItemRows
    };
    if (oldItem) {
      item.cols = Math.min(Math.abs(oldItem.x - item.x) + 1, this.gridster.$options.emptyCellDragMaxCols);
      item.rows = Math.min(Math.abs(oldItem.y - item.y) + 1, this.gridster.$options.emptyCellDragMaxRows);
      if (oldItem.x < item.x) {
        item.x = oldItem.x;
      } else if (oldItem.x - item.x > this.gridster.$options.emptyCellDragMaxCols - 1) {
        item.x = this.gridster.movingItem.x;
      }
      if (oldItem.y < item.y) {
        item.y = oldItem.y;
      } else if (oldItem.y - item.y > this.gridster.$options.emptyCellDragMaxRows - 1) {
        item.y = this.gridster.movingItem.y;
      }
    }
    if (this.gridster.checkCollision(item)) {
      return undefined;
    }
    return item;
  }
}
