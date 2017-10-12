var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { GridsterComponent } from '../gridster';
import { GridsterItemComponent } from '../gridster-item';
import { inject } from 'aurelia-framework';
var GridsterPush = /** @class */ (function () {
    function GridsterPush(gridsterItem, gridster) {
        this.pushedItems = [];
        this.pushedItemsTemp = [];
        this.pushedItemsTempInit = [];
        this.pushedItemsPath = [];
        this.gridsterItem = gridsterItem;
        this.gridster = gridster;
        this.tryPattern = {
            fromEast: [this.tryWest, this.trySouth, this.tryNorth, this.tryEast],
            fromWest: [this.tryEast, this.trySouth, this.tryNorth, this.tryWest],
            fromNorth: [this.trySouth, this.tryEast, this.tryWest, this.tryNorth],
            fromSouth: [this.tryNorth, this.tryEast, this.tryWest, this.trySouth]
        };
        this.fromSouth = 'fromSouth';
        this.fromNorth = 'fromNorth';
        this.fromEast = 'fromEast';
        this.fromWest = 'fromWest';
    }
    GridsterPush.prototype.pushItems = function (direction, disable) {
        if (this.gridster.$options.pushItems && !disable) {
            this.count = 0;
            if (!this.push(this.gridsterItem, direction)) {
                var i = this.pushedItemsTemp.length - 1;
                for (; i > -1; i--) {
                    this.removeFromTempPushed(this.pushedItemsTemp[i]);
                }
            }
            this.pushedItemsTemp = [];
        }
    };
    GridsterPush.prototype.restoreItems = function () {
        var i = 0;
        var l = this.pushedItems.length;
        var pushedItem;
        for (; i < l; i++) {
            pushedItem = this.pushedItems[i];
            pushedItem.$item.x = pushedItem.item.x || 0;
            pushedItem.$item.y = pushedItem.item.y || 0;
            pushedItem.setSize(true);
        }
        this.pushedItems = [];
        this.pushedItemsPath = [];
    };
    GridsterPush.prototype.setPushedItems = function () {
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
    GridsterPush.prototype.push = function (gridsterItem, direction) {
        if (this.count > 3000) {
            return false;
        }
        else {
            this.count++;
        }
        if (this.gridster.checkGridCollision(gridsterItem.$item)) {
            return false;
        }
        var a = this.gridster.findItemsWithItem(gridsterItem.$item);
        var i = a.length - 1, itemColision;
        var makePush = true;
        for (; i > -1; i--) {
            itemColision = a[i];
            if (itemColision === this.gridsterItem) {
                makePush = false;
                break;
            }
            if (!itemColision.canBeDragged()) {
                makePush = false;
                break;
            }
            if (this.tryPattern[direction][0].call(this, itemColision, gridsterItem)) {
            }
            else if (this.tryPattern[direction][1].call(this, itemColision, gridsterItem)) {
            }
            else if (this.tryPattern[direction][2].call(this, itemColision, gridsterItem)) {
            }
            else if (this.tryPattern[direction][3].call(this, itemColision, gridsterItem)) {
            }
            else {
                makePush = false;
                break;
            }
        }
        return makePush;
    };
    GridsterPush.prototype.trySouth = function (gridsterItemCollide, gridsterItem) {
        if (!this.gridster.$options.pushDirections.south) {
            return false;
        }
        this.addToTempPushed(gridsterItemCollide);
        var backUpY = gridsterItemCollide.$item.y;
        gridsterItemCollide.$item.y = gridsterItem.$item.y + gridsterItem.$item.rows;
        if (this.push(gridsterItemCollide, this.fromNorth)) {
            gridsterItemCollide.setSize(true);
            this.addToPushed(gridsterItemCollide);
            return true;
        }
        else {
            gridsterItemCollide.$item.y = backUpY;
        }
        return false;
    };
    GridsterPush.prototype.tryNorth = function (gridsterItemCollide, gridsterItem) {
        if (!this.gridster.$options.pushDirections.north) {
            return false;
        }
        this.addToTempPushed(gridsterItemCollide);
        var backUpY = gridsterItemCollide.$item.y;
        gridsterItemCollide.$item.y = gridsterItem.$item.y - gridsterItemCollide.$item.rows;
        if (this.push(gridsterItemCollide, this.fromSouth)) {
            gridsterItemCollide.setSize(true);
            this.addToPushed(gridsterItemCollide);
            return true;
        }
        else {
            gridsterItemCollide.$item.y = backUpY;
        }
        return false;
    };
    GridsterPush.prototype.tryEast = function (gridsterItemCollide, gridsterItem) {
        if (!this.gridster.$options.pushDirections.east) {
            return false;
        }
        this.addToTempPushed(gridsterItemCollide);
        var backUpX = gridsterItemCollide.$item.x;
        gridsterItemCollide.$item.x = gridsterItem.$item.x + gridsterItem.$item.cols;
        if (this.push(gridsterItemCollide, this.fromWest)) {
            gridsterItemCollide.setSize(true);
            this.addToPushed(gridsterItemCollide);
            return true;
        }
        else {
            gridsterItemCollide.$item.x = backUpX;
        }
        return false;
    };
    GridsterPush.prototype.tryWest = function (gridsterItemCollide, gridsterItem) {
        if (!this.gridster.$options.pushDirections.west) {
            return false;
        }
        this.addToTempPushed(gridsterItemCollide);
        var backUpX = gridsterItemCollide.$item.x;
        gridsterItemCollide.$item.x = gridsterItem.$item.x - gridsterItemCollide.$item.cols;
        if (this.push(gridsterItemCollide, this.fromEast)) {
            gridsterItemCollide.setSize(true);
            this.addToPushed(gridsterItemCollide);
            return true;
        }
        else {
            gridsterItemCollide.$item.x = backUpX;
        }
        return false;
    };
    GridsterPush.prototype.addToTempPushed = function (gridsterItem) {
        if (this.checkInTempPushed(gridsterItem)) {
            return;
        }
        var l = this.pushedItemsTemp.push(gridsterItem);
        this.pushedItemsTempInit[l - 1] = { x: gridsterItem.$item.x, y: gridsterItem.$item.y };
    };
    GridsterPush.prototype.removeFromTempPushed = function (gridsterItem) {
        var i = this.pushedItemsTemp.indexOf(gridsterItem);
        this.pushedItemsTemp.splice(i, 1);
        var initPosition = this.pushedItemsTempInit[i];
        gridsterItem.$item.x = initPosition.x;
        gridsterItem.$item.y = initPosition.y;
        gridsterItem.setSize(true);
        this.pushedItemsTempInit.splice(i, 1);
    };
    GridsterPush.prototype.checkInTempPushed = function (gridsterItem) {
        return this.pushedItemsTemp.indexOf(gridsterItem) > -1;
    };
    GridsterPush.prototype.addToPushed = function (gridsterItem) {
        if (this.pushedItems.indexOf(gridsterItem) < 0) {
            this.pushedItems.push(gridsterItem);
            this.pushedItemsPath.push([{ x: gridsterItem.item.x || 0, y: gridsterItem.item.y || 0 },
                { x: gridsterItem.$item.x, y: gridsterItem.$item.y }]);
        }
        else {
            var i = this.pushedItems.indexOf(gridsterItem);
            this.pushedItemsPath[i].push({ x: gridsterItem.$item.x, y: gridsterItem.$item.y });
        }
    };
    GridsterPush.prototype.removeFromPushed = function (i) {
        if (i > -1) {
            this.pushedItems.splice(i, 1);
            this.pushedItemsPath.splice(i, 1);
        }
    };
    GridsterPush.prototype.checkPushBack = function () {
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
    GridsterPush.prototype.checkPushedItem = function (pushedItem, i) {
        var path = this.pushedItemsPath[i];
        var j = path.length - 2;
        var lastPosition, x, y;
        var change = false;
        for (; j > -1; j--) {
            lastPosition = path[j];
            x = pushedItem.$item.x;
            y = pushedItem.$item.y;
            pushedItem.$item.x = lastPosition.x;
            pushedItem.$item.y = lastPosition.y;
            if (!this.gridster.findItemWithItem(pushedItem.$item)) {
                pushedItem.setSize(true);
                path.splice(j + 1, path.length - j - 1);
                change = true;
            }
            else {
                pushedItem.$item.x = x;
                pushedItem.$item.y = y;
            }
        }
        if (path.length < 2) {
            this.removeFromPushed(i);
        }
        return change;
    };
    GridsterPush = __decorate([
        inject(GridsterItemComponent, GridsterComponent)
    ], GridsterPush);
    return GridsterPush;
}());
export { GridsterPush };
