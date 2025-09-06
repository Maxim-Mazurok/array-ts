export class SparseArray<T> implements Iterable<T | undefined> {
  private _arr: (T | undefined)[] = [];

  constructor(initialValues?: (T | undefined)[]) {
    if (initialValues) {
      this._arr = initialValues;
    }
  }

  push(...items: (T | undefined)[]): number {
    return this._arr.push(...items);
  }

  set(index: number, value: T | undefined): void {
    this._arr[index] = value;
  }

  get(index: number): T | undefined {
    return this._arr[index];
  }

  get length(): number {
    return this._arr.length;
  }

  forEach(
    cb: (value: T | undefined, index: number, array: (T | undefined)[]) => void,
  ): void {
    this._arr.forEach(cb);
  }

  map<U>(
    cb: (value: T | undefined, index: number, array: (T | undefined)[]) => U,
  ): U[] {
    return this._arr.map(cb);
  }

  [Symbol.iterator](): Iterator<T | undefined> {
    return this._arr[Symbol.iterator]();
  }

  toArray(): (T | undefined)[] {
    return [...this._arr];
  }

  filter(
    predicate: (
      value: T | undefined,
      index: number,
      array: (T | undefined)[],
    ) => boolean,
  ): SparseArray<T> {
    const filtered = new SparseArray<T>();
    this._arr.forEach((value, index) => {
      if (predicate(value, index, this._arr)) {
        filtered.push(value);
      }
    });
    return filtered;
  }

  find(
    predicate: (
      value: T | undefined,
      index: number,
      array: (T | undefined)[],
    ) => boolean,
  ): T | undefined {
    return this._arr.find(predicate);
  }

  findIndex(
    predicate: (
      value: T | undefined,
      index: number,
      array: (T | undefined)[],
    ) => boolean,
  ): number {
    return this._arr.findIndex(predicate);
  }

  includes(searchElement: T | undefined): boolean {
    return this._arr.includes(searchElement);
  }

  indexOf(searchElement: T | undefined, fromIndex?: number): number {
    if (fromIndex !== undefined) {
      return this._arr.indexOf(searchElement, fromIndex);
    }
    return this._arr.indexOf(searchElement);
  }

  lastIndexOf(searchElement: T | undefined, fromIndex?: number): number {
    if (fromIndex !== undefined) {
      return this._arr.lastIndexOf(searchElement, fromIndex);
    }
    return this._arr.lastIndexOf(searchElement);
  }

  slice(start?: number, end?: number): SparseArray<T> {
    const sliced = new SparseArray<T>();
    const slicedArray = this._arr.slice(start, end);
    sliced._arr = slicedArray;
    return sliced;
  }

  clear(): void {
    this._arr.length = 0;
  }

  delete(index: number): void {
    this.set(index, undefined);
  }

  static from<T>(arrayLike: (T | undefined)[]): SparseArray<T> {
    return new SparseArray<T>(arrayLike);
  }
}
