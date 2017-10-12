var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./gridster-scroll", "../gridster", "../gridster-item", "./gridster-push", "./gridster-push-resize", "./gridster-utils"], function (require, exports, aurelia_framework_1, gridster_scroll_1, gridster_1, gridster_item_1, gridster_push_1, gridster_push_resize_1, gridster_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GridsterResizable = /** @class */ (function () {
        function GridsterResizable(gridsterItem, gridster) {
            this.gridsterItem = gridsterItem;
            this.gridster = gridster;
            this.lastMouse = {
                clientX: 0,
                clientY: 0
            };
            this.itemBackup = [0, 0, 0, 0];
            this.resizeEventScrollType = { w: false, e: false, n: false, s: false };
        }
        GridsterResizable.prototype.dragStart = function (e) {
            switch (e.which) {
                case 1:
                    // left mouse button
                    break;
                case 2:
                case 3:
                    // right or middle mouse button
                    return;
            }
            if (this.gridster.$options.resizable.start) {
                this.gridster.$options.resizable.start(this.gridsterItem.item, this.gridsterItem, e);
            }
            e.stopPropagation();
            e.preventDefault();
            this.dragFunction = this.dragMove.bind(this);
            this.dragStopFunction = this.dragStop.bind(this);
            this.mousemove = this.gridsterItem.renderer.listen('document', 'mousemove', this.dragFunction);
            this.mouseup = this.gridsterItem.renderer.listen('document', 'mouseup', this.dragStopFunction);
            this.touchmove = this.gridster.renderer.listen(this.gridster.el, 'touchmove', this.dragFunction);
            this.touchend = this.gridsterItem.renderer.listen('document', 'touchend', this.dragStopFunction);
            this.touchcancel = this.gridsterItem.renderer.listen('document', 'touchcancel', this.dragStopFunction);
            this.gridsterItem.renderer.addClass(this.gridsterItem.el, 'gridster-item-resizing');
            this.lastMouse.clientX = e.clientX;
            this.lastMouse.clientY = e.clientY;
            this.left = this.gridsterItem.left;
            this.top = this.gridsterItem.top;
            this.width = this.gridsterItem.width;
            this.height = this.gridsterItem.height;
            this.bottom = this.gridsterItem.top + this.gridsterItem.height;
            this.right = this.gridsterItem.left + this.gridsterItem.width;
            this.margin = this.gridster.$options.margin;
            this.offsetLeft = this.gridster.el.scrollLeft - this.gridster.el.offsetLeft;
            this.offsetTop = this.gridster.el.scrollTop - this.gridster.el.offsetTop;
            this.diffLeft = e.clientX + this.offsetLeft - this.margin - this.left;
            this.diffRight = e.clientX + this.offsetLeft - this.margin - this.right;
            this.diffTop = e.clientY + this.offsetTop - this.margin - this.top;
            this.diffBottom = e.clientY + this.offsetTop - this.margin - this.bottom;
            this.minHeight = this.gridster.positionYToPixels(this.gridsterItem.$item.minItemRows || this.gridster.$options.minItemRows)
                - this.margin;
            this.minWidth = this.gridster.positionXToPixels(this.gridsterItem.$item.minItemCols || this.gridster.$options.minItemCols)
                - this.margin;
            this.gridster.movingItem = this.gridsterItem.$item;
            this.gridster.previewStyle();
            this.push = new gridster_push_1.GridsterPush(this.gridsterItem, this.gridster);
            this.pushResize = new gridster_push_resize_1.GridsterPushResize(this.gridsterItem, this.gridster);
            this.gridster.dragInProgress = true;
            this.gridster.gridLines.updateGrid();
            if (e.target.classList.contains('handle-n')) {
                this.resizeEventScrollType.n = true;
                this.directionFunction = this.handleN.bind(this);
            }
            else if (e.target.classList.contains('handle-w')) {
                this.resizeEventScrollType.w = true;
                this.directionFunction = this.handleW.bind(this);
            }
            else if (e.target.classList.contains('handle-s')) {
                this.resizeEventScrollType.s = true;
                this.directionFunction = this.handleS.bind(this);
            }
            else if (e.target.classList.contains('handle-e')) {
                this.resizeEventScrollType.e = true;
                this.directionFunction = this.handleE.bind(this);
            }
            else if (e.target.classList.contains('handle-nw')) {
                this.resizeEventScrollType.n = true;
                this.resizeEventScrollType.w = true;
                this.directionFunction = this.handleNW.bind(this);
            }
            else if (e.target.classList.contains('handle-ne')) {
                this.resizeEventScrollType.n = true;
                this.resizeEventScrollType.e = true;
                this.directionFunction = this.handleNE.bind(this);
            }
            else if (e.target.classList.contains('handle-sw')) {
                this.resizeEventScrollType.s = true;
                this.resizeEventScrollType.w = true;
                this.directionFunction = this.handleSW.bind(this);
            }
            else if (e.target.classList.contains('handle-se')) {
                this.resizeEventScrollType.s = true;
                this.resizeEventScrollType.e = true;
                this.directionFunction = this.handleSE.bind(this);
            }
        };
        GridsterResizable.prototype.dragMove = function (e) {
            e.stopPropagation();
            e.preventDefault();
            gridster_utils_1.GridsterUtils.checkTouchEvent(e);
            this.offsetTop = this.gridster.el.scrollTop - this.gridster.el.offsetTop;
            this.offsetLeft = this.gridster.el.scrollLeft - this.gridster.el.offsetLeft;
            gridster_scroll_1.scroll(this.gridsterItem, e, this.lastMouse, this.directionFunction, true, this.resizeEventScrollType);
            this.directionFunction(e);
            this.lastMouse.clientX = e.clientX;
            this.lastMouse.clientY = e.clientY;
            this.gridster.gridLines.updateGrid();
        };
        GridsterResizable.prototype.dragStop = function (e) {
            e.stopPropagation();
            e.preventDefault();
            gridster_scroll_1.cancelScroll();
            this.mousemove.dispose();
            this.mouseup.dispose();
            this.touchmove.dispose();
            this.touchend.dispose();
            this.touchcancel.dispose();
            this.gridsterItem.renderer.removeClass(this.gridsterItem.el, 'gridster-item-resizing');
            this.gridster.dragInProgress = false;
            this.gridster.gridLines.updateGrid();
            if (this.gridster.$options.resizable.stop) {
                Promise.resolve(this.gridster.$options.resizable.stop(this.gridsterItem.item, this.gridsterItem, e))
                    .then(this.makeResize.bind(this), this.cancelResize.bind(this));
            }
            else {
                this.makeResize();
            }
            setTimeout(function () {
                this.gridster.movingItem = null;
                this.gridster.previewStyle();
            }.bind(this));
        };
        GridsterResizable.prototype.cancelResize = function () {
            this.gridsterItem.$item.cols = this.gridsterItem.item.cols || 1;
            this.gridsterItem.$item.rows = this.gridsterItem.item.rows || 1;
            this.gridsterItem.$item.x = this.gridsterItem.item.x || 0;
            this.gridsterItem.$item.y = this.gridsterItem.item.y || 0;
            this.gridsterItem.setSize(true);
            this.push.restoreItems();
            this.pushResize.restoreItems();
        };
        GridsterResizable.prototype.makeResize = function () {
            this.gridsterItem.setSize(true);
            this.gridsterItem.checkItemChanges(this.gridsterItem.$item, this.gridsterItem.item);
            this.push.setPushedItems();
            this.pushResize.setPushedItems();
        };
        GridsterResizable.prototype.handleN = function (e) {
            this.top = e.clientY + this.offsetTop - this.margin - this.diffTop;
            this.height = this.bottom - this.top;
            if (this.minHeight > this.height) {
                this.height = this.minHeight;
                this.top = this.bottom - this.minHeight;
            }
            this.newPosition = this.gridster.pixelsToPositionY(this.top, Math.floor);
            if (this.gridsterItem.$item.y !== this.newPosition) {
                this.itemBackup[1] = this.gridsterItem.$item.y;
                this.itemBackup[3] = this.gridsterItem.$item.rows;
                this.gridsterItem.$item.rows += this.gridsterItem.$item.y - this.newPosition;
                this.gridsterItem.$item.y = this.newPosition;
                this.pushResize.pushItems(this.pushResize.fromSouth);
                this.push.pushItems(this.push.fromSouth, this.gridster.$options.disablePushOnResize);
                if (this.gridster.checkCollision(this.gridsterItem.$item)) {
                    this.gridsterItem.$item.y = this.itemBackup[1];
                    this.gridsterItem.$item.rows = this.itemBackup[3];
                    this.gridsterItem.renderer.setStyle(this.gridsterItem.el, 'top', this.gridster.positionYToPixels(this.gridsterItem.$item.y) + 'px');
                    this.gridsterItem.renderer.setStyle(this.gridsterItem.el, 'height', this.gridster.positionYToPixels(this.gridsterItem.$item.rows)
                        - this.gridster.$options.margin + 'px');
                    return;
                }
                else {
                    this.gridster.previewStyle();
                }
                this.pushResize.checkPushBack();
                this.push.checkPushBack();
            }
            this.gridsterItem.renderer.setStyle(this.gridsterItem.el, 'top', this.top + 'px');
            this.gridsterItem.renderer.setStyle(this.gridsterItem.el, 'height', this.height + 'px');
        };
        GridsterResizable.prototype.handleW = function (e) {
            this.left = e.clientX + this.offsetLeft - this.margin - this.diffLeft;
            this.width = this.right - this.left;
            if (this.minWidth > this.width) {
                this.width = this.minWidth;
                this.left = this.right - this.minWidth;
            }
            this.newPosition = this.gridster.pixelsToPositionX(this.left, Math.floor);
            if (this.gridsterItem.$item.x !== this.newPosition) {
                this.itemBackup[0] = this.gridsterItem.$item.x;
                this.itemBackup[2] = this.gridsterItem.$item.cols;
                this.gridsterItem.$item.cols += this.gridsterItem.$item.x - this.newPosition;
                this.gridsterItem.$item.x = this.newPosition;
                this.pushResize.pushItems(this.pushResize.fromEast);
                this.push.pushItems(this.push.fromEast, this.gridster.$options.disablePushOnResize);
                if (this.gridster.checkCollision(this.gridsterItem.$item)) {
                    this.gridsterItem.$item.x = this.itemBackup[0];
                    this.gridsterItem.$item.cols = this.itemBackup[2];
                    this.gridsterItem.renderer.setStyle(this.gridsterItem.el, 'left', this.gridster.positionXToPixels(this.gridsterItem.$item.x) + 'px');
                    this.gridsterItem.renderer.setStyle(this.gridsterItem.el, 'width', this.gridster.positionXToPixels(this.gridsterItem.$item.cols)
                        - this.gridster.$options.margin + 'px');
                    return;
                }
                else {
                    this.gridster.previewStyle();
                }
                this.pushResize.checkPushBack();
                this.push.checkPushBack();
            }
            this.gridsterItem.renderer.setStyle(this.gridsterItem.el, 'left', this.left + 'px');
            this.gridsterItem.renderer.setStyle(this.gridsterItem.el, 'width', this.width + 'px');
        };
        GridsterResizable.prototype.handleS = function (e) {
            this.height = e.clientY + this.offsetTop - this.margin - this.diffBottom - this.top;
            if (this.minHeight > this.height) {
                this.height = this.minHeight;
            }
            this.bottom = this.top + this.height;
            this.newPosition = this.gridster.pixelsToPositionY(this.bottom, Math.ceil);
            if ((this.gridsterItem.$item.y + this.gridsterItem.$item.rows) !== this.newPosition) {
                this.itemBackup[3] = this.gridsterItem.$item.rows;
                this.gridsterItem.$item.rows = this.newPosition - this.gridsterItem.$item.y;
                this.pushResize.pushItems(this.pushResize.fromNorth);
                this.push.pushItems(this.push.fromNorth, this.gridster.$options.disablePushOnResize);
                if (this.gridster.checkCollision(this.gridsterItem.$item)) {
                    this.gridsterItem.$item.rows = this.itemBackup[3];
                    this.gridsterItem.renderer.setStyle(this.gridsterItem.el, 'height', this.gridster.positionYToPixels(this.gridsterItem.$item.rows)
                        - this.gridster.$options.margin + 'px');
                    return;
                }
                else {
                    this.gridster.previewStyle();
                }
                this.pushResize.checkPushBack();
                this.push.checkPushBack();
            }
            this.gridsterItem.renderer.setStyle(this.gridsterItem.el, 'height', this.height + 'px');
        };
        GridsterResizable.prototype.handleE = function (e) {
            this.width = e.clientX + this.offsetLeft - this.margin - this.diffRight - this.left;
            if (this.minWidth > this.width) {
                this.width = this.minWidth;
            }
            this.right = this.left + this.width;
            this.newPosition = this.gridster.pixelsToPositionX(this.right, Math.ceil);
            if ((this.gridsterItem.$item.x + this.gridsterItem.$item.cols) !== this.newPosition) {
                this.itemBackup[2] = this.gridsterItem.$item.cols;
                this.gridsterItem.$item.cols = this.newPosition - this.gridsterItem.$item.x;
                this.pushResize.pushItems(this.pushResize.fromWest);
                this.push.pushItems(this.push.fromWest, this.gridster.$options.disablePushOnResize);
                if (this.gridster.checkCollision(this.gridsterItem.$item)) {
                    this.gridsterItem.$item.cols = this.itemBackup[2];
                    this.gridsterItem.renderer.setStyle(this.gridsterItem.el, 'width', this.gridster.positionXToPixels(this.gridsterItem.$item.cols)
                        - this.gridster.$options.margin + 'px');
                    return;
                }
                else {
                    this.gridster.previewStyle();
                }
                this.pushResize.checkPushBack();
                this.push.checkPushBack();
            }
            this.gridsterItem.renderer.setStyle(this.gridsterItem.el, 'width', this.width + 'px');
        };
        GridsterResizable.prototype.handleNW = function (e) {
            this.handleN(e);
            this.handleW(e);
        };
        GridsterResizable.prototype.handleNE = function (e) {
            this.handleN(e);
            this.handleE(e);
        };
        GridsterResizable.prototype.handleSW = function (e) {
            this.handleS(e);
            this.handleW(e);
        };
        GridsterResizable.prototype.handleSE = function (e) {
            this.handleS(e);
            this.handleE(e);
        };
        GridsterResizable.prototype.toggle = function () {
            this.resizeEnabled = this.gridsterItem.canBeResized();
        };
        GridsterResizable.prototype.dragStartDelay = function (e) {
            var _this = this;
            gridster_utils_1.GridsterUtils.checkTouchEvent(e);
            if (!this.gridster.$options.resizable.delayStart) {
                this.dragStart(e);
                return;
            }
            var timeout = setTimeout(function () {
                _this.dragStart(e);
                cancelDrag();
            }, this.gridster.$options.resizable.delayStart);
            var cancelMouse = this.gridsterItem.renderer.listen('document', 'mouseup', cancelDrag);
            var cancelTouchMove = this.gridsterItem.renderer.listen('document', 'touchmove', cancelMove);
            var cancelTouchEnd = this.gridsterItem.renderer.listen('document', 'touchend', cancelDrag);
            var cancelTouchCancel = this.gridsterItem.renderer.listen('document', 'touchcancel', cancelDrag);
            function cancelMove(eventMove) {
                gridster_utils_1.GridsterUtils.checkTouchEvent(eventMove);
                if (Math.abs(eventMove.clientX - e.clientX) > 9 || Math.abs(eventMove.clientY - e.clientY) > 9) {
                    cancelDrag();
                }
            }
            function cancelDrag() {
                clearTimeout(timeout);
                cancelMouse.dispose();
                cancelTouchMove.dispose();
                cancelTouchEnd.dispose();
                cancelTouchCancel.dispose();
            }
        };
        GridsterResizable = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [gridster_item_1.GridsterItemComponent, gridster_1.GridsterComponent])
        ], GridsterResizable);
        return GridsterResizable;
    }());
    exports.GridsterResizable = GridsterResizable;
});
