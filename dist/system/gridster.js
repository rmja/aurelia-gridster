System.register(["./services/gridster-compact", "./services/gridster-config", "./services/gridster-empty-cell", "./services/gridster-utils", "./renderer", "aurelia-dependency-injection", "aurelia-templating"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var gridster_compact_1, gridster_config_1, gridster_empty_cell_1, gridster_utils_1, renderer_1, aurelia_dependency_injection_1, aurelia_templating_1, GridsterCustomElement;
    return {
        setters: [
            function (gridster_compact_1_1) {
                gridster_compact_1 = gridster_compact_1_1;
            },
            function (gridster_config_1_1) {
                gridster_config_1 = gridster_config_1_1;
            },
            function (gridster_empty_cell_1_1) {
                gridster_empty_cell_1 = gridster_empty_cell_1_1;
            },
            function (gridster_utils_1_1) {
                gridster_utils_1 = gridster_utils_1_1;
            },
            function (renderer_1_1) {
                renderer_1 = renderer_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            }
        ],
        execute: function () {
            GridsterCustomElement = /** @class */ (function () {
                function GridsterCustomElement(renderer) {
                    this.renderer = renderer;
                    this.$options = JSON.parse(JSON.stringify(gridster_config_1.GridsterConfigService));
                    this.mobile = false;
                    this.curWidth = 0;
                    this.curHeight = 0;
                    this.grid = [];
                    this.curColWidth = 0;
                    this.curRowHeight = 0;
                    this.dragInProgress = false;
                    this.$options.draggable.stop = undefined;
                    this.$options.draggable.start = undefined;
                    this.$options.resizable.stop = undefined;
                    this.$options.resizable.start = undefined;
                    this.$options.itemChangeCallback = undefined;
                    this.$options.itemResizeCallback = undefined;
                    this.$options.itemInitCallback = undefined;
                    this.$options.itemRemovedCallback = undefined;
                    this.$options.emptyCellClickCallback = undefined;
                    this.$options.emptyCellContextMenuCallback = undefined;
                    this.$options.emptyCellDropCallback = undefined;
                    this.$options.emptyCellDragCallback = undefined;
                    this.emptyCell = new gridster_empty_cell_1.GridsterEmptyCell(this);
                    this.compact = new gridster_compact_1.GridsterCompact(this);
                }
                GridsterCustomElement_1 = GridsterCustomElement;
                GridsterCustomElement.checkCollisionTwoItems = function (item, item2) {
                    return item.x < item2.x + item2.cols
                        && item.x + item.cols > item2.x
                        && item.y < item2.y + item2.rows
                        && item.y + item.rows > item2.y;
                };
                GridsterCustomElement.prototype.attached = function () {
                    this.setOptions();
                    this.options.api = {
                        optionsChanged: this.optionsChanged2.bind(this),
                        resize: this.onResize.bind(this),
                        getNextPossiblePosition: this.getNextPossiblePosition.bind(this)
                    };
                    this.columns = this.$options.minCols;
                    this.rows = this.$options.minRows;
                    this.setGridSize();
                    this.calculateLayoutDebounce = gridster_utils_1.GridsterUtils.debounce(this.calculateLayout.bind(this), 5);
                    this.calculateLayoutDebounce();
                    if (this.options.initCallback) {
                        this.options.initCallback(this);
                    }
                };
                GridsterCustomElement.prototype.resize = function () {
                    var height;
                    var width;
                    if (this.$options.gridType === 'fit' && !this.mobile) {
                        width = this.el.offsetWidth;
                        height = this.el.offsetHeight;
                    }
                    else {
                        width = this.el.clientWidth;
                        height = this.el.clientHeight;
                    }
                    if ((width !== this.curWidth || height !== this.curHeight) && this.checkIfToResize()) {
                        this.onResize();
                    }
                };
                GridsterCustomElement.prototype.setOptions = function () {
                    this.$options = gridster_utils_1.GridsterUtils.merge(this.$options, this.options, this.$options);
                    if (!this.$options.disableWindowResize && !this.windowResize) {
                        this.windowResize = this.renderer.listen(window, 'resize', this.onResize.bind(this));
                    }
                    else if (this.$options.disableWindowResize && this.windowResize) {
                        this.windowResize.dispose();
                        this.windowResize = null;
                    }
                    this.emptyCell.updateOptions();
                };
                GridsterCustomElement.prototype.optionsChanged2 = function () {
                    this.setOptions();
                    var widgetsIndex = this.grid.length - 1, widget;
                    for (; widgetsIndex >= 0; widgetsIndex--) {
                        widget = this.grid[widgetsIndex];
                        widget.updateOptions();
                    }
                    this.calculateLayout();
                };
                GridsterCustomElement.prototype.detached = function () {
                    if (this.windowResize) {
                        this.windowResize.dispose();
                    }
                };
                GridsterCustomElement.prototype.onResize = function () {
                    this.setGridSize();
                    this.calculateLayoutDebounce();
                };
                GridsterCustomElement.prototype.checkIfToResize = function () {
                    var clientWidth = this.el.clientWidth;
                    var offsetWidth = this.el.offsetWidth;
                    var scrollWidth = this.el.scrollWidth;
                    var clientHeight = this.el.clientHeight;
                    var offsetHeight = this.el.offsetHeight;
                    var scrollHeight = this.el.scrollHeight;
                    var verticalScrollPresent = clientWidth < offsetWidth && scrollHeight > offsetHeight
                        && scrollHeight - offsetHeight < offsetWidth - clientWidth;
                    var horizontalScrollPresent = clientHeight < offsetHeight
                        && scrollWidth > offsetWidth && scrollWidth - offsetWidth < offsetHeight - clientHeight;
                    if (verticalScrollPresent) {
                        return false;
                    }
                    return !horizontalScrollPresent;
                };
                GridsterCustomElement.prototype.setGridSize = function () {
                    var width = this.el.clientWidth;
                    var height = this.el.clientHeight;
                    if (this.$options.gridType === 'fit' && !this.mobile) {
                        width = this.el.offsetWidth;
                        height = this.el.offsetHeight;
                    }
                    else {
                        width = this.el.clientWidth;
                        height = this.el.clientHeight;
                    }
                    this.curWidth = width;
                    this.curHeight = height;
                };
                GridsterCustomElement.prototype.setGridDimensions = function () {
                    var rows = this.$options.minRows, columns = this.$options.minCols;
                    var widgetsIndex = this.grid.length - 1;
                    for (; widgetsIndex >= 0; widgetsIndex--) {
                        rows = Math.max(rows, this.grid[widgetsIndex].$item.y + this.grid[widgetsIndex].$item.rows);
                        columns = Math.max(columns, this.grid[widgetsIndex].$item.x + this.grid[widgetsIndex].$item.cols);
                    }
                    this.columns = columns;
                    this.rows = rows;
                };
                GridsterCustomElement.prototype.calculateLayout = function () {
                    // check to compact
                    this.compact.checkCompact();
                    this.setGridDimensions();
                    if (this.$options.outerMargin) {
                        this.curColWidth = Math.floor((this.curWidth - this.$options.margin) / this.columns);
                        this.curRowHeight = Math.floor((this.curHeight - this.$options.margin) / this.rows);
                    }
                    else {
                        this.curColWidth = Math.floor((this.curWidth + this.$options.margin) / this.columns);
                        this.curRowHeight = Math.floor((this.curHeight + this.$options.margin) / this.rows);
                    }
                    var addClass = '';
                    var removeClass1 = '';
                    var removeClass2 = '';
                    var removeClass3 = '';
                    if (this.$options.gridType === 'fit') {
                        addClass = 'fit';
                        removeClass1 = 'scrollVertical';
                        removeClass2 = 'scrollHorizontal';
                        removeClass3 = 'fixed';
                    }
                    else if (this.$options.gridType === 'scrollVertical') {
                        this.curRowHeight = this.curColWidth;
                        addClass = 'scrollVertical';
                        removeClass1 = 'fit';
                        removeClass2 = 'scrollHorizontal';
                        removeClass3 = 'fixed';
                    }
                    else if (this.$options.gridType === 'scrollHorizontal') {
                        this.curColWidth = this.curRowHeight;
                        addClass = 'scrollHorizontal';
                        removeClass1 = 'fit';
                        removeClass2 = 'scrollVertical';
                        removeClass3 = 'fixed';
                    }
                    else if (this.$options.gridType === 'fixed') {
                        this.curColWidth = this.$options.fixedColWidth;
                        this.curRowHeight = this.$options.fixedRowHeight;
                        addClass = 'fixed';
                        removeClass1 = 'fit';
                        removeClass2 = 'scrollVertical';
                        removeClass3 = 'scrollHorizontal';
                    }
                    else if (this.$options.gridType === 'verticalFixed') {
                        this.curRowHeight = this.$options.fixedRowHeight;
                        addClass = 'scrollVertical';
                        removeClass1 = 'fit';
                        removeClass2 = 'scrollHorizontal';
                        removeClass3 = 'fixed';
                    }
                    else if (this.$options.gridType === 'horizontalFixed') {
                        this.curColWidth = this.$options.fixedColWidth;
                        addClass = 'scrollHorizontal';
                        removeClass1 = 'fit';
                        removeClass2 = 'scrollVertical';
                        removeClass3 = 'fixed';
                    }
                    this.renderer.addClass(this.el, addClass);
                    this.renderer.removeClass(this.el, removeClass1);
                    this.renderer.removeClass(this.el, removeClass2);
                    this.renderer.removeClass(this.el, removeClass3);
                    if (!this.mobile && this.$options.mobileBreakpoint > this.curWidth) {
                        this.mobile = !this.mobile;
                        this.renderer.addClass(this.el, 'mobile');
                    }
                    else if (this.mobile && this.$options.mobileBreakpoint < this.curWidth) {
                        this.mobile = !this.mobile;
                        this.renderer.removeClass(this.el, 'mobile');
                    }
                    this.gridLines.updateGrid();
                    var widgetsIndex = this.grid.length - 1, widget;
                    for (; widgetsIndex >= 0; widgetsIndex--) {
                        widget = this.grid[widgetsIndex];
                        widget.setSize(false);
                        widget.drag.toggle();
                        widget.resize.toggle();
                    }
                    setTimeout(this.resize.bind(this), 100);
                };
                GridsterCustomElement.prototype.addItem = function (itemComponent) {
                    if (itemComponent.$item.cols === undefined) {
                        itemComponent.$item.cols = this.$options.defaultItemCols;
                        itemComponent.item.cols = itemComponent.$item.cols;
                        itemComponent.itemChanged();
                    }
                    if (itemComponent.$item.rows === undefined) {
                        itemComponent.$item.rows = this.$options.defaultItemRows;
                        itemComponent.item.rows = itemComponent.$item.rows;
                        itemComponent.itemChanged();
                    }
                    if (itemComponent.$item.x === -1 || itemComponent.$item.y === -1) {
                        this.autoPositionItem(itemComponent);
                    }
                    else if (this.checkCollision(itemComponent.$item)) {
                        console.warn('Can\'t be placed in the bounds of the dashboard, trying to auto position!/n' +
                            JSON.stringify(itemComponent.item, ['cols', 'rows', 'x', 'y']));
                        this.autoPositionItem(itemComponent);
                    }
                    this.grid.push(itemComponent);
                    this.calculateLayoutDebounce();
                    if (itemComponent.$item.initCallback) {
                        itemComponent.$item.initCallback(itemComponent.item, itemComponent);
                    }
                    if (this.$options.itemInitCallback) {
                        this.$options.itemInitCallback(itemComponent.item, itemComponent);
                    }
                };
                GridsterCustomElement.prototype.removeItem = function (itemComponent) {
                    this.grid.splice(this.grid.indexOf(itemComponent), 1);
                    this.calculateLayoutDebounce();
                    if (this.$options.itemRemovedCallback) {
                        this.$options.itemRemovedCallback(itemComponent.item, itemComponent);
                    }
                };
                GridsterCustomElement.prototype.checkCollision = function (item) {
                    return this.checkGridCollision(item) || this.findItemWithItem(item);
                };
                GridsterCustomElement.prototype.checkGridCollision = function (item) {
                    var noNegativePosition = item.y > -1 && item.x > -1;
                    var maxGridCols = item.cols + item.x <= this.$options.maxCols;
                    var maxGridRows = item.rows + item.y <= this.$options.maxRows;
                    var maxItemCols = item.maxItemCols === undefined ? this.$options.maxItemCols : item.maxItemCols;
                    var minItemCols = item.minItemCols === undefined ? this.$options.minItemCols : item.minItemCols;
                    var maxItemRows = item.maxItemRows === undefined ? this.$options.maxItemRows : item.maxItemRows;
                    var minItemRows = item.minItemRows === undefined ? this.$options.minItemRows : item.minItemRows;
                    var inColsLimits = item.cols <= maxItemCols && item.cols >= minItemCols;
                    var inRowsLimits = item.rows <= maxItemRows && item.rows >= minItemRows;
                    var minAreaLimit = item.minItemArea === undefined ? this.$options.minItemArea : item.minItemArea;
                    var maxAreaLimit = item.maxItemArea === undefined ? this.$options.maxItemArea : item.maxItemArea;
                    var area = item.cols * item.rows;
                    var inMinArea = minAreaLimit <= area;
                    var inMaxArea = maxAreaLimit >= area;
                    return !(noNegativePosition && maxGridCols && maxGridRows && inColsLimits && inRowsLimits && inMinArea && inMaxArea);
                };
                GridsterCustomElement.prototype.findItemWithItem = function (item) {
                    var widgetsIndex = this.grid.length - 1, widget;
                    for (; widgetsIndex > -1; widgetsIndex--) {
                        widget = this.grid[widgetsIndex];
                        if (widget.$item !== item && GridsterCustomElement_1.checkCollisionTwoItems(widget.$item, item)) {
                            return widget;
                        }
                    }
                    return false;
                };
                GridsterCustomElement.prototype.findItemsWithItem = function (item) {
                    var a = [];
                    var widgetsIndex = this.grid.length - 1, widget;
                    for (; widgetsIndex > -1; widgetsIndex--) {
                        widget = this.grid[widgetsIndex];
                        if (widget.$item !== item && GridsterCustomElement_1.checkCollisionTwoItems(widget.$item, item)) {
                            a.push(widget);
                        }
                    }
                    return a;
                };
                GridsterCustomElement.prototype.autoPositionItem = function (itemComponent) {
                    if (this.getNextPossiblePosition(itemComponent.$item)) {
                        itemComponent.item.x = itemComponent.$item.x;
                        itemComponent.item.y = itemComponent.$item.y;
                        itemComponent.itemChanged();
                    }
                    else {
                        itemComponent.notPlaced = true;
                        console.warn('Can\'t be placed in the bounds of the dashboard!/n' +
                            JSON.stringify(itemComponent.item, ['cols', 'rows', 'x', 'y']));
                    }
                };
                GridsterCustomElement.prototype.getNextPossiblePosition = function (newItem) {
                    if (newItem.cols === -1) {
                        newItem.cols = this.$options.defaultItemCols;
                    }
                    if (newItem.rows === -1) {
                        newItem.rows = this.$options.defaultItemRows;
                    }
                    this.setGridDimensions();
                    var rowsIndex = 0, colsIndex;
                    for (; rowsIndex < this.rows; rowsIndex++) {
                        newItem.y = rowsIndex;
                        colsIndex = 0;
                        for (; colsIndex < this.columns; colsIndex++) {
                            newItem.x = colsIndex;
                            if (!this.checkCollision(newItem)) {
                                return true;
                            }
                        }
                    }
                    var canAddToRows = this.$options.maxRows >= this.rows + newItem.rows;
                    var canAddToColumns = this.$options.maxCols >= this.columns + newItem.cols;
                    var addToRows = this.rows <= this.columns && canAddToRows;
                    if (!addToRows && canAddToColumns) {
                        newItem.x = this.columns;
                        newItem.y = 0;
                        return true;
                    }
                    else if (canAddToRows) {
                        newItem.y = this.rows;
                        newItem.x = 0;
                        return true;
                    }
                    return false;
                };
                GridsterCustomElement.prototype.pixelsToPosition = function (x, y, roundingMethod) {
                    return [this.pixelsToPositionX(x, roundingMethod), this.pixelsToPositionY(y, roundingMethod)];
                };
                GridsterCustomElement.prototype.pixelsToPositionX = function (x, roundingMethod) {
                    return Math.max(roundingMethod(x / this.curColWidth), 0);
                };
                GridsterCustomElement.prototype.pixelsToPositionY = function (y, roundingMethod) {
                    return Math.max(roundingMethod(y / this.curRowHeight), 0);
                };
                GridsterCustomElement.prototype.positionXToPixels = function (x) {
                    return x * this.curColWidth;
                };
                GridsterCustomElement.prototype.positionYToPixels = function (y) {
                    return y * this.curRowHeight;
                };
                __decorate([
                    aurelia_templating_1.bindable,
                    __metadata("design:type", Object)
                ], GridsterCustomElement.prototype, "options", void 0);
                GridsterCustomElement = GridsterCustomElement_1 = __decorate([
                    aurelia_dependency_injection_1.autoinject,
                    __metadata("design:paramtypes", [renderer_1.Renderer])
                ], GridsterCustomElement);
                return GridsterCustomElement;
                var GridsterCustomElement_1;
            }());
            exports_1("GridsterCustomElement", GridsterCustomElement);
        }
    };
});
