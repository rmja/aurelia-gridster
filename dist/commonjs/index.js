"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_pal_1 = require("aurelia-pal");
function configure(config) {
    config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./gridster'));
    config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./gridster-grid'));
    config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./gridster-item'));
    config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./gridster-preview'));
}
exports.configure = configure;
var gridster_1 = require("./gridster");
exports.GridsterCustomElement = gridster_1.GridsterCustomElement;
var gridster_item_1 = require("./gridster-item");
exports.GridsterItemCustomElement = gridster_item_1.GridsterItemCustomElement;
var gridster_grid_1 = require("./gridster-grid");
exports.GridsterGridCustomElement = gridster_grid_1.GridsterGridCustomElement;
