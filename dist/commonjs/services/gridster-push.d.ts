import { GridsterCustomElement } from '../gridster';
import { GridsterItemCustomElement } from '../gridster-item';
export declare class GridsterPush {
    private pushedItems;
    private pushedItemsTemp;
    private pushedItemsTempInit;
    private count;
    private pushedItemsPath;
    private gridsterItem;
    private gridster;
    private tryPattern;
    fromSouth: string;
    fromNorth: string;
    fromEast: string;
    fromWest: string;
    constructor(gridsterItem: GridsterItemCustomElement, gridster: GridsterCustomElement);
    pushItems(direction: string, disable: boolean): void;
    restoreItems(): void;
    setPushedItems(): void;
    private push(gridsterItem, direction);
    private trySouth(gridsterItemCollide, gridsterItem);
    private tryNorth(gridsterItemCollide, gridsterItem);
    private tryEast(gridsterItemCollide, gridsterItem);
    private tryWest(gridsterItemCollide, gridsterItem);
    private addToTempPushed(gridsterItem);
    private removeFromTempPushed(gridsterItem);
    private checkInTempPushed(gridsterItem);
    private addToPushed(gridsterItem);
    private removeFromPushed(i);
    checkPushBack(): void;
    private checkPushedItem(pushedItem, i);
}
