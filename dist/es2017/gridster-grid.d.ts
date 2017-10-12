import { GridsterCustomElement } from './gridster';
import { Renderer } from './renderer';
export declare class GridsterGridCustomElement {
    private gridster;
    renderer: Renderer;
    el: HTMLElement;
    columns: number;
    rows: number;
    height: number;
    width: number;
    margin: number;
    columnsHeight: number;
    rowsWidth: number;
    constructor(gridster: GridsterCustomElement, renderer: Renderer);
    updateGrid(): void;
}
