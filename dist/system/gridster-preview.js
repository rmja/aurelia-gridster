System.register(["./gridster", "./renderer", "aurelia-dependency-injection", "aurelia-templating"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var gridster_1, renderer_1, aurelia_dependency_injection_1, aurelia_templating_1, GridsterPreviewCustomElement;
    return {
        setters: [
            function (gridster_1_1) {
                gridster_1 = gridster_1_1;
            },
            function (renderer_1_1) {
                renderer_1 = renderer_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            }
        ],
        execute: function () {
            GridsterPreviewCustomElement = /** @class */ (function () {
                function GridsterPreviewCustomElement(gridster, renderer) {
                    this.gridster = gridster;
                    this.renderer = renderer;
                    this.gridster.previewStyle = this.previewStyle.bind(this);
                }
                GridsterPreviewCustomElement.prototype.previewStyle = function () {
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
                GridsterPreviewCustomElement = __decorate([
                    aurelia_dependency_injection_1.autoinject,
                    aurelia_templating_1.inlineView('<template ref="el" class="gridster-preview"></template>'),
                    __metadata("design:paramtypes", [gridster_1.GridsterCustomElement, renderer_1.Renderer])
                ], GridsterPreviewCustomElement);
                return GridsterPreviewCustomElement;
            }());
            exports_1("GridsterPreviewCustomElement", GridsterPreviewCustomElement);
        }
    };
});
