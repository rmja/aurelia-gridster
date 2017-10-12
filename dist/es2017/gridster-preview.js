var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, inject, inlineView } from 'aurelia-framework';
import { GridsterComponent } from './gridster';
import { Renderer } from './renderer';
let GridsterPreviewComponent = class GridsterPreviewComponent {
    constructor(gridster, renderer) {
        this.gridster = gridster;
        this.renderer = renderer;
        this.gridster.previewStyle = this.previewStyle.bind(this);
    }
    previewStyle() {
        if (!this.gridster.movingItem) {
            this.renderer.setStyle(this.el, 'display', 'none');
        }
        else {
            let margin = 0;
            const curRowHeight = this.gridster.curRowHeight;
            const curColWidth = this.gridster.curColWidth;
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
    }
};
GridsterPreviewComponent = __decorate([
    inject(GridsterComponent, Renderer),
    customElement('gridster-preview'),
    inlineView('<template ref="el" class="gridster-preview"></template>')
], GridsterPreviewComponent);
export { GridsterPreviewComponent };
