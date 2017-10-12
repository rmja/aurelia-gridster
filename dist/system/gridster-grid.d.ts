import { GridsterComponent } from './gridster';
import { Renderer } from './renderer';
export declare class GridsterGridComponent {
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
    constructor(gridster: GridsterComponent, renderer: Renderer);
    updateGrid(): void;
}
