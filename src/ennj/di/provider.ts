import { Factory } from './factory';
import { Token } from './token';


export enum ProviderType {
    Token = 'token',
    Value = 'value',
    Class = 'class',
    Factory = 'factory',
    Null = 'null'
}

export interface TokenProvider<T> {
    type: ProviderType.Token;
    useToken: Token<T>;
}

export interface ValueProvider<T> {
    type: ProviderType.Value;
    useValue: T;
}

export interface ClassProvider<T> {
    type: ProviderType.Class;
    useClass: Klass<T>;
}

export interface FactoryProvider<T> {
    type: ProviderType.Factory;
    useFactory: Factory<T>;
}

export interface NullProvider<T> {
    type: ProviderType.Null;
}

export type Provider<T> =
    | TokenProvider<T>
    | ValueProvider<T>
    | ClassProvider<T>
    | FactoryProvider<T>
    | NullProvider<T>;

export function useToken<T, U extends T>(token: Token<T>): TokenProvider<T> {
    return {
        type: ProviderType.Token,
        useToken: token
    };
}

export function useValue<T>(value: T): ValueProvider<T> {
    return {
        type: ProviderType.Value,
        useValue: value
    };
}

export function useClass<T>(klass: Klass<T>): ClassProvider<T> {
    return {
        type: ProviderType.Class,
        useClass: klass
    };
}

export function useFactory<T>(factory: Factory<T>): FactoryProvider<T> {
    return {
        type: ProviderType.Factory,
        useFactory: factory
    };
}

export function useNull<T>(): NullProvider<T> {
    return {
        type: ProviderType.Null
    };
}
