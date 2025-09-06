# Array-TS

Type-first dense vs sparse array abstractions for TypeScript.

Goal: Let the type system tell you when `undefined` is possible. No reliance on runtime hole or `undefined` detection for correctness; correctness is encoded in the APIs you can call.

## The Problem

TypeScript's native `Array<T>` (or `T[]`) does not distinguish between a logically dense sequence and a sparse structure with holes. That means both indexed access and iteration claim `T` even when runtime values are missing (`T | undefined` is possible in reality).

```typescript
function getArrayWithHoles(): number[] {
  const myArray: number[] = [];
  myArray[2] = 777;
  return myArray; // [undefined, undefined, 777]
}

const myArray = getArrayWithHoles();
for (const arrayElement of myArray) {
  // type = number; but in reality it can be undefined!!!
  type justNumber = typeof arrayElement;

  console.log(arrayElement);
  // 1st iteration: undefined
  // 2nd iteration: undefined
  // 3rd iteration: 777
}
```

## Installation

```bash
npm install array-ts
```

## Usage

```typescript
import { DenseArray, SparseArray } from "array-ts";

const sparseArray = new SparseArray<number>([1, undefined, 3]);
sparseArray.push(1);
sparseArray.set(8, 777); // add 777 at index 8, leaving holes
for (const arrayElement of sparseArray) {
  // type = number | undefined; as expected
  type numberOrUndefined = typeof arrayElement;
}

const denseArray = new DenseArray<number>();
denseArray.push(1);
denseArray.push(2);
denseArray.push(3); // no holes allowed
for (const arrayElement of denseArray) {
  // type = number; as expected
  type justNumber = typeof arrayElement;
}
```

### Rich API

Both `DenseArray` and `SparseArray` provide a comprehensive set of methods:

```typescript
// Creating arrays
const dense = new DenseArray<number>();
const sparse = new SparseArray<string>(["a", undefined, "c"]);

// Convert from native arrays
const denseFromArray = DenseArray.from([1, 2, 3]);
const sparseFromArray = SparseArray.from([1, undefined, 3]);

// Convert back to native arrays
const nativeArray = dense.toArray(); // number[]
const sparseNativeArray = sparse.toArray(); // (string | undefined)[]

// Functional operations (maintain type safety)
const filtered = dense.filter((x) => x > 1); // DenseArray<number>
const found = sparse.find((x) => x === "a"); // string | undefined
const index = dense.findIndex((x) => x === 2); // number

// Search operations
const hasValue = dense.includes(2); // boolean
const firstIndex = sparse.indexOf("a"); // number
const lastIndex = sparse.lastIndexOf("a"); // number

// Subarray operations
const sliced = dense.slice(1, 3); // DenseArray<number>
const sparseSliced = sparse.slice(0, 2); // SparseArray<string>

// Array operations that maintain type safety
const joined = dense.join(", "); // "1, 2, 3"
const reversed = dense.reverse(); // Mutates and returns same instance
const sorted = dense.sort((a, b) => b - a); // Custom sort

// Functional operations
const sum = dense.reduce((acc, val) => acc + val, 0); // number
const hasPositive = dense.some((x) => x > 0); // boolean
const allPositive = dense.every((x) => x > 0); // boolean

// Concatenation (type-safe)
const otherDense = DenseArray.from([4, 5, 6]);
const combined = dense.concat(otherDense); // DenseArray<number>

// Sparse-specific operations
sparse.clear(); // empty the array
sparse.delete(1); // set index 1 to undefined
```

### Bridging with Native Arrays

```typescript
import {
  asDense,
  asSparse,
  safeToDense,
  isDenseArray,
  isSparseArray,
} from "array-ts";

// Zero-cost wrappers (use with caution for asDense)
const nativeArray = [1, 2, 3];
const denseWrapper = asDense(nativeArray); // DenseArray<number>
const sparseWrapper = asSparse([1, undefined, 3]); // SparseArray<number>

// Safe conversion with hole detection
const maybeDense = safeToDense([1, 2, 3]); // DenseArray<number>
const notDense = safeToDense([1, undefined, 3]); // undefined

// Type guards
if (isDenseArray(someArray)) {
  // someArray is DenseArray<T>
}
if (isSparseArray(someArray)) {
  // someArray is SparseArray<T>
}
```

### Type-Level Utilities

```typescript
import type {
  ElementType,
  IsDenseArray,
  IsSparseArray,
  AsDenseArray,
  AsSparseArray,
} from "array-ts";

// Extract element types
type NumberType = ElementType<DenseArray<number>>; // number
type StringType = ElementType<SparseArray<string>>; // string

// Type predicates
type IsDense = IsDenseArray<DenseArray<number>>; // true
type IsSparse = IsSparseArray<SparseArray<string>>; // true

// Type conversions
type DenseFromNative = AsDenseArray<number[]>; // DenseArray<number>
type SparseFromNative = AsSparseArray<(string | undefined)[]>; // SparseArray<string>
```
