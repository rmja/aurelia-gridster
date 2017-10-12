"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var gridster_1 = require("./gridster");
var renderer_1 = require("./renderer");
var GridsterPreviewComponent = /** @class */ (function () {
    function GridsterPreviewComponent(gridster, renderer) {
        this.gridster = gridster;
        this.renderer = renderer;
        this.gridster.previewStyle = this.previewStyle.bind(this);
    }
    GridsterPreviewComponent.prototype.previewStyle = function () {
        if (!this.gridster.movingItem) {
            this.renderer.setStyle(this.el, 'display', 'none');
        }
        else {
            var margin = 0;
            var curRowHeight = this.gridster.curRowHeight;
            var curColWidth = this.gridster.curColWidth;
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
    };
    GridsterPreviewComponent = __decorate([
        aurelia_framework_1.autoinject,
        aurelia_framework_1.customElement('gridster-preview'),
        aurelia_framework_1.inlineView('<template ref="el" class="gridster-preview"></template>'),
        __metadata("design:paramtypes", [gridster_1.GridsterComponent, renderer_1.Renderer])
    ], GridsterPreviewComponent);
    return GridsterPreviewComponent;
}());
exports.GridsterPreviewComponent = GridsterPreviewComponent;
