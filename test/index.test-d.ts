import { expectType } from "tsd";
import {
  DenseArray,
  SparseArray,
  ElementType,
  IsDenseArray,
  IsSparseArray,
  AsDenseArray,
  AsSparseArray,
} from "../index";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Problem #1: Direct index access always yields T, even if that index was never set (it should be T | undefined)
const array1 = new Array<number>();
expectType<number>(array1[100]); // Actually undefined, but TS thinks it's number

// Solution (dense):
const denseArray1 = new DenseArray<number>();
expectType<number | undefined>(denseArray1.get(100)); // Correctly shows number | undefined

// Solution (sparse):
const sparseArray1 = new SparseArray<number>();
expectType<number | undefined>(sparseArray1.get(100)); // Correctly shows number | undefined

//////////////////////////////////////////////////////////////////////////////////////
// Problem #2: Deleting an index does not change its type (it should be T | undefined)
const array2 = new Array<number>();
array2[0] = 1;
array2[100] = 2;
delete array2[100];
expectType<number>(array2[100]); // TS thinks he is smart, because it was defined above, but he doesn't know that we deleted it, so it should be undefined

// Solution (dense):
const denseArray2 = new DenseArray<number>();
denseArray2.push(1);
denseArray2.push(2);
// @ts-expect-error
delete denseArray2[1]; // Direct index access is not allowed, so you cannot delete an index
expectType<number | undefined>(denseArray2.get(1)); // Correctly shows number | undefined

// Solution (sparse):
const sparseArray2 = new SparseArray<number>();
sparseArray2.push(1);
sparseArray2.set(100, 2);
// @ts-expect-error
delete sparseArray2[100]; // Direct index access is not allowed, so you cannot delete an index
sparseArray2.set(100, undefined); // simulates delete
expectType<number | undefined>(sparseArray2.get(100)); // Correctly shows number | undefined

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Problem #3: Iterating over the array with for...of always yields T, even if some indices were never set (it should be T | undefined)
const array3 = new Array<number>();
array3[0] = 1;
array3[100] = 2;
for (const el of array3) {
  expectType<number>(el); // Actually undefined for most indices, but TS thinks it's number
}
// Solution (dense):
const denseArray3 = new DenseArray<number>();
denseArray3.push(1);
denseArray3.push(2);
for (const el of denseArray3) {
  expectType<number>(el); // Correctly shows number, because DenseArray cannot have undefined values
}
// Solution (sparse):
const sparseArray3 = new SparseArray<number>();
sparseArray3.push(1);
sparseArray3.set(100, 2);
for (const el of sparseArray3) {
  expectType<number | undefined>(el); // Might be undefined, because it's sparse and might have "holes"
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// New API Type Tests

// toArray() methods
const denseToArray = denseArray1.toArray();
expectType<number[]>(denseToArray);

const sparseToArray = sparseArray1.toArray();
expectType<(number | undefined)[]>(sparseToArray);

// filter() methods preserve array types
const denseFiltered = denseArray1.filter((x) => x > 0);
expectType<DenseArray<number>>(denseFiltered);

const sparseFiltered = sparseArray1.filter((x) => x !== undefined && x > 0);
expectType<SparseArray<number>>(sparseFiltered);

// find() methods
const denseFound = denseArray1.find((x) => x > 0);
expectType<number | undefined>(denseFound);

const sparseFound = sparseArray1.find((x) => x !== undefined && x > 0);
expectType<number | undefined>(sparseFound);

// slice() methods preserve array types
const denseSliced = denseArray1.slice(0, 2);
expectType<DenseArray<number>>(denseSliced);

const sparseSliced = sparseArray1.slice(0, 2);
expectType<SparseArray<number>>(sparseSliced);

// Static from() methods
const denseFromArray = DenseArray.from([1, 2, 3]);
expectType<DenseArray<number>>(denseFromArray);

const sparseFromArray = SparseArray.from([1, undefined, 3]);
expectType<SparseArray<number>>(sparseFromArray);

// Type-level utilities
expectType<true>(true as IsDenseArray<DenseArray<number>>);
expectType<false>(false as IsDenseArray<SparseArray<number>>);
expectType<false>(false as IsDenseArray<number[]>);

expectType<true>(true as IsSparseArray<SparseArray<number>>);
expectType<false>(false as IsSparseArray<DenseArray<number>>);
expectType<false>(false as IsSparseArray<number[]>);

expectType<number>(0 as ElementType<DenseArray<number>>);
expectType<string>("" as ElementType<SparseArray<string>>);

expectType<DenseArray<number>>(new DenseArray() as AsDenseArray<number[]>);
expectType<SparseArray<number>>(
  new SparseArray() as AsSparseArray<(number | undefined)[]>,
);

// New method return types
const denseJoined = denseArray1.join();
expectType<string>(denseJoined);

const denseReversed = denseArray1.reverse();
expectType<DenseArray<number>>(denseReversed);

const denseSorted = denseArray1.sort();
expectType<DenseArray<number>>(denseSorted);

const denseReduced = denseArray1.reduce((acc, val) => acc + val, 0);
expectType<number>(denseReduced);

const denseSome = denseArray1.some((x) => x > 0);
expectType<boolean>(denseSome);

const denseEvery = denseArray1.every((x) => x > 0);
expectType<boolean>(denseEvery);

const denseConcat = denseArray1.concat(new DenseArray<number>());
expectType<DenseArray<number>>(denseConcat);

// Sparse array method types
const sparseJoined = sparseArray1.join();
expectType<string>(sparseJoined);

const sparseReversed = sparseArray1.reverse();
expectType<SparseArray<number>>(sparseReversed);

const sparseSorted = sparseArray1.sort();
expectType<SparseArray<number>>(sparseSorted);

const sparseReduced = sparseArray1.reduce((acc, val) => acc + (val ?? 0), 0);
expectType<number>(sparseReduced);

const sparseSome = sparseArray1.some((x) => x === undefined);
expectType<boolean>(sparseSome);

const sparseEvery = sparseArray1.every((x) => x !== undefined);
expectType<boolean>(sparseEvery);

const sparseConcat = sparseArray1.concat(new SparseArray<number>());
expectType<SparseArray<number>>(sparseConcat);
