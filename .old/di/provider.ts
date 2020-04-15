import { Token } from './token';
import { DependencyContainer } from './dependency-container';


export type ProviderFactory<T> = (container: DependencyContainer) => T;

export interface ValueProvider<T> {
    useValue: T
}

export interface ClassProvider<T> {
    useClass: Klass<T>
}

export interface FactoryProvider<T> {
    useFactory: ProviderFactory<T>
}

export interface TokenProvider<T> {
    useToken: Token<T>
}

export type Provider<T> =
    | ValueProvider<T>
    | ClassProvider<T>
    | FactoryProvider<T>
    | TokenProvider<T>;

export function useValue<T>(value: T): ValueProvider<T> {
    return { useValue: value };
}

export function useClass<T>(klass: Klass<T>): ClassProvider<T> {
    return { useClass: klass };
}

export function useFactory<T>(factory: ProviderFactory<T>): FactoryProvider<T> {
    return { useFactory: factory };
}

export function useToken<T, U extends T>(token: Token<T>): TokenProvider<T> {
    return { useToken: token };
}

export function isValueProvider<T>(provider: Provider<T>): boolean {
    return 'useValue' in provider;
}

export function isClassProvider<T>(provider: Provider<T>): boolean {
    return 'useClass' in provider;
}

export function isFactoryProvider<T>(provider: Provider<T>): boolean {
    return 'useFactory' in provider;
}

export function isTokenProvider<T>(provider: Provider<T>): boolean {
    return 'useToken' in provider;
}
