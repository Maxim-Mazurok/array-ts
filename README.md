# Array-TS

Type-safe array implementation for TypeScript.

The main goal is to differentiate between sparse and dense arrays, so you know when to expect `undefined`, and when you don't have to check for them.

## The Problem

TS doesn't differentiate between sparse and dense arrays. This can lead to unexpected `undefined` values in arrays that are expected to be dense (i.e., without holes).

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
import { SparseArray, DenseArray } from "array-ts";

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
