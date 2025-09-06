# Array-TS

Type-safe array implementation for TypeScript.

The main goal is to differentiate between sparse and dense arrays, so you know when to expect `undefined`, and when you don't have to check for them.

## The Problem

```typescript
function getArrayWithHoles(): number[] {
  const myArray: number[] = [];
  myArray[2] = 777;
  return myArray; // [undefined, undefined, 777]
}

const myArray = getArrayWithHoles();
for (const arrayElement of myArray) {
  // type = number; but in reality it can be undefined!
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
import { ArrayTS, SparseArray, DenseArray } from "array-ts";

const array = new ArrayTS<number>();
array.push(1);
array.push(2);
array.push(3);

const sparseArray = new SparseArray<number>();
sparseArray[0] = 1;
sparseArray[100] = 2;

const denseArray = new DenseArray<number>();
denseArray.push(1);
denseArray.push(2);
denseArray.push(3);
```
