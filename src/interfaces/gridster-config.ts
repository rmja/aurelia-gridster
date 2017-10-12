import { GridsterComponent } from '../gridster';
import { GridsterItem } from '../interfaces/gridster-item';
import { GridsterItemComponent } from '../gridster-item';

export type GridType = 'fit' | 'scrollVertical' | 'scrollHorizontal' | 'fixed' | 'verticalFixed' | 'horizontalFixed';
export type displayGrid = 'always' | 'onDrag&Resize' | 'none';
export type compactType = 'none' | 'compactUp' | 'compactLeft' | 'compactUp&Left' | 'compactLeft&Up';

export interface GridsterConfig {
  gridType?: GridType;
  fixedColWidth?: number;
  fixedRowHeight?: number;
  keepFixedHeightInMobile?: boolean;
  keepFixedWidthInMobile?: boolean;
  compactType?: compactType;
  mobileBreakpoint?: number;
  minCols?: number;
  maxCols?: number;
  minRows?: number;
  maxRows?: number;
  defaultItemCols?: number;
  defaultItemRows?: number;
  maxItemCols?: number;
  maxItemRows?: number;
  minItemCols?: number;
  minItemRows?: number;
  minItemArea?: number;
  maxItemArea?: number;
  margin?: number;
  outerMargin?: boolean;
  scrollSensitivity?: number;
  scrollSpeed?: number;
  initCallback?: (component: GridsterComponent) => void;
  itemChangeCallback?: (item: GridsterItem, component: GridsterItemComponent) => void;
  itemResizeCallback?: (item: GridsterItem, component: GridsterItemComponent) => void;
  itemInitCallback?: (item: GridsterItem, component: GridsterItemComponent) => void;
  itemRemovedCallback?: (item: GridsterItem, component: GridsterItemComponent) => void;
  draggable?: Draggable;
  resizable?: Resizable;
  swap?: boolean;
  pushItems?: boolean;
  disablePushOnDrag?: boolean;
  disablePushOnResize?: boolean;
  pushDirections?: PushDirections;
  pushResizeItems?: boolean;
  displayGrid?: displayGrid;
  disableWindowResize?: boolean;
  enableEmptyCellClick?: boolean;
  enableEmptyCellContextMenu?: boolean;
  enableEmptyCellDrop?: boolean;
  enableEmptyCellDrag?: boolean;
  emptyCellClickCallback?: (event: Event, item: GridsterItem) => void;
  emptyCellContextMenuCallback?: (event: Event, item: GridsterItem) => void;
  emptyCellDropCallback?: (event: Event, item: GridsterItem) => void;
  emptyCellDragCallback?: (event: Event, item: GridsterItem) => void;
  emptyCellDragMaxCols?: number;
  emptyCellDragMaxRows?: number;
  api?: {
    resize?: () => void,
    optionsChanged?: () => void,
    getNextPossiblePosition?: (newItem: GridsterItem) => boolean,
  };

  [propName: string]: any;
}

export interface Draggable extends DragBase {
  ignoreContentClass?: string;
  ignoreContent?: boolean;
  dragHandleClass?: string;
}

export interface Resizable extends DragBase {
  handles?: {
    s: boolean,
    e: boolean,
    n: boolean,
    w: boolean,
    se: boolean,
    ne: boolean,
    sw: boolean,
    nw: boolean
  };
}

export interface DragBase {
  enabled?: boolean;
  stop?: (item: GridsterItem, component: GridsterItemComponent, event: Event) => void;
  start?: (item: GridsterItem, component: GridsterItemComponent, event: Event) => void;
  delayStart?: number;
}

export interface PushDirections {
  north: boolean;
  east: boolean;
  south: boolean;
  west: boolean;
}
