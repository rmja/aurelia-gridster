define(["require", "exports", "./gridster", "./gridster-item", "aurelia-framework"], function (require, exports, gridster_1, gridster_item_1, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GridsterComponent = gridster_1.GridsterComponent;
    exports.GridsterItemComponent = gridster_item_1.GridsterItemComponent;
    function configure(frameworkConfiguration) {
        frameworkConfiguration.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./gridster'),
            aurelia_framework_1.PLATFORM.moduleName('./gridster-grid'),
            aurelia_framework_1.PLATFORM.moduleName('./gridster-preview'),
            aurelia_framework_1.PLATFORM.moduleName('./gridster-item')
        ]);
    }
    exports.configure = configure;
});
