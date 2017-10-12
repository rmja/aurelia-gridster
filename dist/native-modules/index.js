import { PLATFORM } from 'aurelia-pal';
export function configure(config) {
    config.globalResources(PLATFORM.moduleName('./gridster'));
    config.globalResources(PLATFORM.moduleName('./gridster-grid'));
    config.globalResources(PLATFORM.moduleName('./gridster-item'));
    config.globalResources(PLATFORM.moduleName('./gridster-preview'));
}
export { GridsterCustomElement } from './gridster';
export { GridsterItemCustomElement } from './gridster-item';
export { GridsterGridCustomElement } from './gridster-grid';
