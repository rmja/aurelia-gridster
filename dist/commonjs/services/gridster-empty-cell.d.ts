import { Disposable } from 'aurelia-binding';
import { GridsterCustomElement } from '../gridster';
import { GridsterItem } from '../interfaces/gridster-item';
export declare class GridsterEmptyCell {
    private gridster;
    initialItem: GridsterItem;
    emptyCellClick: Disposable | null;
    emptyCellContextMenu: Disposable | null;
    emptyCellDrop: Disposable | null;
    emptyCellDrag: Disposable | null;
    emptyCellMMove: Disposable;
    emptyCellUp: Disposable;
    emptyCellMove: Disposable | null;
    constructor(gridster: GridsterCustomElement);
    updateOptions(): void;
    emptyCellClickCb(e: any): void;
    emptyCellContextMenuCb(e: any): void;
    emptyCellDragDrop(e: any): void;
    emptyCellDragOver(e: any): void;
    emptyCellMouseDown(e: any): void;
    emptyCellMouseMove(e: any): void;
    emptyCellMouseUp(e: any): void;
    getValidItemFromEvent(e: any, oldItem?: GridsterItem): GridsterItem | undefined;
}
