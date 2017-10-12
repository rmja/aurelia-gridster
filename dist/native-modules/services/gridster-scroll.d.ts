import { GridsterItemCustomElement } from '../gridster-item';
import { GridsterResizeEventType } from '../interfaces/gridster-resize-event-type';
export declare function scroll(gridsterItem: GridsterItemCustomElement, e: MouseEvent, lastMouse: any, calculateItemPosition: Function, resize?: boolean, resizeEventScrollType?: GridsterResizeEventType): void;
export declare function cancelScroll(): void;
