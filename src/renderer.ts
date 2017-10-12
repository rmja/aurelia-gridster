import { Disposable } from 'aurelia-binding';

export class Renderer {
  listen(target: 'document' | 'window' | EventTarget, type: string, listener: EventListenerOrEventListenerObject): Disposable {
    let eventTarget: EventTarget;

    if (target === 'document') {
      eventTarget = document;
    }
    else if (target === 'window') {
      eventTarget = window;
    }
    else {
      eventTarget = target;
    }

    eventTarget.addEventListener(type, listener);

    return {
      dispose: () => eventTarget.removeEventListener(type, listener)
    };
  }

  addClass(element: HTMLElement, name: string) {
    element.classList.add(name);
  }

  removeClass(element: HTMLElement, name: string) {
    element.classList.remove(name);
  }

  setStyle(element: HTMLElement, name: string, value: string) {
    element.style[name] = value;
  }
}
