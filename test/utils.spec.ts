import { describe, expect, it } from "vitest";
import {
  DenseArray,
  SparseArray,
  asDense,
  asSparse,
  isDenseArray,
  isSparseArray,
  safeToDense,
} from "../index";

describe("Utils", () => {
  describe("asDense", () => {
    it("should create DenseArray from native array", () => {
      const nativeArray = [1, 2, 3];
      const denseArray = asDense(nativeArray);

      expect(denseArray).toBeInstanceOf(DenseArray);
      expect(denseArray.toArray()).toEqual([1, 2, 3]);
    });
  });

  describe("asSparse", () => {
    it("should create SparseArray from native array", () => {
      const nativeArray = [1, undefined, 3];
      const sparseArray = asSparse(nativeArray);

      expect(sparseArray).toBeInstanceOf(SparseArray);
      expect(sparseArray.toArray()).toEqual([1, undefined, 3]);
    });
  });

  describe("isDenseArray", () => {
    it("should return true for DenseArray instance", () => {
      const denseArray = new DenseArray<number>();
      expect(isDenseArray(denseArray)).toBe(true);
    });

    it("should return false for SparseArray instance", () => {
      const sparseArray = new SparseArray<number>();
      expect(isDenseArray(sparseArray)).toBe(false);
    });

    it("should return false for native array", () => {
      const nativeArray = [1, 2, 3];
      expect(isDenseArray(nativeArray)).toBe(false);
    });

    it("should return false for non-array values", () => {
      expect(isDenseArray(null)).toBe(false);
      expect(isDenseArray(undefined)).toBe(false);
      expect(isDenseArray({})).toBe(false);
      expect(isDenseArray("test")).toBe(false);
    });
  });

  describe("isSparseArray", () => {
    it("should return true for SparseArray instance", () => {
      const sparseArray = new SparseArray<number>();
      expect(isSparseArray(sparseArray)).toBe(true);
    });

    it("should return false for DenseArray instance", () => {
      const denseArray = new DenseArray<number>();
      expect(isSparseArray(denseArray)).toBe(false);
    });

    it("should return false for native array", () => {
      const nativeArray = [1, 2, 3];
      expect(isSparseArray(nativeArray)).toBe(false);
    });

    it("should return false for non-array values", () => {
      expect(isSparseArray(null)).toBe(false);
      expect(isSparseArray(undefined)).toBe(false);
      expect(isSparseArray({})).toBe(false);
      expect(isSparseArray("test")).toBe(false);
    });
  });

  describe("safeToDense", () => {
    it("should convert valid dense array", () => {
      const nativeArray = [1, 2, 3];
      const result = safeToDense(nativeArray);

      expect(result).toBeInstanceOf(DenseArray);
      expect(result?.toArray()).toEqual([1, 2, 3]);
    });

    it("should return undefined for array with undefined values", () => {
      const nativeArray = [1, undefined, 3];
      const result = safeToDense(nativeArray);

      expect(result).toBeUndefined();
    });

    it("should return undefined for sparse array with holes", () => {
      const nativeArray: number[] = [];
      nativeArray[0] = 1;
      nativeArray[2] = 3; // This creates a hole at index 1

      const result = safeToDense(nativeArray);
      expect(result).toBeUndefined();
    });

    it("should handle empty array", () => {
      const nativeArray: number[] = [];
      const result = safeToDense(nativeArray);

      expect(result).toBeInstanceOf(DenseArray);
      expect(result?.length).toBe(0);
    });
  });
});
