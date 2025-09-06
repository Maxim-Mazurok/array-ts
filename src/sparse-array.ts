export class SparseArray<T> implements Iterable<T | undefined> {
	private _arr: (T | undefined)[] = [];

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

	forEach(cb: (value: T | undefined, index: number, array: (T | undefined)[]) => void): void {
		this._arr.forEach(cb);
	}

	map<U>(cb: (value: T | undefined, index: number, array: (T | undefined)[]) => U): U[] {
		return this._arr.map(cb);
	}

	[Symbol.iterator](): Iterator<T | undefined> {
		return this._arr[Symbol.iterator]();
	}
}
