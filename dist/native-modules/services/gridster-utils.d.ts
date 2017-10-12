import { GridsterComponent } from '../gridster';
export declare class GridsterUtils {
    static merge(obj1: any, obj2: any, properties: any): any;
    static debounce(func: Function, wait: number): () => void;
    static checkTouchEvent(e: any): void;
    static checkContentClassForEvent(gridster: GridsterComponent, e: any): boolean;
    static checkContentClass(target: any, current: any, contentClass: any): boolean;
}
