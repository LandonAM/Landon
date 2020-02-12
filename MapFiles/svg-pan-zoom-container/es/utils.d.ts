export declare const DomMatrix: {
    new (init?: string | number[] | undefined): DOMMatrix;
    prototype: DOMMatrix;
    fromFloat32Array(array32: Float32Array): DOMMatrix;
    fromFloat64Array(array64: Float64Array): DOMMatrix;
    fromMatrix(other?: DOMMatrixInit | undefined): DOMMatrix;
};
export declare function clamp(value: number, min: number, max: number): number;
export declare function parseOptions(optionsString: string | undefined | null): Record<string, string>;
export declare function findTargetAndParseOptions(element: Element | null, attributeName: string): [Element, Record<string, string>] | [];
export declare const nonPassive: AddEventListenerOptions | undefined;
