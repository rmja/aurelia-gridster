"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gridster_1 = require("./gridster");
exports.GridsterComponent = gridster_1.GridsterComponent;
var gridster_item_1 = require("./gridster-item");
exports.GridsterItemComponent = gridster_item_1.GridsterItemComponent;
var aurelia_framework_1 = require("aurelia-framework");
function configure(frameworkConfiguration) {
    frameworkConfiguration.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./gridster'),
        aurelia_framework_1.PLATFORM.moduleName('./gridster-grid'),
        aurelia_framework_1.PLATFORM.moduleName('./gridster-preview'),
        aurelia_framework_1.PLATFORM.moduleName('./gridster-item')
    ]);
}
exports.configure = configure;
