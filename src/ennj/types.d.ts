declare module '*.vs' {
    const content: string;
    export default content;
}

declare module '*.fs' {
    const content: string;
    export default content;
}

declare type Nullable<T> = T | null;

declare type Klass<T> = new(...args: Array<any>) => T;

declare type KClassDecorator<T> = (target: Klass<T>) => void;
declare type KMethodDecorator<T> =( target: Klass<T>, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare type KAccessorDecorator<T> = (target: Klass<T>, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare type KPropertyDecorator<T extends (...args: any) => any> = (...args: Parameters<T>) => void;
declare type KParameterDecorator<T> = (target: Klass<T>, propertyKey: string | symbol, parameterIndex: number) => void;
