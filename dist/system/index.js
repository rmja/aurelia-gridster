System.register(["./gridster", "./gridster-item", "aurelia-framework"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(frameworkConfiguration) {
        frameworkConfiguration.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./gridster'),
            aurelia_framework_1.PLATFORM.moduleName('./gridster-grid'),
            aurelia_framework_1.PLATFORM.moduleName('./gridster-preview'),
            aurelia_framework_1.PLATFORM.moduleName('./gridster-item')
        ]);
    }
    exports_1("configure", configure);
    var aurelia_framework_1;
    return {
        setters: [
            function (gridster_1_1) {
                exports_1({
                    "GridsterComponent": gridster_1_1["GridsterComponent"]
                });
            },
            function (gridster_item_1_1) {
                exports_1({
                    "GridsterItemComponent": gridster_item_1_1["GridsterItemComponent"]
                });
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
        }
    };
});
