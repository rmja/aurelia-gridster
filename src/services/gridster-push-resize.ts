import { GridsterCustomElement } from '../gridster';
import { GridsterItem } from '../interfaces/gridster-item';
import { GridsterItemCustomElement } from '../gridster-item';
import { autoinject } from 'aurelia-dependency-injection';

@autoinject
export class GridsterPushResize {
  private pushedItems: Array<GridsterItemCustomElement>;
  private pushedItemsPath: Array<Array<GridsterItem>>;
  private gridsterItem: GridsterItemCustomElement;
  private gridster: GridsterCustomElement;
  private tryPattern: Object;
  public fromSouth: string;
  public fromNorth: string;
  public fromEast: string;
  public fromWest: string;

  constructor(gridsterItem: GridsterItemCustomElement, gridster: GridsterCustomElement) {
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

  pushItems(direction): void {
    if (this.gridster.$options.pushResizeItems) {
      this.push(this.gridsterItem, direction);
    }
  }

  restoreItems(): void {
    let i = 0;
    const l: number = this.pushedItems.length;
    let pushedItem: GridsterItemCustomElement;
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
  }

  setPushedItems() {
    let i = 0;
    const l: number = this.pushedItems.length;
    let pushedItem: GridsterItemCustomElement;
    for (; i < l; i++) {
      pushedItem = this.pushedItems[i];
      pushedItem.checkItemChanges(pushedItem.$item, pushedItem.item);
    }
    this.pushedItems = [];
    this.pushedItemsPath = [];
  }

  private push(gridsterItem: GridsterItemCustomElement, direction: string): boolean {
    const gridsterItemCollision: any = this.gridster.checkCollision(gridsterItem.$item);
    if (gridsterItemCollision && gridsterItemCollision !== true &&
      gridsterItemCollision !== this.gridsterItem && gridsterItemCollision.canBeResized()) {
      if (this.tryPattern[direction].call(this, gridsterItemCollision, gridsterItem, direction)) {
        return true;
      }
    } else if (gridsterItemCollision === false) {
      return true;
    }
    return false;
  }

  private trySouth(gridsterItemCollide: GridsterItemCustomElement, gridsterItem: GridsterItemCustomElement, direction: string): boolean {
    const backUpY = gridsterItemCollide.$item.y;
    const backUpRows = gridsterItemCollide.$item.rows;
    gridsterItemCollide.$item.y = gridsterItem.$item.y + gridsterItem.$item.rows;
    gridsterItemCollide.$item.rows = backUpRows + backUpY - gridsterItemCollide.$item.y;
    if (!GridsterCustomElement.checkCollisionTwoItems(gridsterItemCollide.$item, gridsterItem.$item)
      && !this.gridster.checkGridCollision(gridsterItemCollide.$item)) {
      gridsterItemCollide.setSize(true);
      this.addToPushed(gridsterItemCollide);
      this.push(gridsterItem, direction);
      return true;
    } else {
      gridsterItemCollide.$item.y = backUpY;
      gridsterItemCollide.$item.rows = backUpRows;
    }
    return false;
  }

  private tryNorth(gridsterItemCollide: GridsterItemCustomElement, gridsterItem: GridsterItemCustomElement, direction: string): boolean {
    const backUpRows = gridsterItemCollide.$item.rows;
    gridsterItemCollide.$item.rows = gridsterItem.$item.y - gridsterItemCollide.$item.y;
    if (!GridsterCustomElement.checkCollisionTwoItems(gridsterItemCollide.$item, gridsterItem.$item)
      && !this.gridster.checkGridCollision(gridsterItemCollide.$item)) {
      gridsterItemCollide.setSize(true);
      this.addToPushed(gridsterItemCollide);
      this.push(gridsterItem, direction);
      return true;
    } else {
      gridsterItemCollide.$item.rows = backUpRows;
    }
    return false;
  }

  private tryEast(gridsterItemCollide: GridsterItemCustomElement, gridsterItem: GridsterItemCustomElement, direction: string): boolean {
    const backUpX = gridsterItemCollide.$item.x;
    const backUpCols = gridsterItemCollide.$item.cols;
    gridsterItemCollide.$item.x = gridsterItem.$item.x + gridsterItem.$item.cols;
    gridsterItemCollide.$item.cols = backUpCols + backUpX - gridsterItemCollide.$item.x;
    if (!GridsterCustomElement.checkCollisionTwoItems(gridsterItemCollide.$item, gridsterItem.$item)
      && !this.gridster.checkGridCollision(gridsterItemCollide.$item)) {
      gridsterItemCollide.setSize(true);
      this.addToPushed(gridsterItemCollide);
      this.push(gridsterItem, direction);
      return true;
    } else {
      gridsterItemCollide.$item.x = backUpX;
      gridsterItemCollide.$item.cols = backUpCols;
    }
    return false;
  }

  private tryWest(gridsterItemCollide: GridsterItemCustomElement, gridsterItem: GridsterItemCustomElement, direction: string): boolean {
    const backUpCols = gridsterItemCollide.$item.cols;
    gridsterItemCollide.$item.cols = gridsterItem.$item.x - gridsterItemCollide.$item.x;
    if (!GridsterCustomElement.checkCollisionTwoItems(gridsterItemCollide.$item, gridsterItem.$item)
      && !this.gridster.checkGridCollision(gridsterItemCollide.$item)) {
      gridsterItemCollide.setSize(true);
      this.addToPushed(gridsterItemCollide);
      this.push(gridsterItem, direction);
      return true;
    } else {
      gridsterItemCollide.$item.cols = backUpCols;
    }
    return false;
  }

  private addToPushed(gridsterItem: GridsterItemCustomElement): void {
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
        }]);
    } else {
      const i = this.pushedItems.indexOf(gridsterItem);
      this.pushedItemsPath[i].push(
        {
          x: gridsterItem.$item.x,
          y: gridsterItem.$item.y,
          cols: gridsterItem.$item.cols,
          rows: gridsterItem.$item.rows
        });
    }
  }

  private removeFromPushed(i: number): void {
    if (i > -1) {
      this.pushedItems.splice(i, 1);
      this.pushedItemsPath.splice(i, 1);
    }
  }

  public checkPushBack(): void {
    let i: number = this.pushedItems.length - 1;
    let change = false;
    for (; i > -1; i--) {
      if (this.checkPushedItem(this.pushedItems[i], i)) {
        change = true;
      }
    }
    if (change) {
      this.checkPushBack();
    }
  }

  private checkPushedItem(pushedItem: GridsterItemCustomElement, i: number): boolean {
    const path = this.pushedItemsPath[i];
    let j = path.length - 2;
    let lastPosition, x, y, cols, rows;
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
      } else {
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
  }
}
