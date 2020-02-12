import { ZoomOptions } from './zoom';
export interface ZoomOnWheelOptions extends ZoomOptions {
    readonly zoomAmount: number;
}
export declare function zoomOnWheel(attributeName: string, defaultOptions: ZoomOnWheelOptions, initializationOptions?: {
    readonly noEmitStyle?: boolean;
}): void;
