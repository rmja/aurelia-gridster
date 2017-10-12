import { GridsterCustomElement } from '../gridster';
import { GridsterItemCustomElement } from '../gridster-item';
export declare class GridsterCompact {
    private gridster;
    constructor(gridster: GridsterCustomElement);
    checkCompact(): void;
    checkCompactUp(): boolean;
    moveUpTillCollision(itemComponent: GridsterItemCustomElement): boolean;
    checkCompactLeft(): boolean;
    moveLeftTillCollision(itemComponent: GridsterItemCustomElement): boolean;
}
