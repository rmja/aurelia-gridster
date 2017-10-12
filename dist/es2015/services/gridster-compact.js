var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { GridsterComponent } from '../gridster';
import { autoinject } from 'aurelia-framework';
let GridsterCompact = class GridsterCompact {
    constructor(gridster) {
        this.gridster = gridster;
    }
    checkCompact() {
        if (this.gridster.$options.compactType !== 'none') {
            if (this.gridster.$options.compactType === 'compactUp') {
                this.checkCompactUp();
            }
            else if (this.gridster.$options.compactType === 'compactLeft') {
                this.checkCompactLeft();
            }
            else if (this.gridster.$options.compactType === 'compactUp&Left') {
                this.checkCompactUp();
                this.checkCompactLeft();
            }
            else if (this.gridster.$options.compactType === 'compactLeft&Up') {
                this.checkCompactLeft();
                this.checkCompactUp();
            }
        }
    }
    checkCompactUp() {
        let widgetMovedUp = false, widget, moved;
        const l = this.gridster.grid.length;
        for (let i = 0; i < l; i++) {
            widget = this.gridster.grid[i];
            moved = this.moveUpTillCollision(widget);
            if (moved) {
                widgetMovedUp = true;
                widget.item.y = widget.$item.y;
                widget.itemChanged();
            }
        }
        if (widgetMovedUp) {
            this.checkCompactUp();
        }
        return widgetMovedUp;
    }
    moveUpTillCollision(itemComponent) {
        itemComponent.$item.y -= 1;
        if (this.gridster.checkCollision(itemComponent.$item)) {
            itemComponent.$item.y += 1;
            return false;
        }
        else {
            this.moveUpTillCollision(itemComponent);
            return true;
        }
    }
    checkCompactLeft() {
        let widgetMovedUp = false, widget, moved;
        const l = this.gridster.grid.length;
        for (let i = 0; i < l; i++) {
            widget = this.gridster.grid[i];
            moved = this.moveLeftTillCollision(widget);
            if (moved) {
                widgetMovedUp = true;
                widget.item.x = widget.$item.x;
                widget.itemChanged();
            }
        }
        if (widgetMovedUp) {
            this.checkCompactLeft();
        }
        return widgetMovedUp;
    }
    moveLeftTillCollision(itemComponent) {
        itemComponent.$item.x -= 1;
        if (this.gridster.checkCollision(itemComponent.$item)) {
            itemComponent.$item.x += 1;
            return false;
        }
        else {
            this.moveLeftTillCollision(itemComponent);
            return true;
        }
    }
};
GridsterCompact = __decorate([
    autoinject,
    __metadata("design:paramtypes", [GridsterComponent])
], GridsterCompact);
export { GridsterCompact };
