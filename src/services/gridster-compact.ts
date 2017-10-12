import { GridsterCustomElement } from '../gridster';
import { GridsterItemCustomElement } from '../gridster-item';
import { autoinject } from 'aurelia-dependency-injection';

@autoinject
export class GridsterCompact {
  constructor(private gridster: GridsterCustomElement) {
  }

  checkCompact(): void {
    if (this.gridster.$options.compactType !== 'none') {
      if (this.gridster.$options.compactType === 'compactUp') {
        this.checkCompactUp();
      } else if (this.gridster.$options.compactType === 'compactLeft') {
        this.checkCompactLeft();
      } else if (this.gridster.$options.compactType === 'compactUp&Left') {
        this.checkCompactUp();
        this.checkCompactLeft();
      } else if (this.gridster.$options.compactType === 'compactLeft&Up') {
        this.checkCompactLeft();
        this.checkCompactUp();
      }
    }
  }

  checkCompactUp(): boolean {
    let widgetMovedUp = false, widget: GridsterItemCustomElement, moved: boolean;
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

  moveUpTillCollision(itemComponent: GridsterItemCustomElement): boolean {
    itemComponent.$item.y -= 1;
    if (this.gridster.checkCollision(itemComponent.$item)) {
      itemComponent.$item.y += 1;
      return false;
    } else {
      this.moveUpTillCollision(itemComponent);
      return true;
    }
  }

  checkCompactLeft(): boolean {
    let widgetMovedUp = false, widget: GridsterItemCustomElement, moved: boolean;
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

  moveLeftTillCollision(itemComponent: GridsterItemCustomElement): boolean {
    itemComponent.$item.x -= 1;
    if (this.gridster.checkCollision(itemComponent.$item)) {
      itemComponent.$item.x += 1;
      return false;
    } else {
      this.moveLeftTillCollision(itemComponent);
      return true;
    }
  }
}
