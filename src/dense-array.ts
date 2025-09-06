export class DenseArray<T> implements Iterable<T> {
  private _arr: T[] = [];

  push(item: T): number {
    // NOTE: Can't support multiple items at once because that would require accepting arrays, which might have holes.
    // To provide compile-time safety against holes, we can't use runtime checks.
    return this._arr.push(item);
  }

  get(index: number): T | undefined {
    return this._arr[index];
  }

  get length(): number {
    return this._arr.length;
  }

  forEach(cb: (value: T, index: number, array: T[]) => void): void {
    this._arr.forEach(cb);
  }

  map<U>(cb: (value: T, index: number, array: T[]) => U): U[] {
    return this._arr.map(cb);
  }

  [Symbol.iterator](): Iterator<T> {
    return this._arr[Symbol.iterator]();
  }
}
