export var DomMatrix = window.DOMMatrix || window.WebKitCSSMatrix || window.MSCSSMatrix;
export function clamp(value, min, max) {
    return value < min ? min : value > max ? max : value;
}
var matches = Element.prototype.matches ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.msMatchesSelector;
var closest = Element.prototype.closest
    ? function (element, selector) { return element && element.closest(selector); }
    : function (element, selector) {
        while (element && !matches.call(element, selector)) {
            element = element.parentNode instanceof Element ? element.parentNode : null;
        }
        return element;
    };
export function parseOptions(optionsString) {
    var options = {};
    if (optionsString) {
        for (var _i = 0, _a = optionsString.split(';'); _i < _a.length; _i++) {
            var s = _a[_i];
            var index = s.indexOf(':');
            options[s.slice(0, index).trim().replace(/[a-zA-Z0-9_]-[a-z]/g, function ($0) { return $0[0] + $0[2].toUpperCase(); })] = s.slice(index + 1).trim();
        }
    }
    return options;
}
export function findTargetAndParseOptions(element, attributeName) {
    var target = closest(element, "[" + attributeName + "]");
    return target ? [target, parseOptions(target.getAttribute(attributeName))] : [];
}
function noop() { }
var passiveSupported = false;
try {
    var options = Object.defineProperty({}, 'passive', {
        get: function () {
            passiveSupported = true;
        }
    });
    addEventListener('t', noop, options);
    removeEventListener('t', noop, options);
}
catch (err) {
    passiveSupported = false;
}
export var nonPassive = passiveSupported ? { passive: false } : undefined;
