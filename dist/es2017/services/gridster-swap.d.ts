import { GridsterComponent } from '../gridster';
import { GridsterItemComponent } from '../gridster-item';
export declare class GridsterSwap {
    private swapedItem;
    private gridsterItem;
    private gridster;
    constructor(gridsterItem: GridsterItemComponent, gridster: GridsterComponent);
    swapItems(): void;
    checkSwapBack(): void;
    restoreSwapItem(): void;
    setSwapItem(): void;
    checkSwap(pushedBy: GridsterItemComponent): void;
}
