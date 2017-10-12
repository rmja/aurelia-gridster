System.register(["aurelia-framework"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, GridsterUtils;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            GridsterUtils = /** @class */ (function () {
                function GridsterUtils() {
                }
                GridsterUtils_1 = GridsterUtils;
                GridsterUtils.merge = function (obj1, obj2, properties) {
                    for (var p in obj2) {
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
                };
                GridsterUtils.checkContentClass = function (target, current, contentClass) {
                    if (target === current) {
                        return false;
                    }
                    if (target.classList && target.classList.contains(contentClass)) {
                        return true;
                    }
                    else {
                        return GridsterUtils_1.checkContentClass(target.parentNode, current, contentClass);
                    }
                };
                GridsterUtils = GridsterUtils_1 = __decorate([
                    aurelia_framework_1.autoinject
                ], GridsterUtils);
                return GridsterUtils;
                var GridsterUtils_1;
            }());
            exports_1("GridsterUtils", GridsterUtils);
        }
    };
});
