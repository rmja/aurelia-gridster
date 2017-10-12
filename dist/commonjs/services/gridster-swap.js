"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gridster_1 = require("../gridster");
var gridster_item_1 = require("../gridster-item");
var aurelia_framework_1 = require("aurelia-framework");
var GridsterSwap = /** @class */ (function () {
    function GridsterSwap(gridsterItem, gridster) {
        this.gridsterItem = gridsterItem;
        this.gridster = gridster;
    }
    GridsterSwap.prototype.swapItems = function () {
        if (this.gridster.$options.swap) {
            this.checkSwapBack();
            this.checkSwap(this.gridsterItem);
        }
    };
    GridsterSwap.prototype.checkSwapBack = function () {
        if (this.swapedItem) {
            var x = this.swapedItem.$item.x;
            var y = this.swapedItem.$item.y;
            this.swapedItem.$item.x = this.swapedItem.item.x || 0;
            this.swapedItem.$item.y = this.swapedItem.item.y || 0;
            if (this.gridster.checkCollision(this.swapedItem.$item)) {
                this.swapedItem.$item.x = x;
                this.swapedItem.$item.y = y;
            }
            else {
                this.swapedItem.setSize(true);
                this.gridsterItem.$item.x = this.gridsterItem.item.x || 0;
                this.gridsterItem.$item.y = this.gridsterItem.item.y || 0;
                this.swapedItem = undefined;
            }
        }
    };
    GridsterSwap.prototype.restoreSwapItem = function () {
        if (this.swapedItem) {
            this.swapedItem.$item.x = this.swapedItem.item.x || 0;
            this.swapedItem.$item.y = this.swapedItem.item.y || 0;
            this.swapedItem.setSize(true);
            this.swapedItem = undefined;
        }
    };
    GridsterSwap.prototype.setSwapItem = function () {
        if (this.swapedItem) {
            this.swapedItem.checkItemChanges(this.swapedItem.$item, this.swapedItem.item);
            this.swapedItem = undefined;
        }
    };
    GridsterSwap.prototype.checkSwap = function (pushedBy) {
        var gridsterItemCollision = this.gridster.checkCollision(pushedBy.$item);
        if (gridsterItemCollision && gridsterItemCollision !== true && gridsterItemCollision.canBeDragged()) {
            var gridsterItemCollide = gridsterItemCollision;
            gridsterItemCollide.$item.x = pushedBy.item.x || 0;
            gridsterItemCollide.$item.y = pushedBy.item.y || 0;
            pushedBy.$item.x = gridsterItemCollide.item.x || 0;
            pushedBy.$item.y = gridsterItemCollide.item.y || 0;
            if (this.gridster.checkCollision(gridsterItemCollide.$item) || this.gridster.checkCollision(pushedBy.$item)) {
                pushedBy.$item.x = gridsterItemCollide.$item.x;
                pushedBy.$item.y = gridsterItemCollide.$item.y;
                gridsterItemCollide.$item.x = gridsterItemCollide.item.x || 0;
                gridsterItemCollide.$item.y = gridsterItemCollide.item.y || 0;
            }
            else {
                gridsterItemCollide.setSize(true);
                this.swapedItem = gridsterItemCollide;
            }
        }
    };
    GridsterSwap = __decorate([
        aurelia_framework_1.inject(gridster_item_1.GridsterItemComponent, gridster_1.GridsterComponent)
    ], GridsterSwap);
    return GridsterSwap;
}());
exports.GridsterSwap = GridsterSwap;
