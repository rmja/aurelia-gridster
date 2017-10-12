var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-framework", "../gridster", "./gridster-utils"], function (require, exports, aurelia_framework_1, gridster_1, gridster_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GridsterEmptyCell = /** @class */ (function () {
        function GridsterEmptyCell(gridster) {
            this.gridster = gridster;
        }
        GridsterEmptyCell.prototype.updateOptions = function () {
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
        };
        GridsterEmptyCell.prototype.emptyCellClickCb = function (e) {
            if (this.gridster.movingItem || gridster_utils_1.GridsterUtils.checkContentClassForEvent(this.gridster, e)) {
                return;
            }
            var item = this.getValidItemFromEvent(e);
            if (!item) {
                return;
            }
            this.gridster.$options.emptyCellClickCallback(e, item);
        };
        GridsterEmptyCell.prototype.emptyCellContextMenuCb = function (e) {
            if (this.gridster.movingItem || gridster_utils_1.GridsterUtils.checkContentClassForEvent(this.gridster, e)) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            var item = this.getValidItemFromEvent(e);
            if (!item) {
                return;
            }
            this.gridster.$options.emptyCellContextMenuCallback(e, item);
        };
        GridsterEmptyCell.prototype.emptyCellDragDrop = function (e) {
            var item = this.getValidItemFromEvent(e);
            if (!item) {
                return;
            }
            this.gridster.$options.emptyCellDropCallback(e, item);
        };
        GridsterEmptyCell.prototype.emptyCellDragOver = function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.getValidItemFromEvent(e)) {
                e.dataTransfer.dropEffect = 'move';
            }
            else {
                e.dataTransfer.dropEffect = 'none';
            }
        };
        GridsterEmptyCell.prototype.emptyCellMouseDown = function (e) {
            if (gridster_utils_1.GridsterUtils.checkContentClassForEvent(this.gridster, e)) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            var item = this.getValidItemFromEvent(e);
            if (!item) {
                return;
            }
            this.initialItem = item;
            this.gridster.movingItem = item;
            this.gridster.previewStyle();
            this.emptyCellMMove = this.gridster.renderer.listen('window', 'mousemove', this.emptyCellMouseMove.bind(this));
            this.emptyCellUp = this.gridster.renderer.listen('window', 'mouseup', this.emptyCellMouseUp.bind(this));
        };
        GridsterEmptyCell.prototype.emptyCellMouseMove = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var item = this.getValidItemFromEvent(e, this.initialItem);
            if (!item) {
                return;
            }
            this.gridster.movingItem = item;
            this.gridster.previewStyle();
        };
        GridsterEmptyCell.prototype.emptyCellMouseUp = function (e) {
            this.emptyCellMMove.dispose();
            this.emptyCellUp.dispose();
            var item = this.getValidItemFromEvent(e, this.initialItem);
            if (item) {
                this.gridster.movingItem = item;
            }
            this.gridster.$options.emptyCellDragCallback(e, this.gridster.movingItem);
            setTimeout(function () {
                this.initialItem = null;
                this.gridster.movingItem = null;
                this.gridster.previewStyle();
            }.bind(this));
        };
        GridsterEmptyCell.prototype.getValidItemFromEvent = function (e, oldItem) {
            e.preventDefault();
            e.stopPropagation();
            gridster_utils_1.GridsterUtils.checkTouchEvent(e);
            var rect = this.gridster.el.getBoundingClientRect();
            var x = e.clientX + this.gridster.el.scrollLeft - rect.left;
            var y = e.clientY + this.gridster.el.scrollTop - rect.top;
            var item = {
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
        };
        GridsterEmptyCell = __decorate([
            aurelia_framework_1.inject(gridster_1.GridsterComponent)
        ], GridsterEmptyCell);
        return GridsterEmptyCell;
    }());
    exports.GridsterEmptyCell = GridsterEmptyCell;
});
