import { Token } from './token';
import { Scope } from './scope';
import { Factory } from './factory';
import {
    ClassProvider, FactoryProvider,
    NullProvider,
    Provider, ProviderType,
    TokenProvider,
    useClass,
    useFactory,
    useNull,
    useToken,
    useValue,
    ValueProvider
} from './provider';
import { getTokenTypes } from './di-helpers';


export class Binding<T> {
    constructor(
        token: Token<T>
    ) {
        this.token = token;
        this.provider = useNull();
        this.instance = null;
        this.scope = Scope.Transient;
    }

    public token: Token<T>;
    public provider: Provider<T>;
    public instance: Nullable<T>;
    public scope: Scope;
}

export namespace Binding {
    export class Builder<T> {
        constructor(
            private binding: Binding<T>
        ) {
        }

        /**
         * Sets the scope on the binding
         */
        public withScope(scope: Scope): this {
            this.binding.scope = scope;
            return this;
        }
    }

    export class ToBuilder<T> {
        constructor(
            private binding: Binding<T>
        ) {
        }

        /**
         * Uses the token as the provider
         *
         * @param token
         */
        public toToken(token: Token<T>): Builder<T> {
            this.binding.provider = useToken(token);
            return new Builder<T>(this.binding);
        }

        /**
         * Uses the value as the provider
         *
         * @param value
         */
        public toValue(value: T): Builder<T> {
            this.binding.provider = useValue(value);
            return new Builder<T>(this.binding);
        }

        /**
         * Uses the class as the provider
         *
         * @param klass
         */
        public toClass(klass: Klass<T>): Builder<T> {
            this.binding.provider = useClass(klass);
            return new Builder<T>(this.binding);
        }

        /**
         * Uses the factory as the provider
         *
         * @param factory
         */
        public toFactory(factory: Factory<T>): Builder<T> {
            this.binding.provider = useFactory(factory);
            return new Builder<T>(this.binding);
        }

        /**
         * Uses null as the provider
         */
        public toNull(): void {
            this.binding.provider = useNull();
        }
    }
}

function print<T>(token: Token<T>): string {
    if(token instanceof Symbol) {
        return token.toString();
    } else if(token instanceof Function) {
        return `Class ${token.name}`;
    } else {
        return token.toString();
    }
}

export class Container {
    private bindings: Map<Token<any>, Binding<any>>;

    constructor() {
        this.bindings = new Map<Token<any>, Binding<any>>();
    }

    /**
     * Binds a token
     *
     * @param token Token to bind.
     */
    public bind<T>(token: Token<T>): Binding.ToBuilder<T> {
        if(this.bindings.has(token)) {
            throw new Error(`Token '${print(token)}' already registered. Use Container.rebind if this is intentional.`);
        }

        const binding = new Binding<T>(token);
        this.bindings.set(token, binding);

        return new Binding.ToBuilder<T>(binding);
    }

    /**
     * Rebinds a token
     *
     * @param token Token to bind.
     */
    public rebind<T>(token: Token<T>): Binding.ToBuilder<T> {
        if(!this.bindings.has(token)) {
            throw new Error(`Token '${print(token)}' is not registered.`);
        }

        const binding = new Binding<T>(token);
        this.bindings.set(token, binding);

        return new Binding.ToBuilder<T>(binding);
    }

    /**
     * Unbinds a token
     *
     * @param token Token to unbind.
     */
    public unbind<T>(token: Token<T>): void {
        if(!this.bindings.has(token)) {
            throw new Error(`Token '${print(token)}' is not registered.`);
        }

        this.bindings.delete(token);
    }

    /**
     * Clears all bindings.
     */
    public reset(): void {
        this.bindings.clear();
    }

    /**
     *  Finds is a token is bound.
     *
     * @param token Token to find a binding for.
     */
    public isBound<T>(token: Token<T>): boolean {
        return this.bindings.has(token);
    }

    /**
     * Resolves a token.
     *
     * @param token Token to resolve.
     */
    public get<T>(token: Token<T>): T {
        return this.resolveToken(token);
    }

    /**
     * Resolves a class
     *
     * @param klass Class to resolve.
     */
    public resolve<T>(klass: Klass<T>): T {
        return this.construct(klass);
    }

    private resolveToken<T>(token: Token<T>): T {
        if(!this.bindings.has(token)) {
            throw new Error(`No registered binding for token '${print(token)}'!`);
        }

        const binding = this.bindings.get(token) as Binding<T>;

        switch(binding.provider.type) {
            case ProviderType.Null:
                return this.resolveNullProvider(binding);
            case ProviderType.Token:
                return this.resolveTokenProvider(binding);
            case ProviderType.Value:
                return this.resolveValueProvider(binding);
            case ProviderType.Class:
                return this.resolveClassProvider(binding);
            case ProviderType.Factory:
                return this.resolveFactoryProvider(binding);
            default:
                throw new Error(`Unknown provider type for binding '${print(token)}'!`);
        }
    }

    private resolveTokenProvider<T, U extends TokenProvider<T>>(binding: Binding<T>): T {
        return this.resolveToken((binding.provider as U).useToken);
    }

    private resolveValueProvider<T, U extends ValueProvider<T>>(binding: Binding<T>): T {
        return (binding.provider as U).useValue;
    }

    private resolveClassProvider<T, U extends ClassProvider<T>>(binding: Binding<T>): T {
        return this.checkSingleton(binding, () => {
            const klass = (binding.provider as U).useClass;
            return this.construct(klass);
        });
    }

    private resolveFactoryProvider<T, U extends FactoryProvider<T>>(binding: Binding<T>): T {
        return this.checkSingleton(binding, () => {
            const factory = (binding.provider as U).useFactory;
            return factory(this);
        });
    }

    private resolveNullProvider<T>(binding: Binding<T>): never {
        throw new Error(`Unable to resolve null provider for token '${print(binding.token)}!'`);
    }

    private checkSingleton<T>(binding: Binding<T>, construct: () => T): T {
        if(binding.instance !== null) {
            return binding.instance;
        }

        const instance = construct();

        if(binding.scope === Scope.Singleton) {
            binding.instance = instance;
        }

        return instance;
    }

    private construct<T>(klass: Klass<T>): T {
        const paramTokens = getTokenTypes(klass);

        const params: ConstructorParameters<typeof klass> = [];

        paramTokens.forEach((token, index) => {
            params[index] = this.resolveToken(token);
        });

        return new klass(...params);
    }
}
