import { GridsterComponent } from '../gridster';
import { GridsterItemComponent } from '../gridster-item';
export declare class GridsterPushResize {
    private pushedItems;
    private pushedItemsPath;
    private gridsterItem;
    private gridster;
    private tryPattern;
    fromSouth: string;
    fromNorth: string;
    fromEast: string;
    fromWest: string;
    constructor(gridsterItem: GridsterItemComponent, gridster: GridsterComponent);
    pushItems(direction: any): void;
    restoreItems(): void;
    setPushedItems(): void;
    private push(gridsterItem, direction);
    private trySouth(gridsterItemCollide, gridsterItem, direction);
    private tryNorth(gridsterItemCollide, gridsterItem, direction);
    private tryEast(gridsterItemCollide, gridsterItem, direction);
    private tryWest(gridsterItemCollide, gridsterItem, direction);
    private addToPushed(gridsterItem);
    private removeFromPushed(i);
    checkPushBack(): void;
    private checkPushedItem(pushedItem, i);
}
