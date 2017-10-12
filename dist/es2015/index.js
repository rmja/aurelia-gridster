export { GridsterComponent } from './gridster';
export { GridsterItemComponent } from './gridster-item';
import { PLATFORM } from 'aurelia-framework';
export function configure(frameworkConfiguration) {
    frameworkConfiguration.globalResources([
        PLATFORM.moduleName('./gridster'),
        PLATFORM.moduleName('./gridster-grid'),
        PLATFORM.moduleName('./gridster-preview'),
        PLATFORM.moduleName('./gridster-item')
    ]);
}
