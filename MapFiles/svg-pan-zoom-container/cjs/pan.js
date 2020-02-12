"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pan(container, deltaX, deltaY) {
    container.scrollLeft += deltaX;
    container.scrollTop += deltaY;
}
exports.pan = pan;
