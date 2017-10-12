import { Disposable } from 'aurelia-binding';
export declare class Renderer {
    listen(target: 'document' | 'window' | EventTarget, type: string, listener: EventListenerOrEventListenerObject): Disposable;
    addClass(element: HTMLElement, name: string): void;
    removeClass(element: HTMLElement, name: string): void;
    setStyle(element: HTMLElement, name: string, value: string): void;
}
