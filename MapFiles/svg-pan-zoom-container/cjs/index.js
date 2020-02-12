"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var pan_on_drag_1 = require("./pan-on-drag");
var zoom_on_wheel_1 = require("./zoom-on-wheel");
__export(require("./pan"));
__export(require("./zoom"));
pan_on_drag_1.panOnDrag('data-pan-on-drag', {
    button: 'left',
});
zoom_on_wheel_1.zoomOnWheel('data-zoom-on-wheel', {
    minScale: 1,
    maxScale: 10,
    zoomAmount: .002,
    scalingProperty: 'width/height',
});
