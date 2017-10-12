import { GridsterCustomElement } from './gridster';
import { Renderer } from './renderer';
export declare class GridsterPreviewCustomElement {
    private gridster;
    renderer: Renderer;
    el: HTMLElement;
    constructor(gridster: GridsterCustomElement, renderer: Renderer);
    previewStyle(): void;
}
