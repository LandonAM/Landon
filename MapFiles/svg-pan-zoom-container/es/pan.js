export function pan(container, deltaX, deltaY) {
    container.scrollLeft += deltaX;
    container.scrollTop += deltaY;
}
