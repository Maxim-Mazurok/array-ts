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

  toArray(): T[] {
    return [...this._arr];
  }

  filter(
    predicate: (value: T, index: number, array: T[]) => boolean,
  ): DenseArray<T> {
    const filtered = new DenseArray<T>();
    this._arr.forEach((value, index) => {
      if (predicate(value, index, this._arr)) {
        filtered.push(value);
      }
    });
    return filtered;
  }

  find(
    predicate: (value: T, index: number, array: T[]) => boolean,
  ): T | undefined {
    return this._arr.find(predicate);
  }

  findIndex(
    predicate: (value: T, index: number, array: T[]) => boolean,
  ): number {
    return this._arr.findIndex(predicate);
  }

  includes(searchElement: T): boolean {
    return this._arr.includes(searchElement);
  }

  indexOf(searchElement: T, fromIndex?: number): number {
    if (fromIndex !== undefined) {
      return this._arr.indexOf(searchElement, fromIndex);
    }
    return this._arr.indexOf(searchElement);
  }

  lastIndexOf(searchElement: T, fromIndex?: number): number {
    if (fromIndex !== undefined) {
      return this._arr.lastIndexOf(searchElement, fromIndex);
    }
    return this._arr.lastIndexOf(searchElement);
  }

  slice(start?: number, end?: number): DenseArray<T> {
    const sliced = new DenseArray<T>();
    const slicedArray = this._arr.slice(start, end);
    slicedArray.forEach((item) => sliced.push(item));
    return sliced;
  }

  static from<T>(arrayLike: T[]): DenseArray<T> {
    const dense = new DenseArray<T>();
    arrayLike.forEach((item) => dense.push(item));
    return dense;
  }

  join(separator?: string): string {
    return this._arr.join(separator);
  }

  reverse(): DenseArray<T> {
    this._arr.reverse();
    return this;
  }

  sort(compareFn?: (a: T, b: T) => number): DenseArray<T> {
    this._arr.sort(compareFn);
    return this;
  }

  reduce<U>(
    callback: (
      accumulator: U,
      currentValue: T,
      currentIndex: number,
      array: T[],
    ) => U,
    initialValue: U,
  ): U {
    return this._arr.reduce(callback, initialValue);
  }

  reduceRight<U>(
    callback: (
      accumulator: U,
      currentValue: T,
      currentIndex: number,
      array: T[],
    ) => U,
    initialValue: U,
  ): U {
    return this._arr.reduceRight(callback, initialValue);
  }

  some(predicate: (value: T, index: number, array: T[]) => boolean): boolean {
    return this._arr.some(predicate);
  }

  every(predicate: (value: T, index: number, array: T[]) => boolean): boolean {
    return this._arr.every(predicate);
  }

  concat(...arrays: DenseArray<T>[]): DenseArray<T> {
    const result = new DenseArray<T>();
    // Add current array elements
    this._arr.forEach((item) => result.push(item));
    // Add elements from other DenseArrays
    arrays.forEach((arr) => {
      arr.forEach((item) => result.push(item));
    });
    return result;
  }
}
