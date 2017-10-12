define(["require", "exports", "aurelia-pal", "./gridster", "./gridster-item", "./gridster-grid"], function (require, exports, aurelia_pal_1, gridster_1, gridster_item_1, gridster_grid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./gridster'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./gridster-grid'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./gridster-item'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./gridster-preview'));
    }
    exports.configure = configure;
    exports.GridsterCustomElement = gridster_1.GridsterCustomElement;
    exports.GridsterItemCustomElement = gridster_item_1.GridsterItemCustomElement;
    exports.GridsterGridCustomElement = gridster_grid_1.GridsterGridCustomElement;
});
