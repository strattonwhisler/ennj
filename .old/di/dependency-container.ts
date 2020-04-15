import { Token } from './token';
import {
    ClassProvider, FactoryProvider,
    isClassProvider,
    isFactoryProvider,
    isTokenProvider,
    isValueProvider,
    Provider, TokenProvider,
    ValueProvider
} from './provider';
import { Logger } from '../../src/ennj/core/logger';
import { getTokenTypes } from './helpers';


const logger = new Logger('di');

export enum LifeTime {
    Instanced,
    Singleton
}

interface DependencyOptions {
    lifetime: LifeTime;
}

class Dependency<T> {
    public instance: Nullable<T> = null;

    constructor(
        public token: Token<T>,
        public provider: Provider<T>,
        public lifetime: LifeTime = LifeTime.Instanced
    ) {
    }
}

export const REFLECT_DI_TOKENTYPES = 'di:tokentypes';

export class DependencyContainer {
    private dependencies: Map<Token<unknown>, Dependency<unknown>>;

    constructor() {
        this.dependencies = new Map();
    }

    public register<T>(token: Token<T>, provider: Provider<T>, options?: DependencyOptions): void {
        this.dependencies.set(token, new Dependency<T>(
            token,
            provider,
            options?.lifetime
        ));
    }

    public resolve<T>(token: Token<T>): T {
        const dependency = this.dependencies.get(token) as Dependency<T>;

        if(!dependency) {
            throw new Error(`No registered provider for token '${token?.toString()}'!`);
        }
        switch(true) {
            case isTokenProvider(dependency.provider):
                return this.resolveToken<T>(dependency);
            case isValueProvider(dependency.provider):
                return this.resolveValue<T>(dependency);
            case isClassProvider(dependency.provider):
                return this.resolveClass<T>(dependency);
            case isFactoryProvider(dependency.provider):
                return this.resolveFactory<T>(dependency);
            default:
                throw new Error(`Unknown token type for token '${token?.toString()}'!`);
        }
    }

    private resolveToken<T>(dependency: Dependency<T>): T {
        const token = (dependency.provider as TokenProvider<T>).useToken;
        return this.resolve(token);
    }

    private resolveValue<T>(dependency: Dependency<T>): T {
        const value = (dependency.provider as ValueProvider<T>).useValue;
        return value;
    }

    private resolveClass<T>(dependency: Dependency<T>): T {
        if (!!dependency.instance) {
            return dependency.instance;
        }

        const klass = (dependency.provider as ClassProvider<T>).useClass;
        const instance = this.construct(klass);

        if (dependency.lifetime === LifeTime.Singleton) {
            dependency.instance = instance;
        }

        return instance;
    }

    private resolveFactory<T>(dependency: Dependency<T>): T {
        if (!!dependency.instance) {
            return dependency.instance;
        }

        const factory = (dependency.provider as FactoryProvider<T>).useFactory;
        const instance = factory(this);

        if (dependency.lifetime === LifeTime.Singleton) {
            dependency.instance = instance;
        }

        return instance;
    }

    public construct<T>(klass: Klass<T>) {
        const tokenTypes = getTokenTypes(klass);

        const params: Array<unknown> = [];
        tokenTypes.forEach((token, index) => {
            params[index] = this.resolve(token);
        });

        return new klass(...params);
    }
}

export default new DependencyContainer();
