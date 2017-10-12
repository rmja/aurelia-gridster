var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "./gridster", "./services/gridster-draggable", "./services/gridster-resizable", "./services/gridster-utils", "./renderer", "aurelia-dependency-injection", "aurelia-templating"], function (require, exports, gridster_1, gridster_draggable_1, gridster_resizable_1, gridster_utils_1, renderer_1, aurelia_dependency_injection_1, aurelia_templating_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GridsterItemCustomElement = /** @class */ (function () {
        function GridsterItemCustomElement(gridster, renderer) {
            this.renderer = renderer;
            this.itemChange = function (_) { };
            this.itemResize = function (_) { };
            this.$item = {
                cols: -1,
                rows: -1,
                x: -1,
                y: -1,
            };
            this.gridster = gridster;
            this.drag = new gridster_draggable_1.GridsterDraggable(this, gridster);
            this.resize = new gridster_resizable_1.GridsterResizable(this, gridster);
        }
        GridsterItemCustomElement.prototype.attached = function () {
            this.updateOptions();
            this.gridster.addItem(this);
        };
        GridsterItemCustomElement.prototype.updateOptions = function () {
            this.$item = gridster_utils_1.GridsterUtils.merge(this.$item, this.item, {
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
        };
        GridsterItemCustomElement.prototype.detached = function () {
            this.gridster.removeItem(this);
        };
        GridsterItemCustomElement.prototype.setSize = function (noCheck) {
            if (this.gridster.mobile) {
                this.top = 0;
                this.left = 0;
                if (this.gridster.$options.keepFixedWidthInMobile) {
                    this.width = this.$item.cols * this.gridster.$options.fixedColWidth;
                }
                else {
                    this.width = this.gridster.curWidth - (this.gridster.$options.outerMargin ? 2 * this.gridster.$options.margin : 0);
                }
                if (this.gridster.$options.keepFixedHeightInMobile) {
                    this.height = this.$item.rows * this.gridster.$options.fixedRowHeight;
                }
                else {
                    this.height = this.width / 2;
                }
            }
            else {
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
            }
            else {
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
        };
        GridsterItemCustomElement.prototype.itemChanged = function () {
            this.itemChange(this.item);
            if (this.gridster.$options.itemChangeCallback) {
                this.gridster.$options.itemChangeCallback(this.item, this);
            }
        };
        GridsterItemCustomElement.prototype.checkItemChanges = function (newValue, oldValue) {
            if (newValue.rows === oldValue.rows && newValue.cols === oldValue.cols && newValue.x === oldValue.x && newValue.y === oldValue.y) {
                return;
            }
            if (this.gridster.checkCollision(this.$item)) {
                this.$item.x = oldValue.x || 0;
                this.$item.y = oldValue.y || 0;
                this.$item.cols = oldValue.cols || 1;
                this.$item.rows = oldValue.rows || 1;
            }
            else {
                this.item.cols = this.$item.cols;
                this.item.rows = this.$item.rows;
                this.item.x = this.$item.x;
                this.item.y = this.$item.y;
                this.gridster.calculateLayout();
                this.itemChanged();
            }
        };
        GridsterItemCustomElement.prototype.canBeDragged = function () {
            return !this.gridster.mobile &&
                (this.$item.dragEnabled === undefined ? this.gridster.$options.draggable.enabled : this.$item.dragEnabled);
        };
        GridsterItemCustomElement.prototype.canBeResized = function () {
            return !this.gridster.mobile &&
                (this.$item.resizeEnabled === undefined ? this.gridster.$options.resizable.enabled : this.$item.resizeEnabled);
        };
        __decorate([
            aurelia_templating_1.bindable,
            __metadata("design:type", Object)
        ], GridsterItemCustomElement.prototype, "item", void 0);
        __decorate([
            aurelia_templating_1.bindable,
            __metadata("design:type", Object)
        ], GridsterItemCustomElement.prototype, "itemChange", void 0);
        __decorate([
            aurelia_templating_1.bindable,
            __metadata("design:type", Object)
        ], GridsterItemCustomElement.prototype, "itemResize", void 0);
        GridsterItemCustomElement = __decorate([
            aurelia_dependency_injection_1.autoinject,
            __metadata("design:paramtypes", [gridster_1.GridsterCustomElement, renderer_1.Renderer])
        ], GridsterItemCustomElement);
        return GridsterItemCustomElement;
    }());
    exports.GridsterItemCustomElement = GridsterItemCustomElement;
});
