export interface ZoomOptions {
    readonly origin?: {
        clientX: number;
        clientY: number;
    };
    readonly minScale?: number;
    readonly maxScale?: number;
    readonly scalingProperty?: 'transform' | 'width/height';
}
export declare function getScale(container: HTMLElement, options?: ZoomOptions): number;
export declare function setScale(container: HTMLElement, value: number, options?: ZoomOptions): void;
export declare function resetScale(container: HTMLElement, options?: ZoomOptions): void;
export declare function zoom(container: HTMLElement, ratio: number, options?: ZoomOptions): void;
