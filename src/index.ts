export { GridsterComponent } from './gridster';
export { GridsterItemComponent } from './gridster-item';
export { GridsterItem } from './interfaces/gridster-item';
export { GridsterConfig, GridType, Draggable } from './interfaces/gridster-config';

import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(frameworkConfiguration: FrameworkConfiguration) {
  frameworkConfiguration.globalResources([
    PLATFORM.moduleName('./gridster'),
    PLATFORM.moduleName('./gridster-grid'),
    PLATFORM.moduleName('./gridster-preview'),
    PLATFORM.moduleName('./gridster-item')
  ]);
}
