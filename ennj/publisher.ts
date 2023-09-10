export type Subscription = () => void;

export type Subscriber<T> = (value: T) => void;

export interface Subscribable<T> {
  subscribe(subscriber: Subscriber<T>): Subscription;
}

export class Publisher<T> implements Subscribable<T>{
  protected subscribers: Set<Subscriber<T>> = new Set();

  subscribe(subscriber: Subscriber<T>): Subscription {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  }

  publish(value: T): void {
    for (const subscriber of this.subscribers) {
      subscriber(value);
    }
  }

  asSubscribable(): Subscribable<T> {
    return {
      subscribe: this.subscribe.bind(this)
    };
  }
}
