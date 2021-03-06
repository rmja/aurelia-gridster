var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { GridsterCustomElement } from '../gridster';
import { GridsterUtils } from './gridster-utils';
import { autoinject } from 'aurelia-dependency-injection';
let GridsterEmptyCell = class GridsterEmptyCell {
    constructor(gridster) {
        this.gridster = gridster;
    }
    updateOptions() {
        if (this.gridster.$options.enableEmptyCellClick && !this.emptyCellClick && this.gridster.$options.emptyCellClickCallback) {
            this.emptyCellClick = this.gridster.renderer.listen(this.gridster.el, 'click', this.emptyCellClickCb.bind(this));
        }
        else if (!this.gridster.$options.enableEmptyCellClick && this.emptyCellClick) {
            this.emptyCellClick.dispose();
            this.emptyCellClick = null;
        }
        if (this.gridster.$options.enableEmptyCellContextMenu && !this.emptyCellContextMenu && this.gridster.$options.emptyCellContextMenuCallback) {
            this.emptyCellContextMenu = this.gridster.renderer.listen(this.gridster.el, 'contextmenu', this.emptyCellContextMenuCb.bind(this));
        }
        else if (!this.gridster.$options.enableEmptyCellContextMenu && this.emptyCellContextMenu) {
            this.emptyCellContextMenu.dispose();
            this.emptyCellContextMenu = null;
        }
        if (this.gridster.$options.enableEmptyCellDrop && !this.emptyCellDrop && this.gridster.$options.emptyCellDropCallback) {
            this.emptyCellDrop = this.gridster.renderer.listen(this.gridster.el, 'drop', this.emptyCellDragDrop.bind(this));
            this.emptyCellMove = this.gridster.renderer.listen(this.gridster.el, 'dragover', this.emptyCellDragOver.bind(this));
        }
        else if (!this.gridster.$options.enableEmptyCellDrop && this.emptyCellDrop && this.emptyCellMove) {
            this.emptyCellDrop.dispose();
            this.emptyCellMove.dispose();
            this.emptyCellMove = null;
            this.emptyCellDrop = null;
        }
        if (this.gridster.$options.enableEmptyCellDrag && !this.emptyCellDrag && this.gridster.$options.emptyCellDragCallback) {
            this.emptyCellDrag = this.gridster.renderer.listen(this.gridster.el, 'mousedown', this.emptyCellMouseDown.bind(this));
        }
        else if (!this.gridster.$options.enableEmptyCellDrag && this.emptyCellDrag) {
            this.emptyCellDrag.dispose();
            this.emptyCellDrag = null;
        }
    }
    emptyCellClickCb(e) {
        if (this.gridster.movingItem || GridsterUtils.checkContentClassForEvent(this.gridster, e)) {
            return;
        }
        const item = this.getValidItemFromEvent(e);
        if (!item) {
            return;
        }
        this.gridster.$options.emptyCellClickCallback(e, item);
    }
    emptyCellContextMenuCb(e) {
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
    emptyCellDragDrop(e) {
        const item = this.getValidItemFromEvent(e);
        if (!item) {
            return;
        }
        this.gridster.$options.emptyCellDropCallback(e, item);
    }
    emptyCellDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.getValidItemFromEvent(e)) {
            e.dataTransfer.dropEffect = 'move';
        }
        else {
            e.dataTransfer.dropEffect = 'none';
        }
    }
    emptyCellMouseDown(e) {
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
    emptyCellMouseMove(e) {
        e.preventDefault();
        e.stopPropagation();
        const item = this.getValidItemFromEvent(e, this.initialItem);
        if (!item) {
            return;
        }
        this.gridster.movingItem = item;
        this.gridster.previewStyle();
    }
    emptyCellMouseUp(e) {
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
    getValidItemFromEvent(e, oldItem) {
        e.preventDefault();
        e.stopPropagation();
        GridsterUtils.checkTouchEvent(e);
        const rect = this.gridster.el.getBoundingClientRect();
        const x = e.clientX + this.gridster.el.scrollLeft - rect.left;
        const y = e.clientY + this.gridster.el.scrollTop - rect.top;
        const item = {
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
            }
            else if (oldItem.x - item.x > this.gridster.$options.emptyCellDragMaxCols - 1) {
                item.x = this.gridster.movingItem.x;
            }
            if (oldItem.y < item.y) {
                item.y = oldItem.y;
            }
            else if (oldItem.y - item.y > this.gridster.$options.emptyCellDragMaxRows - 1) {
                item.y = this.gridster.movingItem.y;
            }
        }
        if (this.gridster.checkCollision(item)) {
            return undefined;
        }
        return item;
    }
};
GridsterEmptyCell = __decorate([
    autoinject,
    __metadata("design:paramtypes", [GridsterCustomElement])
], GridsterEmptyCell);
export { GridsterEmptyCell };
