"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function moveScrollPosition(container, previousScrollLeft, previousScrollTop, centerOffsetX, centerOffsetY, widthRatio, heightRatio) {
    var scrollLeft = previousScrollLeft + centerOffsetX * widthRatio - centerOffsetX;
    var scrollTop = previousScrollTop + centerOffsetY * heightRatio - centerOffsetY;
    container.setAttribute('data-scroll-left', scrollLeft);
    container.setAttribute('data-scroll-top', scrollTop);
    container.scrollLeft = Math.round(scrollLeft);
    container.scrollTop = Math.round(scrollTop);
}
function getScale(container, options) {
    if (options === void 0) { options = {}; }
    if (options.scalingProperty === 'transform') {
        return +(container && container.getAttribute('data-scale') || 1);
    }
    else {
        var content = container.firstElementChild;
        var bbox = content.getBBox();
        var containerWidth = container.offsetWidth;
        var containerHeight = container.offsetHeight;
        return containerWidth / bbox.width < containerHeight / bbox.height ? content.clientWidth / containerWidth : content.clientHeight / containerHeight;
    }
}
exports.getScale = getScale;
function setScale(container, value, options) {
    if (options === void 0) { options = {}; }
    var minScale = options.minScale || 1;
    var maxScale = options.maxScale || 10;
    var origin = options.origin;
    var content = container.firstElementChild;
    var previousScale = getScale(container, options);
    var scale = utils_1.clamp(value, minScale, maxScale);
    if (scale === previousScale && options.scalingProperty === 'transform') {
        return;
    }
    var actualRatio = scale / previousScale;
    var previousClientRect = content.getBoundingClientRect();
    var centerOffsetX = (origin && origin.clientX || 0) - previousClientRect.left;
    var centerOffsetY = (origin && origin.clientY || 0) - previousClientRect.top;
    var previousScrollLeft = +container.getAttribute('data-scroll-left');
    var previousScrollTop = +container.getAttribute('data-scroll-top');
    Math.round(previousScrollLeft) !== container.scrollLeft && (previousScrollLeft = container.scrollLeft);
    Math.round(previousScrollTop) !== container.scrollTop && (previousScrollTop = container.scrollTop);
    container.setAttribute('data-scale', scale);
    if (options.scalingProperty === 'transform') {
        var computedStyle = getComputedStyle(content);
        var transformOrigin = computedStyle.transformOrigin.split(' ').map(parseFloat);
        var matrix = new utils_1.DomMatrix(computedStyle.transform);
        matrix = matrix.translate.apply(matrix, transformOrigin.map(minus));
        matrix.d = matrix.a === matrix.d ? scale : matrix.d * actualRatio;
        matrix.a = scale;
        matrix = matrix.translate.apply(matrix, transformOrigin);
        content.style.transform = matrix;
        content.setAttribute('transform', matrix);
        moveScrollPosition(container, previousScrollLeft, previousScrollTop, centerOffsetX, centerOffsetY, actualRatio, actualRatio);
    }
    else {
        var previousWidth = content.clientWidth;
        var previousHeight = content.clientHeight;
        var containerWidth = container.offsetWidth;
        var containerHeight = container.offsetHeight;
        var bbox = content.getBBox();
        var width = void 0;
        var height = void 0;
        if (containerWidth / bbox.width < containerHeight / bbox.height) {
            width = scale * containerWidth;
            height = width * bbox.height / bbox.width;
        }
        else {
            height = scale * containerHeight;
            width = height * bbox.width / bbox.height;
        }
        width = Math.max(width, containerWidth * minScale);
        height = Math.max(height, containerHeight * minScale);
        content.style.width = width + "px";
        content.style.height = height + "px";
        moveScrollPosition(container, previousScrollLeft, previousScrollTop, centerOffsetX, centerOffsetY, width / previousWidth, height / previousHeight);
    }
}
exports.setScale = setScale;
function resetScale(container, options) {
    setScale(container, 1, options);
}
exports.resetScale = resetScale;
function zoom(container, ratio, options) {
    setScale(container, getScale(container, options) * ratio, options);
}
exports.zoom = zoom;
function minus(n) {
    return -n;
}
