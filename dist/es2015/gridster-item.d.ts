import { GridsterComponent } from './gridster';
import { GridsterDraggable } from './services/gridster-draggable';
import { GridsterItem } from './interfaces/gridster-item';
import { GridsterResizable } from './services/gridster-resizable';
import { Renderer } from './renderer';
export declare class GridsterItemComponent {
    renderer: Renderer;
    item: GridsterItem;
    itemChange: (_: GridsterItem) => void;
    itemResize: (_: GridsterItem) => void;
    $item: GridsterItem;
    el: HTMLElement;
    gridster: GridsterComponent;
    itemTop: number;
    itemLeft: number;
    itemWidth: number;
    itemHeight: number;
    top: number;
    left: number;
    width: number;
    height: number;
    itemMargin: number;
    drag: GridsterDraggable;
    resize: GridsterResizable;
    notPlaced: boolean;
    constructor(gridster: GridsterComponent, renderer: Renderer);
    attached(): void;
    updateOptions(): void;
    detached(): void;
    setSize(noCheck: Boolean): void;
    itemChanged(): void;
    checkItemChanges(newValue: GridsterItem, oldValue: GridsterItem): void;
    canBeDragged(): boolean;
    canBeResized(): boolean;
}