import { describe, expect, it } from "vitest";
import { DenseArray } from "../src/dense-array";

describe("DenseArray", () => {
  describe("constructor and basic operations", () => {
    it("should create empty DenseArray", () => {
      const denseArray = new DenseArray<number>();
      expect(denseArray.length).toBe(0);
    });

    it("should support push and get operations", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(1);
      denseArray.push(2);
      expect(denseArray.get(0)).toBe(1);
      expect(denseArray.get(1)).toBe(2);
      expect(denseArray.length).toBe(2);
    });
  });

  describe("toArray", () => {
    it("should convert to native array", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(1);
      denseArray.push(2);
      denseArray.push(3);

      const nativeArray = denseArray.toArray();
      expect(nativeArray).toEqual([1, 2, 3]);
      expect(Array.isArray(nativeArray)).toBe(true);
    });

    it("should return empty array for empty DenseArray", () => {
      const denseArray = new DenseArray<number>();
      expect(denseArray.toArray()).toEqual([]);
    });
  });

  describe("filter", () => {
    it("should filter elements and return new DenseArray", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(1);
      denseArray.push(2);
      denseArray.push(3);
      denseArray.push(4);

      const filtered = denseArray.filter((x) => x % 2 === 0);
      expect(filtered.toArray()).toEqual([2, 4]);
      expect(filtered).toBeInstanceOf(DenseArray);
    });

    it("should return empty DenseArray when no elements match", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(1);
      denseArray.push(3);

      const filtered = denseArray.filter((x) => x % 2 === 0);
      expect(filtered.toArray()).toEqual([]);
      expect(filtered.length).toBe(0);
    });
  });

  describe("find", () => {
    it("should find existing element", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(1);
      denseArray.push(2);
      denseArray.push(3);

      expect(denseArray.find((x) => x === 2)).toBe(2);
    });

    it("should return undefined for non-existing element", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(1);
      denseArray.push(2);

      expect(denseArray.find((x) => x === 5)).toBeUndefined();
    });
  });

  describe("findIndex", () => {
    it("should find index of existing element", () => {
      const denseArray = new DenseArray<string>();
      denseArray.push("a");
      denseArray.push("b");
      denseArray.push("c");

      expect(denseArray.findIndex((x) => x === "b")).toBe(1);
    });

    it("should return -1 for non-existing element", () => {
      const denseArray = new DenseArray<string>();
      denseArray.push("a");
      denseArray.push("b");

      expect(denseArray.findIndex((x) => x === "z")).toBe(-1);
    });
  });

  describe("includes", () => {
    it("should return true for existing element", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(1);
      denseArray.push(2);

      expect(denseArray.includes(2)).toBe(true);
    });

    it("should return false for non-existing element", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(1);
      denseArray.push(2);

      expect(denseArray.includes(5)).toBe(false);
    });
  });

  describe("indexOf", () => {
    it("should return correct index for existing element", () => {
      const denseArray = new DenseArray<string>();
      denseArray.push("a");
      denseArray.push("b");
      denseArray.push("a");

      expect(denseArray.indexOf("a")).toBe(0);
      expect(denseArray.indexOf("b")).toBe(1);
    });

    it("should return -1 for non-existing element", () => {
      const denseArray = new DenseArray<string>();
      denseArray.push("a");

      expect(denseArray.indexOf("z")).toBe(-1);
    });

    it("should support fromIndex parameter", () => {
      const denseArray = new DenseArray<string>();
      denseArray.push("a");
      denseArray.push("b");
      denseArray.push("a");

      expect(denseArray.indexOf("a", 1)).toBe(2);
    });
  });

  describe("lastIndexOf", () => {
    it("should return last index for existing element", () => {
      const denseArray = new DenseArray<string>();
      denseArray.push("a");
      denseArray.push("b");
      denseArray.push("a");

      expect(denseArray.lastIndexOf("a")).toBe(2);
    });

    it("should return -1 for non-existing element", () => {
      const denseArray = new DenseArray<string>();
      denseArray.push("a");

      expect(denseArray.lastIndexOf("z")).toBe(-1);
    });
  });

  describe("slice", () => {
    it("should create new DenseArray with sliced elements", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(1);
      denseArray.push(2);
      denseArray.push(3);
      denseArray.push(4);

      const sliced = denseArray.slice(1, 3);
      expect(sliced.toArray()).toEqual([2, 3]);
      expect(sliced).toBeInstanceOf(DenseArray);
    });

    it("should work with default parameters", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(1);
      denseArray.push(2);
      denseArray.push(3);

      const sliced = denseArray.slice();
      expect(sliced.toArray()).toEqual([1, 2, 3]);
      expect(sliced).not.toBe(denseArray); // Should be a new instance
    });
  });

  describe("static from", () => {
    it("should create DenseArray from native array", () => {
      const nativeArray = [1, 2, 3];
      const denseArray = DenseArray.from(nativeArray);

      expect(denseArray.toArray()).toEqual([1, 2, 3]);
      expect(denseArray).toBeInstanceOf(DenseArray);
    });

    it("should handle empty array", () => {
      const denseArray = DenseArray.from([]);
      expect(denseArray.length).toBe(0);
    });
  });

  describe("join", () => {
    it("should join elements with default separator", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(1);
      denseArray.push(2);
      denseArray.push(3);

      expect(denseArray.join()).toBe("1,2,3");
    });

    it("should join elements with custom separator", () => {
      const denseArray = new DenseArray<string>();
      denseArray.push("a");
      denseArray.push("b");
      denseArray.push("c");

      expect(denseArray.join(" - ")).toBe("a - b - c");
    });
  });

  describe("reverse", () => {
    it("should reverse the array in place", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(1);
      denseArray.push(2);
      denseArray.push(3);

      const result = denseArray.reverse();
      expect(result).toBe(denseArray); // Should return same instance
      expect(denseArray.toArray()).toEqual([3, 2, 1]);
    });
  });

  describe("sort", () => {
    it("should sort the array in place", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(3);
      denseArray.push(1);
      denseArray.push(2);

      const result = denseArray.sort();
      expect(result).toBe(denseArray); // Should return same instance
      expect(denseArray.toArray()).toEqual([1, 2, 3]);
    });

    it("should sort with custom compareFn", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(1);
      denseArray.push(2);
      denseArray.push(3);

      denseArray.sort((a, b) => b - a); // Descending
      expect(denseArray.toArray()).toEqual([3, 2, 1]);
    });
  });

  describe("reduce", () => {
    it("should reduce to a single value", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(1);
      denseArray.push(2);
      denseArray.push(3);

      const sum = denseArray.reduce((acc, val) => acc + val, 0);
      expect(sum).toBe(6);
    });
  });

  describe("reduceRight", () => {
    it("should reduce from right to left", () => {
      const denseArray = new DenseArray<string>();
      denseArray.push("a");
      denseArray.push("b");
      denseArray.push("c");

      const result = denseArray.reduceRight((acc, val) => acc + val, "");
      expect(result).toBe("cba");
    });
  });

  describe("some", () => {
    it("should return true if any element matches", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(1);
      denseArray.push(2);
      denseArray.push(3);

      expect(denseArray.some((x) => x > 2)).toBe(true);
      expect(denseArray.some((x) => x > 5)).toBe(false);
    });
  });

  describe("every", () => {
    it("should return true if all elements match", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(2);
      denseArray.push(4);
      denseArray.push(6);

      expect(denseArray.every((x) => x % 2 === 0)).toBe(true);
      expect(denseArray.every((x) => x > 3)).toBe(false);
    });
  });

  describe("concat", () => {
    it("should concatenate with other DenseArrays", () => {
      const denseArray1 = new DenseArray<number>();
      denseArray1.push(1);
      denseArray1.push(2);

      const denseArray2 = new DenseArray<number>();
      denseArray2.push(3);
      denseArray2.push(4);

      const result = denseArray1.concat(denseArray2);
      expect(result.toArray()).toEqual([1, 2, 3, 4]);
      expect(result).toBeInstanceOf(DenseArray);
      expect(result).not.toBe(denseArray1); // Should be new instance
    });

    it("should concatenate multiple arrays", () => {
      const arr1 = DenseArray.from([1]);
      const arr2 = DenseArray.from([2]);
      const arr3 = DenseArray.from([3]);

      const result = arr1.concat(arr2, arr3);
      expect(result.toArray()).toEqual([1, 2, 3]);
    });
  });
});
