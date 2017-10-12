System.register(["../gridster", "../gridster-item", "aurelia-framework"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var gridster_1, gridster_item_1, aurelia_framework_1, GridsterPushResize;
    return {
        setters: [
            function (gridster_1_1) {
                gridster_1 = gridster_1_1;
            },
            function (gridster_item_1_1) {
                gridster_item_1 = gridster_item_1_1;
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            GridsterPushResize = /** @class */ (function () {
                function GridsterPushResize(gridsterItem, gridster) {
                    this.pushedItems = [];
                    this.pushedItemsPath = [];
                    this.gridsterItem = gridsterItem;
                    this.gridster = gridster;
                    this.tryPattern = {
                        fromEast: this.tryWest,
                        fromWest: this.tryEast,
                        fromNorth: this.trySouth,
                        fromSouth: this.tryNorth
                    };
                    this.fromSouth = 'fromSouth';
                    this.fromNorth = 'fromNorth';
                    this.fromEast = 'fromEast';
                    this.fromWest = 'fromWest';
                }
                GridsterPushResize.prototype.pushItems = function (direction) {
                    if (this.gridster.$options.pushResizeItems) {
                        this.push(this.gridsterItem, direction);
                    }
                };
                GridsterPushResize.prototype.restoreItems = function () {
                    var i = 0;
                    var l = this.pushedItems.length;
                    var pushedItem;
                    for (; i < l; i++) {
                        pushedItem = this.pushedItems[i];
                        pushedItem.$item.x = pushedItem.item.x || 0;
                        pushedItem.$item.y = pushedItem.item.y || 0;
                        pushedItem.$item.cols = pushedItem.item.cols || 1;
                        pushedItem.$item.row = pushedItem.item.row || 1;
                        pushedItem.setSize(true);
                    }
                    this.pushedItems = [];
                    this.pushedItemsPath = [];
                };
                GridsterPushResize.prototype.setPushedItems = function () {
                    var i = 0;
                    var l = this.pushedItems.length;
                    var pushedItem;
                    for (; i < l; i++) {
                        pushedItem = this.pushedItems[i];
                        pushedItem.checkItemChanges(pushedItem.$item, pushedItem.item);
                    }
                    this.pushedItems = [];
                    this.pushedItemsPath = [];
                };
                GridsterPushResize.prototype.push = function (gridsterItem, direction) {
                    var gridsterItemCollision = this.gridster.checkCollision(gridsterItem.$item);
                    if (gridsterItemCollision && gridsterItemCollision !== true &&
                        gridsterItemCollision !== this.gridsterItem && gridsterItemCollision.canBeResized()) {
                        if (this.tryPattern[direction].call(this, gridsterItemCollision, gridsterItem, direction)) {
                            return true;
                        }
                    }
                    else if (gridsterItemCollision === false) {
                        return true;
                    }
                    return false;
                };
                GridsterPushResize.prototype.trySouth = function (gridsterItemCollide, gridsterItem, direction) {
                    var backUpY = gridsterItemCollide.$item.y;
                    var backUpRows = gridsterItemCollide.$item.rows;
                    gridsterItemCollide.$item.y = gridsterItem.$item.y + gridsterItem.$item.rows;
                    gridsterItemCollide.$item.rows = backUpRows + backUpY - gridsterItemCollide.$item.y;
                    if (!gridster_1.GridsterComponent.checkCollisionTwoItems(gridsterItemCollide.$item, gridsterItem.$item)
                        && !this.gridster.checkGridCollision(gridsterItemCollide.$item)) {
                        gridsterItemCollide.setSize(true);
                        this.addToPushed(gridsterItemCollide);
                        this.push(gridsterItem, direction);
                        return true;
                    }
                    else {
                        gridsterItemCollide.$item.y = backUpY;
                        gridsterItemCollide.$item.rows = backUpRows;
                    }
                    return false;
                };
                GridsterPushResize.prototype.tryNorth = function (gridsterItemCollide, gridsterItem, direction) {
                    var backUpRows = gridsterItemCollide.$item.rows;
                    gridsterItemCollide.$item.rows = gridsterItem.$item.y - gridsterItemCollide.$item.y;
                    if (!gridster_1.GridsterComponent.checkCollisionTwoItems(gridsterItemCollide.$item, gridsterItem.$item)
                        && !this.gridster.checkGridCollision(gridsterItemCollide.$item)) {
                        gridsterItemCollide.setSize(true);
                        this.addToPushed(gridsterItemCollide);
                        this.push(gridsterItem, direction);
                        return true;
                    }
                    else {
                        gridsterItemCollide.$item.rows = backUpRows;
                    }
                    return false;
                };
                GridsterPushResize.prototype.tryEast = function (gridsterItemCollide, gridsterItem, direction) {
                    var backUpX = gridsterItemCollide.$item.x;
                    var backUpCols = gridsterItemCollide.$item.cols;
                    gridsterItemCollide.$item.x = gridsterItem.$item.x + gridsterItem.$item.cols;
                    gridsterItemCollide.$item.cols = backUpCols + backUpX - gridsterItemCollide.$item.x;
                    if (!gridster_1.GridsterComponent.checkCollisionTwoItems(gridsterItemCollide.$item, gridsterItem.$item)
                        && !this.gridster.checkGridCollision(gridsterItemCollide.$item)) {
                        gridsterItemCollide.setSize(true);
                        this.addToPushed(gridsterItemCollide);
                        this.push(gridsterItem, direction);
                        return true;
                    }
                    else {
                        gridsterItemCollide.$item.x = backUpX;
                        gridsterItemCollide.$item.cols = backUpCols;
                    }
                    return false;
                };
                GridsterPushResize.prototype.tryWest = function (gridsterItemCollide, gridsterItem, direction) {
                    var backUpCols = gridsterItemCollide.$item.cols;
                    gridsterItemCollide.$item.cols = gridsterItem.$item.x - gridsterItemCollide.$item.x;
                    if (!gridster_1.GridsterComponent.checkCollisionTwoItems(gridsterItemCollide.$item, gridsterItem.$item)
                        && !this.gridster.checkGridCollision(gridsterItemCollide.$item)) {
                        gridsterItemCollide.setSize(true);
                        this.addToPushed(gridsterItemCollide);
                        this.push(gridsterItem, direction);
                        return true;
                    }
                    else {
                        gridsterItemCollide.$item.cols = backUpCols;
                    }
                    return false;
                };
                GridsterPushResize.prototype.addToPushed = function (gridsterItem) {
                    if (this.pushedItems.indexOf(gridsterItem) < 0) {
                        this.pushedItems.push(gridsterItem);
                        this.pushedItemsPath.push([
                            {
                                x: gridsterItem.item.x,
                                y: gridsterItem.item.y,
                                cols: gridsterItem.item.cols,
                                rows: gridsterItem.item.rows
                            },
                            {
                                x: gridsterItem.$item.x,
                                y: gridsterItem.$item.y,
                                cols: gridsterItem.$item.cols,
                                rows: gridsterItem.$item.rows
                            }
                        ]);
                    }
                    else {
                        var i = this.pushedItems.indexOf(gridsterItem);
                        this.pushedItemsPath[i].push({
                            x: gridsterItem.$item.x,
                            y: gridsterItem.$item.y,
                            cols: gridsterItem.$item.cols,
                            rows: gridsterItem.$item.rows
                        });
                    }
                };
                GridsterPushResize.prototype.removeFromPushed = function (i) {
                    if (i > -1) {
                        this.pushedItems.splice(i, 1);
                        this.pushedItemsPath.splice(i, 1);
                    }
                };
                GridsterPushResize.prototype.checkPushBack = function () {
                    var i = this.pushedItems.length - 1;
                    var change = false;
                    for (; i > -1; i--) {
                        if (this.checkPushedItem(this.pushedItems[i], i)) {
                            change = true;
                        }
                    }
                    if (change) {
                        this.checkPushBack();
                    }
                };
                GridsterPushResize.prototype.checkPushedItem = function (pushedItem, i) {
                    var path = this.pushedItemsPath[i];
                    var j = path.length - 2;
                    var lastPosition, x, y, cols, rows;
                    for (; j > -1; j--) {
                        lastPosition = path[j];
                        x = pushedItem.$item.x;
                        y = pushedItem.$item.y;
                        cols = pushedItem.$item.cols;
                        rows = pushedItem.$item.rows;
                        pushedItem.$item.x = lastPosition.x;
                        pushedItem.$item.y = lastPosition.y;
                        pushedItem.$item.cols = lastPosition.cols;
                        pushedItem.$item.rows = lastPosition.rows;
                        if (!this.gridster.findItemWithItem(pushedItem.$item)) {
                            pushedItem.setSize(true);
                            path.splice(j + 1, path.length - 1 - j);
                        }
                        else {
                            pushedItem.$item.x = x;
                            pushedItem.$item.y = y;
                            pushedItem.$item.cols = cols;
                            pushedItem.$item.rows = rows;
                        }
                    }
                    if (path.length < 2) {
                        this.removeFromPushed(i);
                        return true;
                    }
                    return false;
                };
                GridsterPushResize = __decorate([
                    aurelia_framework_1.inject(gridster_item_1.GridsterItemComponent, gridster_1.GridsterComponent)
                ], GridsterPushResize);
                return GridsterPushResize;
            }());
            exports_1("GridsterPushResize", GridsterPushResize);
        }
    };
});
