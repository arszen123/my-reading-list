export class Observer<T> {
  constructor(private readonly callback: (value: T) => void) {}

  notify(value: T): void {
    this.callback(value);
  }
}
