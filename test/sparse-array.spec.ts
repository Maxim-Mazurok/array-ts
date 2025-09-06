import { describe, expect, it } from "vitest";
import { SparseArray } from "../src/sparse-array";

describe("SparseArray", () => {
  describe("constructor and basic operations", () => {
    it("should create SparseArray with initial values", () => {
      const sparseArray = new SparseArray<number>([1, undefined, 3]);
      expect(sparseArray.length).toBe(3);
      expect(sparseArray.get(0)).toBe(1);
      expect(sparseArray.get(1)).toBeUndefined();
      expect(sparseArray.get(2)).toBe(3);
    });

    it("should create empty SparseArray", () => {
      const sparseArray = new SparseArray<number>();
      expect(sparseArray.length).toBe(0);
    });

    it("should support push and set operations", () => {
      const sparseArray = new SparseArray<number>();
      sparseArray.push(1, undefined, 3);
      expect(sparseArray.length).toBe(3);
      expect(sparseArray.get(0)).toBe(1);
      expect(sparseArray.get(1)).toBeUndefined();
      expect(sparseArray.get(2)).toBe(3);
    });
  });

  describe("toArray", () => {
    it("should convert to native array preserving holes", () => {
      const sparseArray = new SparseArray<number>([1, undefined, 3]);
      const nativeArray = sparseArray.toArray();

      expect(nativeArray).toEqual([1, undefined, 3]);
      expect(Array.isArray(nativeArray)).toBe(true);
    });

    it("should return empty array for empty SparseArray", () => {
      const sparseArray = new SparseArray<number>();
      expect(sparseArray.toArray()).toEqual([]);
    });
  });

  describe("filter", () => {
    it("should filter elements and return new SparseArray", () => {
      const sparseArray = new SparseArray<number>([1, 2, undefined, 4]);
      const filtered = sparseArray.filter(
        (x) => x !== undefined && x % 2 === 0,
      );

      expect(filtered.toArray()).toEqual([2, 4]);
      expect(filtered).toBeInstanceOf(SparseArray);
    });

    it("should handle filtering with undefined values", () => {
      const sparseArray = new SparseArray<number>([1, undefined, 3]);
      const filtered = sparseArray.filter((x) => x === undefined);

      expect(filtered.toArray()).toEqual([undefined]);
    });
  });

  describe("find", () => {
    it("should find existing element", () => {
      const sparseArray = new SparseArray<number>([1, undefined, 3]);
      expect(sparseArray.find((x) => x === 3)).toBe(3);
    });

    it("should find undefined", () => {
      const sparseArray = new SparseArray<number>([1, undefined, 3]);
      expect(sparseArray.find((x) => x === undefined)).toBeUndefined();
    });

    it("should return undefined for non-existing element", () => {
      const sparseArray = new SparseArray<number>([1, 2]);
      expect(sparseArray.find((x) => x === 5)).toBeUndefined();
    });
  });

  describe("findIndex", () => {
    it("should find index of existing element", () => {
      const sparseArray = new SparseArray<string>(["a", undefined, "c"]);
      expect(sparseArray.findIndex((x) => x === "c")).toBe(2);
    });

    it("should find index of undefined", () => {
      const sparseArray = new SparseArray<string>(["a", undefined, "c"]);
      expect(sparseArray.findIndex((x) => x === undefined)).toBe(1);
    });

    it("should return -1 for non-existing element", () => {
      const sparseArray = new SparseArray<string>(["a", "b"]);
      expect(sparseArray.findIndex((x) => x === "z")).toBe(-1);
    });
  });

  describe("includes", () => {
    it("should return true for existing element", () => {
      const sparseArray = new SparseArray<number>([1, undefined, 3]);
      expect(sparseArray.includes(3)).toBe(true);
    });

    it("should return true for undefined", () => {
      const sparseArray = new SparseArray<number>([1, undefined, 3]);
      expect(sparseArray.includes(undefined)).toBe(true);
    });

    it("should return false for non-existing element", () => {
      const sparseArray = new SparseArray<number>([1, 2]);
      expect(sparseArray.includes(5)).toBe(false);
    });
  });

  describe("indexOf", () => {
    it("should return correct index for existing element", () => {
      const sparseArray = new SparseArray<string>(["a", undefined, "a"]);
      expect(sparseArray.indexOf("a")).toBe(0);
      expect(sparseArray.indexOf(undefined)).toBe(1);
    });

    it("should return -1 for non-existing element", () => {
      const sparseArray = new SparseArray<string>(["a"]);
      expect(sparseArray.indexOf("z")).toBe(-1);
    });

    it("should support fromIndex parameter", () => {
      const sparseArray = new SparseArray<string>(["a", undefined, "a"]);
      expect(sparseArray.indexOf("a", 1)).toBe(2);
    });
  });

  describe("lastIndexOf", () => {
    it("should return last index for existing element", () => {
      const sparseArray = new SparseArray<string>(["a", undefined, "a"]);
      expect(sparseArray.lastIndexOf("a")).toBe(2);
    });

    it("should return -1 for non-existing element", () => {
      const sparseArray = new SparseArray<string>(["a"]);
      expect(sparseArray.lastIndexOf("z")).toBe(-1);
    });
  });

  describe("slice", () => {
    it("should create new SparseArray with sliced elements", () => {
      const sparseArray = new SparseArray<number>([1, undefined, 3, 4]);
      const sliced = sparseArray.slice(1, 3);

      expect(sliced.toArray()).toEqual([undefined, 3]);
      expect(sliced).toBeInstanceOf(SparseArray);
    });

    it("should work with default parameters", () => {
      const sparseArray = new SparseArray<number>([1, undefined, 3]);
      const sliced = sparseArray.slice();

      expect(sliced.toArray()).toEqual([1, undefined, 3]);
      expect(sliced).not.toBe(sparseArray); // Should be a new instance
    });
  });

  describe("clear", () => {
    it("should clear all elements", () => {
      const sparseArray = new SparseArray<number>([1, undefined, 3]);
      sparseArray.clear();

      expect(sparseArray.length).toBe(0);
      expect(sparseArray.toArray()).toEqual([]);
    });
  });

  describe("delete", () => {
    it("should set element to undefined", () => {
      const sparseArray = new SparseArray<number>([1, 2, 3]);
      sparseArray.delete(1);

      expect(sparseArray.get(1)).toBeUndefined();
      expect(sparseArray.toArray()).toEqual([1, undefined, 3]);
    });
  });

  describe("static from", () => {
    it("should create SparseArray from native array", () => {
      const nativeArray = [1, undefined, 3];
      const sparseArray = SparseArray.from(nativeArray);

      expect(sparseArray.toArray()).toEqual([1, undefined, 3]);
      expect(sparseArray).toBeInstanceOf(SparseArray);
    });

    it("should handle empty array", () => {
      const sparseArray = SparseArray.from([]);
      expect(sparseArray.length).toBe(0);
    });
  });
});
