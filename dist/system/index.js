System.register(["aurelia-pal", "./gridster", "./gridster-item", "./gridster-grid"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./gridster'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./gridster-grid'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./gridster-item'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./gridster-preview'));
    }
    exports_1("configure", configure);
    var aurelia_pal_1;
    return {
        setters: [
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            },
            function (gridster_1_1) {
                exports_1({
                    "GridsterCustomElement": gridster_1_1["GridsterCustomElement"]
                });
            },
            function (gridster_item_1_1) {
                exports_1({
                    "GridsterItemCustomElement": gridster_item_1_1["GridsterItemCustomElement"]
                });
            },
            function (gridster_grid_1_1) {
                exports_1({
                    "GridsterGridCustomElement": gridster_grid_1_1["GridsterGridCustomElement"]
                });
            }
        ],
        execute: function () {
        }
    };
});
