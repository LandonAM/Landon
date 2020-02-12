import { pan } from './pan';
import { findTargetAndParseOptions } from './utils';
var preventDefault = function (event) { return event.preventDefault(); };
export function panOnDrag(attributeName, defaultOptions) {
    addEventListener('mousedown', function (event) {
        if (event.button !== 0 && event.button !== 2) {
            return;
        }
        var _a = findTargetAndParseOptions(event.target, attributeName), target = _a[0], options = _a[1];
        if (!target || !options || !isPanButtonPressed(event, options, defaultOptions)) {
            return;
        }
        event.preventDefault();
        var previousClientX = event.clientX;
        var previousClientY = event.clientY;
        var onMouseMove = function (event) {
            pan(target, previousClientX - event.clientX, previousClientY - event.clientY);
            previousClientX = event.clientX;
            previousClientY = event.clientY;
            event.preventDefault();
        };
        var onMouseUp = function () {
            removeEventListener('mouseup', onMouseUp);
            removeEventListener('mousemove', onMouseMove);
            removeEventListener('contextmenu', preventDefault);
        };
        addEventListener('mouseup', onMouseUp);
        addEventListener('mousemove', onMouseMove);
        addEventListener('contextmenu', preventDefault);
    });
}
function isPanButtonPressed(event, options, defaultOptions) {
    return event.button === ((options.button || defaultOptions.button) === 'right' ? 2 : 0);
}
