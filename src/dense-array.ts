export class DenseArray<T> implements Iterable<T> {
    private _arr: T[] = [];

    push(...items: T[]): number {
        for (const item of items) {
            if (typeof item === 'undefined') {
                throw new Error('DenseArray: Cannot push undefined.');
            }
        }
        return this._arr.push(...items);
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
