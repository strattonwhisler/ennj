declare module '*.glsl' {
    const content: string;
    export default content;
}

declare type Nullish<T> = T | null | undefined;

declare type WebGL = WebGL2RenderingContext;
