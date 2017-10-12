import { GridsterCustomElement } from '../gridster';
import { GridsterItemCustomElement } from '../gridster-item';
export declare class GridsterSwap {
    private swapedItem;
    private gridsterItem;
    private gridster;
    constructor(gridsterItem: GridsterItemCustomElement, gridster: GridsterCustomElement);
    swapItems(): void;
    checkSwapBack(): void;
    restoreSwapItem(): void;
    setSwapItem(): void;
    checkSwap(pushedBy: GridsterItemCustomElement): void;
}
