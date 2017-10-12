export class Renderer {
    listen(target, type, listener) {
        let eventTarget;
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
    addClass(element, name) {
        element.classList.add(name);
    }
    removeClass(element, name) {
        element.classList.remove(name);
    }
    setStyle(element, name, value) {
        element.style[name] = value;
    }
}
