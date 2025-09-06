import { DenseArray } from "./dense-array.js";
import { SparseArray } from "./sparse-array.js";

/**
 * Type-level utility to check if a type is a dense array
 */
export type IsDenseArray<T> = T extends DenseArray<any> ? true : false;

/**
 * Type-level utility to check if a type is a sparse array
 */
export type IsSparseArray<T> = T extends SparseArray<any> ? true : false;

/**
 * Type-level utility to extract the element type from an array-ts type
 */
export type ElementType<T> =
  T extends DenseArray<infer U>
    ? U
    : T extends SparseArray<infer U>
      ? U
      : never;

/**
 * Type-level utility to convert native array type to dense array type
 */
export type AsDenseArray<T> = T extends readonly (infer U)[]
  ? DenseArray<U>
  : never;

/**
 * Type-level utility to convert native array type to sparse array type
 */
export type AsSparseArray<T> = T extends readonly (infer U)[]
  ? SparseArray<NonNullable<U>>
  : never;

/**
 * Zero-cost wrapper to treat a native array as dense (no runtime validation)
 * WARNING: Only use this if you're certain the array has no holes
 */
export function asDense<T>(array: T[]): DenseArray<T> {
  return DenseArray.from(array);
}

/**
 * Zero-cost wrapper to treat a native array as sparse
 */
export function asSparse<T>(array: (T | undefined)[]): SparseArray<T> {
  return SparseArray.from(array);
}

/**
 * Type predicate to check if a value is a DenseArray instance
 */
export function isDenseArray<T>(value: any): value is DenseArray<T> {
  return value instanceof DenseArray;
}

/**
 * Type predicate to check if a value is a SparseArray instance
 */
export function isSparseArray<T>(value: any): value is SparseArray<T> {
  return value instanceof SparseArray;
}

/**
 * Safely convert a native array to DenseArray, checking for holes
 * Returns undefined if holes are detected
 */
export function safeToDense<T>(array: T[]): DenseArray<T> | undefined {
  // Check for holes by comparing length with number of enumerable properties
  if (array.length !== Object.keys(array).length) {
    return undefined;
  }

  // Check for undefined values which would create logical holes
  for (let i = 0; i < array.length; i++) {
    if (array[i] === undefined) {
      return undefined;
    }
  }

  return DenseArray.from(array);
}
