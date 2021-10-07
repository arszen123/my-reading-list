import { Observer } from './observer';

export class Subject<T> {
  private observers: Observer<T>[] = [];

  private value?: T;

  next(value: T): void {
    this.value = value;
    this.notify();
  }

  private notify(): void {
    const { value } = this;
    if (value) {
      this.observers.forEach((observer) => {
        observer.notify(value);
      });
    }
  }

  register(observer: Observer<T>): void {
    this.observers.push(observer);
    if (this.value) {
      observer.notify(this.value);
    }
  }

  unregister(observer: Observer<T>): void {
    const newObservers = this.observers.filter((obs) => obs !== observer);
    this.observers = newObservers;
  }
}
