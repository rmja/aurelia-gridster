define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Renderer = /** @class */ (function () {
        function Renderer() {
        }
        Renderer.prototype.listen = function (target, type, listener) {
            var eventTarget;
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
                dispose: function () { return eventTarget.removeEventListener(type, listener); }
            };
        };
        Renderer.prototype.addClass = function (element, name) {
            element.classList.add(name);
        };
        Renderer.prototype.removeClass = function (element, name) {
            element.classList.remove(name);
        };
        Renderer.prototype.setStyle = function (element, name, value) {
            element.style[name] = value;
        };
        return Renderer;
    }());
    exports.Renderer = Renderer;
});
