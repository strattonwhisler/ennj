export interface CanvasConfig {
    id: string;
    width: number;
    height: number;
    context?: CanvasContextConfig;
}

export interface CanvasContextConfig {
    // See https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
    alpha?: boolean;
    desynchronized?: boolean;
    antialias?: boolean;
    depth?: boolean;
    failIfMajorPerformanceCaveat?: boolean;
    powerPreference?: 'default' | 'high-performance' | 'low-power';
    premultipliedAlpha?: boolean;
    preserveDrawingBuffer?: boolean;
    stencil?: boolean;
}

export interface EngineConfig {
    canvas: CanvasConfig;
}
