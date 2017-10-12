System.register(["aurelia-framework"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, GridsterGridComponent;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            GridsterGridComponent = /** @class */ (function () {
                function GridsterGridComponent(gridster, renderer) {
                    this.gridster = gridster;
                    this.renderer = renderer;
                    this.gridster.gridLines = this;
                    this.columns = 0;
                    this.rows = 0;
                    this.height = 0;
                    this.width = 0;
                    this.columnsHeight = 0;
                    this.rowsWidth = 0;
                }
                GridsterGridComponent.prototype.updateGrid = function () {
                    if (this.gridster.$options.displayGrid === 'always' && !this.gridster.mobile) {
                        this.renderer.setStyle(this.el, 'display', 'block');
                    }
                    else if (this.gridster.$options.displayGrid === 'onDrag&Resize' && this.gridster.dragInProgress) {
                        this.renderer.setStyle(this.el, 'display', 'block');
                    }
                    else if (this.gridster.$options.displayGrid === 'none' || !this.gridster.dragInProgress || this.gridster.mobile) {
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
                };
                GridsterGridComponent = __decorate([
                    aurelia_framework_1.autoinject,
                    aurelia_framework_1.customElement('gridster-grid')
                ], GridsterGridComponent);
                return GridsterGridComponent;
            }());
            exports_1("GridsterGridComponent", GridsterGridComponent);
        }
    };
});
