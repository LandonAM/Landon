import { zoom } from './zoom';
import { findTargetAndParseOptions, nonPassive, parseOptions } from './utils';
export function zoomOnWheel(attributeName, defaultOptions, initializationOptions) {
    if (initializationOptions === void 0) { initializationOptions = {}; }
    if (!initializationOptions.noEmitStyle) {
        (document.head || document.body || document.documentElement)
            .appendChild(document.createElement('style'))
            .textContent = "[" + attributeName + "]{overflow:scroll}[" + attributeName + "]>:first-child{width:100%;height:100%;vertical-align:middle;}";
    }
    addEventListener('wheel', function (event) {
        var _a = findTargetAndParseOptions(event.target, attributeName), target = _a[0], options = _a[1];
        if (target instanceof HTMLElement) {
            var zoomAmount = +options.zoomAmount || defaultOptions.zoomAmount;
            zoom(target, Math.pow((1 + zoomAmount), -event.deltaY), {
                origin: event,
                minScale: +options.minScale || defaultOptions.minScale,
                maxScale: +options.maxScale || defaultOptions.maxScale,
                scalingProperty: options.scalingProperty || defaultOptions.scalingProperty,
            });
            event.preventDefault();
        }
    }, nonPassive);
    addEventListener('resize', function () {
        var targets = document.querySelectorAll("[" + attributeName + "]");
        for (var i = 0; i < targets.length; i++) {
            var target = targets[i];
            if (target instanceof HTMLElement) {
                var options = parseOptions(target.getAttribute(attributeName));
                zoom(target, 1, options);
            }
        }
    });
}
