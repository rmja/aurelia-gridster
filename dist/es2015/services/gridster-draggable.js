var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { cancelScroll, scroll } from './gridster-scroll';
import { GridsterCustomElement } from '../gridster';
import { GridsterItemCustomElement } from '../gridster-item';
import { GridsterPush } from './gridster-push';
import { GridsterSwap } from './gridster-swap';
import { GridsterUtils } from './gridster-utils';
import { autoinject } from 'aurelia-dependency-injection';
let GridsterDraggable = class GridsterDraggable {
    constructor(gridsterItem, gridster) {
        this.gridsterItem = gridsterItem;
        this.gridster = gridster;
        this.lastMouse = {
            clientX: 0,
            clientY: 0
        };
        this.path = [];
    }
    dragStart(e) {
        switch (e.which) {
            case 1:
                // left mouse button
                break;
            case 2:
            case 3:
                // right or middle mouse button
                return;
        }
        if (this.gridster.$options.draggable.start) {
            this.gridster.$options.draggable.start(this.gridsterItem.item, this.gridsterItem, e);
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
        this.gridsterItem.renderer.addClass(this.gridsterItem.el, 'gridster-item-moving');
        this.margin = this.gridster.$options.margin;
        this.offsetLeft = this.gridster.el.scrollLeft - this.gridster.el.offsetLeft;
        this.offsetTop = this.gridster.el.scrollTop - this.gridster.el.offsetTop;
        this.left = this.gridsterItem.left;
        this.top = this.gridsterItem.top;
        this.width = this.gridsterItem.width;
        this.height = this.gridsterItem.height;
        this.diffLeft = e.clientX + this.offsetLeft - this.margin - this.left;
        this.diffTop = e.clientY + this.offsetTop - this.margin - this.top;
        this.gridster.movingItem = this.gridsterItem.$item;
        this.gridster.previewStyle();
        this.push = new GridsterPush(this.gridsterItem, this.gridster);
        this.swap = new GridsterSwap(this.gridsterItem, this.gridster);
        this.gridster.dragInProgress = true;
        this.gridster.gridLines.updateGrid();
        this.path.push({ x: this.gridsterItem.item.x || 0, y: this.gridsterItem.item.y || 0 });
    }
    dragMove(e) {
        e.stopPropagation();
        e.preventDefault();
        GridsterUtils.checkTouchEvent(e);
        this.offsetLeft = this.gridster.el.scrollLeft - this.gridster.el.offsetLeft;
        this.offsetTop = this.gridster.el.scrollTop - this.gridster.el.offsetTop;
        scroll(this.gridsterItem, e, this.lastMouse, this.calculateItemPositionFromMousePosition.bind(this));
        this.calculateItemPositionFromMousePosition(e);
        this.lastMouse.clientX = e.clientX;
        this.lastMouse.clientY = e.clientY;
        this.gridster.gridLines.updateGrid();
    }
    calculateItemPositionFromMousePosition(e) {
        this.left = e.clientX + this.offsetLeft - this.margin - this.diffLeft;
        this.top = e.clientY + this.offsetTop - this.margin - this.diffTop;
        this.calculateItemPosition();
    }
    dragStop(e) {
        e.stopPropagation();
        e.preventDefault();
        cancelScroll();
        this.mousemove.dispose();
        this.mouseup.dispose();
        this.touchmove.dispose();
        this.touchend.dispose();
        this.touchcancel.dispose();
        this.gridsterItem.renderer.removeClass(this.gridsterItem.el, 'gridster-item-moving');
        this.gridster.dragInProgress = false;
        this.gridster.gridLines.updateGrid();
        this.path = [];
        if (this.gridster.$options.draggable.stop) {
            Promise.resolve(this.gridster.$options.draggable.stop(this.gridsterItem.item, this.gridsterItem, e))
                .then(this.makeDrag.bind(this), this.cancelDrag.bind(this));
        }
        else {
            this.makeDrag();
        }
        setTimeout(function () {
            this.gridster.movingItem = null;
            this.gridster.previewStyle();
        }.bind(this));
    }
    cancelDrag() {
        this.gridsterItem.$item.x = this.gridsterItem.item.x || 0;
        this.gridsterItem.$item.y = this.gridsterItem.item.y || 0;
        this.gridsterItem.setSize(true);
        this.push.restoreItems();
        this.swap.restoreSwapItem();
    }
    makeDrag() {
        this.gridsterItem.setSize(true);
        this.gridsterItem.checkItemChanges(this.gridsterItem.$item, this.gridsterItem.item);
        this.push.setPushedItems();
        this.swap.setSwapItem();
    }
    calculateItemPosition() {
        this.positionX = this.gridster.pixelsToPositionX(this.left, Math.round);
        this.positionY = this.gridster.pixelsToPositionY(this.top, Math.round);
        this.positionXBackup = this.gridsterItem.$item.x;
        this.positionYBackup = this.gridsterItem.$item.y;
        this.gridsterItem.$item.x = this.positionX;
        if (this.gridster.checkGridCollision(this.gridsterItem.$item)) {
            this.gridsterItem.$item.x = this.positionXBackup;
        }
        else {
            this.gridsterItem.renderer.setStyle(this.gridsterItem.el, 'left', this.left + 'px');
        }
        this.gridsterItem.$item.y = this.positionY;
        if (this.gridster.checkGridCollision(this.gridsterItem.$item)) {
            this.gridsterItem.$item.y = this.positionYBackup;
        }
        else {
            this.gridsterItem.renderer.setStyle(this.gridsterItem.el, 'top', this.top + 'px');
        }
        if (this.positionXBackup !== this.gridsterItem.$item.x || this.positionYBackup !== this.gridsterItem.$item.y) {
            const lastPosition = this.path[this.path.length - 1];
            let direction;
            if (lastPosition.x < this.gridsterItem.$item.x) {
                direction = this.push.fromWest;
            }
            else if (lastPosition.x > this.gridsterItem.$item.x) {
                direction = this.push.fromEast;
            }
            else if (lastPosition.y < this.gridsterItem.$item.y) {
                direction = this.push.fromNorth;
            }
            else if (lastPosition.y > this.gridsterItem.$item.y) {
                direction = this.push.fromSouth;
            }
            this.push.pushItems(direction, this.gridster.$options.disablePushOnDrag);
            this.swap.swapItems();
            if (this.gridster.checkCollision(this.gridsterItem.$item)) {
                this.gridsterItem.$item.x = this.positionXBackup;
                this.gridsterItem.$item.y = this.positionYBackup;
            }
            else {
                this.path.push({ x: this.gridsterItem.$item.x, y: this.gridsterItem.$item.y });
                this.gridster.previewStyle();
            }
            this.push.checkPushBack();
        }
    }
    toggle() {
        const enableDrag = this.gridsterItem.canBeDragged();
        if (!this.enabled && enableDrag) {
            this.enabled = !this.enabled;
            this.dragStartFunction = this.dragStartDelay.bind(this);
            this.mousedown = this.gridsterItem.renderer.listen(this.gridsterItem.el, 'mousedown', this.dragStartFunction);
            this.touchstart = this.gridsterItem.renderer.listen(this.gridsterItem.el, 'touchstart', this.dragStartFunction);
        }
        else if (this.enabled && !enableDrag) {
            this.enabled = !this.enabled;
            this.mousedown.dispose();
            this.touchstart.dispose();
        }
    }
    dragStartDelay(e) {
        if (e.target.classList.contains('gridster-item-resizable-handler')) {
            return;
        }
        if (GridsterUtils.checkContentClassForEvent(this.gridster, e)) {
            return;
        }
        GridsterUtils.checkTouchEvent(e);
        if (!this.gridster.$options.draggable.delayStart) {
            this.dragStart(e);
            return;
        }
        const timeout = setTimeout(() => {
            this.dragStart(e);
            cancelDrag();
        }, this.gridster.$options.draggable.delayStart);
        const cancelMouse = this.gridsterItem.renderer.listen('document', 'mouseup', cancelDrag);
        const cancelTouchMove = this.gridsterItem.renderer.listen('document', 'touchmove', cancelMove);
        const cancelTouchEnd = this.gridsterItem.renderer.listen('document', 'touchend', cancelDrag);
        const cancelTouchCancel = this.gridsterItem.renderer.listen('document', 'touchcancel', cancelDrag);
        function cancelMove(eventMove) {
            GridsterUtils.checkTouchEvent(eventMove);
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
    }
};
GridsterDraggable = __decorate([
    autoinject,
    __metadata("design:paramtypes", [GridsterItemCustomElement, GridsterCustomElement])
], GridsterDraggable);
export { GridsterDraggable };
