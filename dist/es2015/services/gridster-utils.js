var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autoinject } from 'aurelia-framework';
let GridsterUtils = GridsterUtils_1 = class GridsterUtils {
    static merge(obj1, obj2, properties) {
        for (const p in obj2) {
            if (obj2.hasOwnProperty(p) && properties.hasOwnProperty(p)) {
                if (typeof obj2[p] === 'object') {
                    obj1[p] = GridsterUtils_1.merge(obj1[p], obj2[p], properties[p]);
                }
                else {
                    obj1[p] = obj2[p];
                }
            }
        }
        return obj1;
    }
    static debounce(func, wait) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            const later = function () {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    static checkTouchEvent(e) {
        if (e.clientX === undefined && e.touches) {
            e.clientX = e.touches[0].clientX;
            e.clientY = e.touches[0].clientY;
        }
    }
    static checkContentClassForEvent(gridster, e) {
        if (gridster.$options.draggable.ignoreContent) {
            if (!GridsterUtils_1.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.dragHandleClass)) {
                return true;
            }
        }
        else {
            if (GridsterUtils_1.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.ignoreContentClass)) {
                return true;
            }
        }
        return false;
    }
    static checkContentClass(target, current, contentClass) {
        if (target === current) {
            return false;
        }
        if (target.classList && target.classList.contains(contentClass)) {
            return true;
        }
        else {
            return GridsterUtils_1.checkContentClass(target.parentNode, current, contentClass);
        }
    }
};
GridsterUtils = GridsterUtils_1 = __decorate([
    autoinject
], GridsterUtils);
export { GridsterUtils };
var GridsterUtils_1;
