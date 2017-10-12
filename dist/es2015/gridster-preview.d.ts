import { GridsterComponent } from './gridster';
import { Renderer } from './renderer';
export declare class GridsterPreviewComponent {
    private gridster;
    renderer: Renderer;
    el: HTMLElement;
    constructor(gridster: GridsterComponent, renderer: Renderer);
    previewStyle(): void;
}
