import { expectType } from 'tsd';
import { DenseArray, SparseArray } from '../index';

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
sparseArray2.set(0, 1);
sparseArray2.set(100, 2);
// @ts-expect-error
delete sparseArray2[100]; // Direct index access is not allowed, so you cannot delete an index
sparseArray2.set(100, undefined); // simulates delete
expectType<number | undefined>(sparseArray2.get(100)); // Correctly shows number | undefined


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
sparseArray3.set(0, 1);
sparseArray3.set(100, 2);
for (const el of sparseArray3) {
    expectType<number | undefined>(el); // Might be undefined, because it's sparse and might have "holes"
}
