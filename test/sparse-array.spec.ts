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

  describe("join", () => {
    it("should join elements with default separator", () => {
      const sparseArray = new SparseArray<number>([1, undefined, 3]);
      expect(sparseArray.join()).toBe("1,,3");
    });

    it("should join elements with custom separator", () => {
      const sparseArray = new SparseArray<string>(["a", undefined, "c"]);
      expect(sparseArray.join(" - ")).toBe("a -  - c");
    });
  });

  describe("reverse", () => {
    it("should reverse the array in place", () => {
      const sparseArray = new SparseArray<number>([1, undefined, 3]);
      const result = sparseArray.reverse();

      expect(result).toBe(sparseArray); // Should return same instance
      expect(sparseArray.toArray()).toEqual([3, undefined, 1]);
    });
  });

  describe("sort", () => {
    it("should sort the array in place", () => {
      const sparseArray = new SparseArray<number>([3, undefined, 1]);
      const result = sparseArray.sort();

      expect(result).toBe(sparseArray); // Should return same instance
      // Note: undefined behavior with sort, but should maintain type safety
      expect(result).toBeInstanceOf(SparseArray);
    });
  });

  describe("reduce", () => {
    it("should reduce to a single value", () => {
      const sparseArray = new SparseArray<number>([1, undefined, 3]);
      const sum = sparseArray.reduce((acc, val) => acc + (val ?? 0), 0);

      expect(sum).toBe(4);
    });
  });

  describe("reduceRight", () => {
    it("should reduce from right to left", () => {
      const sparseArray = new SparseArray<string>(["a", undefined, "c"]);
      const result = sparseArray.reduceRight(
        (acc, val) => acc + (val ?? ""),
        "",
      );

      expect(result).toBe("ca");
    });
  });

  describe("some", () => {
    it("should return true if any element matches", () => {
      const sparseArray = new SparseArray<number>([1, undefined, 3]);

      expect(sparseArray.some((x) => x !== undefined && x > 2)).toBe(true);
      expect(sparseArray.some((x) => x !== undefined && x > 5)).toBe(false);
      expect(sparseArray.some((x) => x === undefined)).toBe(true);
    });
  });

  describe("every", () => {
    it("should return true if all elements match", () => {
      const sparseArray = new SparseArray<number>([2, undefined, 4]);

      expect(sparseArray.every((x) => x === undefined || x % 2 === 0)).toBe(
        true,
      );
      expect(sparseArray.every((x) => x !== undefined)).toBe(false);
    });
  });

  describe("concat", () => {
    it("should concatenate with other SparseArrays", () => {
      const sparseArray1 = new SparseArray<number>([1, undefined]);
      const sparseArray2 = new SparseArray<number>([3, 4]);

      const result = sparseArray1.concat(sparseArray2);
      expect(result.toArray()).toEqual([1, undefined, 3, 4]);
      expect(result).toBeInstanceOf(SparseArray);
      expect(result).not.toBe(sparseArray1); // Should be new instance
    });

    it("should concatenate multiple arrays", () => {
      const arr1 = SparseArray.from([1]);
      const arr2 = SparseArray.from([undefined]);
      const arr3 = SparseArray.from([3]);

      const result = arr1.concat(arr2, arr3);
      expect(result.toArray()).toEqual([1, undefined, 3]);
    });
  });
});
