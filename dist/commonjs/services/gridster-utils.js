"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GridsterUtils = /** @class */ (function () {
    function GridsterUtils() {
    }
    GridsterUtils.merge = function (obj1, obj2, properties) {
        for (var p in obj2) {
            if (obj2.hasOwnProperty(p) && properties.hasOwnProperty(p)) {
                if (typeof obj2[p] === 'object') {
                    obj1[p] = GridsterUtils.merge(obj1[p], obj2[p], properties[p]);
                }
                else {
                    obj1[p] = obj2[p];
                }
            }
        }
        return obj1;
    };
    GridsterUtils.debounce = function (func, wait) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    GridsterUtils.checkTouchEvent = function (e) {
        if (e.clientX === undefined && e.touches) {
            e.clientX = e.touches[0].clientX;
            e.clientY = e.touches[0].clientY;
        }
    };
    GridsterUtils.checkContentClassForEvent = function (gridster, e) {
        if (gridster.$options.draggable.ignoreContent) {
            if (!GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.dragHandleClass)) {
                return true;
            }
        }
        else {
            if (GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.ignoreContentClass)) {
                return true;
            }
        }
        return false;
    };
    GridsterUtils.checkContentClass = function (target, current, contentClass) {
        if (target === current) {
            return false;
        }
        if (target.classList && target.classList.contains(contentClass)) {
            return true;
        }
        else {
            return GridsterUtils.checkContentClass(target.parentNode, current, contentClass);
        }
    };
    return GridsterUtils;
}());
exports.GridsterUtils = GridsterUtils;
