import { GridsterComponent } from '../gridster';
import { GridsterItemComponent } from '../gridster-item';
export declare class GridsterCompact {
    private gridster;
    constructor(gridster: GridsterComponent);
    checkCompact(): void;
    checkCompactUp(): boolean;
    moveUpTillCollision(itemComponent: GridsterItemComponent): boolean;
    checkCompactLeft(): boolean;
    moveLeftTillCollision(itemComponent: GridsterItemComponent): boolean;
}
