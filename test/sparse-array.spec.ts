import { describe, expect, it } from "vitest";
import { SparseArray } from "../src/sparse-array";

describe("SparseArray", () => {
  describe("constructor", () => {
    it("should create SparseArray with initial values", () => {
      const sparseArray = new SparseArray<number>([1, undefined, 3]);
      expect(sparseArray.length).toBe(3);
      expect(sparseArray.get(0)).toBe(1);
      expect(sparseArray.get(1)).toBeUndefined();
      expect(sparseArray.get(2)).toBe(3);
    });

    it("should create empty SparseArray when no initial values provided", () => {
      const sparseArray = new SparseArray<string>();
      expect(sparseArray.length).toBe(0);
    });

    it("should create SparseArray with all undefined values", () => {
      const sparseArray = new SparseArray<number>([
        undefined,
        undefined,
        undefined,
      ]);
      expect(sparseArray.length).toBe(3);
      expect(sparseArray.get(0)).toBeUndefined();
      expect(sparseArray.get(1)).toBeUndefined();
      expect(sparseArray.get(2)).toBeUndefined();
    });

    it("should create SparseArray with mixed types", () => {
      const sparseArray = new SparseArray<string | number>([
        "hello",
        42,
        undefined,
        "world",
      ]);
      expect(sparseArray.length).toBe(4);
      expect(sparseArray.get(0)).toBe("hello");
      expect(sparseArray.get(1)).toBe(42);
      expect(sparseArray.get(2)).toBeUndefined();
      expect(sparseArray.get(3)).toBe("world");
    });
  });

  describe("push method", () => {
    it("should push single item and return new length", () => {
      const sparseArray = new SparseArray<number>();
      const newLength = sparseArray.push(42);
      expect(newLength).toBe(1);
      expect(sparseArray.length).toBe(1);
      expect(sparseArray.get(0)).toBe(42);
    });

    it("should push multiple items and return new length", () => {
      const sparseArray = new SparseArray<number>();
      const newLength = sparseArray.push(1, 2, 3);
      expect(newLength).toBe(3);
      expect(sparseArray.length).toBe(3);
      expect(sparseArray.get(0)).toBe(1);
      expect(sparseArray.get(1)).toBe(2);
      expect(sparseArray.get(2)).toBe(3);
    });

    it("should push undefined values", () => {
      const sparseArray = new SparseArray<number>();
      const newLength = sparseArray.push(1, undefined, 3);
      expect(newLength).toBe(3);
      expect(sparseArray.length).toBe(3);
      expect(sparseArray.get(0)).toBe(1);
      expect(sparseArray.get(1)).toBeUndefined();
      expect(sparseArray.get(2)).toBe(3);
    });

    it("should push to existing array", () => {
      const sparseArray = new SparseArray<string>(["a", "b"]);
      const newLength = sparseArray.push("c", undefined, "d");
      expect(newLength).toBe(5);
      expect(sparseArray.length).toBe(5);
      expect(sparseArray.get(2)).toBe("c");
      expect(sparseArray.get(3)).toBeUndefined();
      expect(sparseArray.get(4)).toBe("d");
    });
  });

  describe("set method", () => {
    it("should set value at specific index", () => {
      const sparseArray = new SparseArray<number>([1, 2, 3]);
      sparseArray.set(1, 42);
      expect(sparseArray.get(1)).toBe(42);
      expect(sparseArray.length).toBe(3);
    });

    it("should set undefined value", () => {
      const sparseArray = new SparseArray<number>([1, 2, 3]);
      sparseArray.set(1, undefined);
      expect(sparseArray.get(1)).toBeUndefined();
      expect(sparseArray.length).toBe(3);
    });

    it("should expand array when setting beyond current length", () => {
      const sparseArray = new SparseArray<number>([1, 2]);
      sparseArray.set(5, 42);
      expect(sparseArray.length).toBe(6);
      expect(sparseArray.get(5)).toBe(42);
      expect(sparseArray.get(2)).toBeUndefined(); // hole
      expect(sparseArray.get(3)).toBeUndefined(); // hole
      expect(sparseArray.get(4)).toBeUndefined(); // hole
    });

    it("should set value at index 0", () => {
      const sparseArray = new SparseArray<string>();
      sparseArray.set(0, "first");
      expect(sparseArray.length).toBe(1);
      expect(sparseArray.get(0)).toBe("first");
    });
  });

  describe("get method", () => {
    it("should return undefined for out-of-bounds positive index", () => {
      const sparseArray = new SparseArray<number>([1, 2, 3]);
      expect(sparseArray.get(10)).toBeUndefined();
    });

    it("should return undefined for negative index", () => {
      const sparseArray = new SparseArray<number>([1, 2, 3]);
      expect(sparseArray.get(-1)).toBeUndefined();
    });

    it("should return undefined for empty array", () => {
      const sparseArray = new SparseArray<number>();
      expect(sparseArray.get(0)).toBeUndefined();
    });

    it("should handle holes correctly", () => {
      const sparseArray = new SparseArray<number>();
      sparseArray.set(0, 1);
      sparseArray.set(5, 2);
      expect(sparseArray.get(0)).toBe(1);
      expect(sparseArray.get(1)).toBeUndefined();
      expect(sparseArray.get(2)).toBeUndefined();
      expect(sparseArray.get(3)).toBeUndefined();
      expect(sparseArray.get(4)).toBeUndefined();
      expect(sparseArray.get(5)).toBe(2);
    });
  });

  describe("length property", () => {
    it("should return 0 for empty array", () => {
      const sparseArray = new SparseArray<number>();
      expect(sparseArray.length).toBe(0);
    });

    it("should update length after push operations", () => {
      const sparseArray = new SparseArray<number>();
      expect(sparseArray.length).toBe(0);
      sparseArray.push(1);
      expect(sparseArray.length).toBe(1);
      sparseArray.push(2, 3);
      expect(sparseArray.length).toBe(3);
    });

    it("should update length after set operations beyond current length", () => {
      const sparseArray = new SparseArray<number>([1, 2]);
      expect(sparseArray.length).toBe(2);
      sparseArray.set(10, 42);
      expect(sparseArray.length).toBe(11);
    });
  });

  describe("forEach method", () => {
    it("should iterate over all elements including undefined", () => {
      const sparseArray = new SparseArray<number>([1, undefined, 3]);
      const values: (number | undefined)[] = [];
      const indices: number[] = [];

      sparseArray.forEach((value, index, array) => {
        values.push(value);
        indices.push(index);
        expect(array).toBe(sparseArray["_arr"]); // internal array reference
      });

      expect(values).toEqual([1, undefined, 3]);
      expect(indices).toEqual([0, 1, 2]);
    });

    it("should handle empty array", () => {
      const sparseArray = new SparseArray<number>();
      let callCount = 0;

      sparseArray.forEach(() => {
        callCount++;
      });

      expect(callCount).toBe(0);
    });

    it("should iterate over sparse array with holes (skipping empty slots)", () => {
      const sparseArray = new SparseArray<number>();
      sparseArray.set(0, 1);
      sparseArray.set(3, 4);

      const values: (number | undefined)[] = [];
      const indices: number[] = [];
      sparseArray.forEach((value, index) => {
        values.push(value);
        indices.push(index);
      });

      // forEach skips holes (same as native Array behavior)
      expect(values).toEqual([1, 4]);
      expect(indices).toEqual([0, 3]);
    });

    it("should demonstrate difference between forEach and for...of with holes", () => {
      const sparseArray = new SparseArray<number>();
      sparseArray.set(0, 1);
      sparseArray.set(3, 4);

      // forEach skips holes
      const forEachValues: (number | undefined)[] = [];
      sparseArray.forEach((value) => {
        forEachValues.push(value);
      });
      expect(forEachValues).toEqual([1, 4]);

      // for...of includes holes as undefined
      const forOfValues: (number | undefined)[] = [];
      for (const value of sparseArray) {
        forOfValues.push(value);
      }
      expect(forOfValues).toEqual([1, undefined, undefined, 4]);
    });
  });

  describe("map method", () => {
    it("should transform all elements including undefined", () => {
      const sparseArray = new SparseArray<number>([1, undefined, 3]);
      const result = sparseArray.map((value, index) => `${index}:${value}`);

      expect(result).toEqual(["0:1", "1:undefined", "2:3"]);
    });

    it("should handle empty array", () => {
      const sparseArray = new SparseArray<number>();
      const result = sparseArray.map((value) => value * 2);

      expect(result).toEqual([]);
    });

    it("should transform sparse array with holes (preserving empty slots)", () => {
      const sparseArray = new SparseArray<number>();
      sparseArray.set(0, 10);
      sparseArray.set(2, 30);

      const result = sparseArray.map((value) =>
        value === undefined ? "hole" : value * 2,
      );

      // map preserves holes as empty slots, but accessing them returns undefined
      expect(result.length).toBe(3);
      expect(result[0]).toBe(20);
      expect(result[1]).toBeUndefined(); // accessing empty slot returns undefined
      expect(result[2]).toBe(60);
      // The result array has the same structure: [20, <empty>, 60]
    });

    it("should provide correct parameters to callback", () => {
      const sparseArray = new SparseArray<string>(["a", undefined, "c"]);
      let callbackArray: (string | undefined)[] | undefined;

      sparseArray.map((value, index, array) => {
        callbackArray = array;
        return value;
      });

      expect(callbackArray).toBe(sparseArray["_arr"]); // internal array reference
    });
  });

  describe("iterator functionality", () => {
    it("should be iterable with for...of loop", () => {
      const sparseArray = new SparseArray<number>([1, undefined, 3]);
      const values: (number | undefined)[] = [];

      for (const value of sparseArray) {
        values.push(value);
      }

      expect(values).toEqual([1, undefined, 3]);
    });

    it("should handle empty array iteration", () => {
      const sparseArray = new SparseArray<number>();
      const values: (number | undefined)[] = [];

      for (const value of sparseArray) {
        values.push(value);
      }

      expect(values).toEqual([]);
    });

    it("should iterate over sparse array with holes", () => {
      const sparseArray = new SparseArray<string>();
      sparseArray.set(0, "first");
      sparseArray.set(3, "fourth");

      const values: (string | undefined)[] = [];
      for (const value of sparseArray) {
        values.push(value);
      }

      expect(values).toEqual(["first", undefined, undefined, "fourth"]);
    });

    it("should work with manual iterator", () => {
      const sparseArray = new SparseArray<number>([5, undefined, 7]);
      const iterator = sparseArray[Symbol.iterator]();

      expect(iterator.next()).toEqual({ value: 5, done: false });
      expect(iterator.next()).toEqual({ value: undefined, done: false });
      expect(iterator.next()).toEqual({ value: 7, done: false });
      expect(iterator.next()).toEqual({ value: undefined, done: true });
    });
  });

  describe("sparse array specific behaviors", () => {
    it("should maintain holes when created with gaps", () => {
      const sparseArray = new SparseArray<number>();
      sparseArray.set(0, 1);
      sparseArray.set(5, 6);
      sparseArray.set(10, 11);

      expect(sparseArray.length).toBe(11);
      expect(sparseArray.get(0)).toBe(1);
      expect(sparseArray.get(1)).toBeUndefined();
      expect(sparseArray.get(4)).toBeUndefined();
      expect(sparseArray.get(5)).toBe(6);
      expect(sparseArray.get(9)).toBeUndefined();
      expect(sparseArray.get(10)).toBe(11);
    });

    it("should handle setting the same index multiple times", () => {
      const sparseArray = new SparseArray<string>();
      sparseArray.set(2, "first");
      sparseArray.set(2, "second");
      sparseArray.set(2, undefined);
      sparseArray.set(2, "final");

      expect(sparseArray.length).toBe(3);
      expect(sparseArray.get(2)).toBe("final");
    });

    it("should allow complex sparse patterns", () => {
      const sparseArray = new SparseArray<number>();

      // Create a sparse pattern: [1, undefined, undefined, 4, undefined, undefined, 7]
      sparseArray.push(1);
      sparseArray.set(3, 4);
      sparseArray.set(6, 7);

      expect(sparseArray.length).toBe(7);

      // Verify the pattern
      const expected = [1, undefined, undefined, 4, undefined, undefined, 7];
      for (let i = 0; i < expected.length; i++) {
        expect(sparseArray.get(i)).toBe(expected[i]);
      }
    });

    it("should handle large gaps efficiently", () => {
      const sparseArray = new SparseArray<boolean>();
      sparseArray.set(0, true);
      sparseArray.set(1000, false);

      expect(sparseArray.length).toBe(1001);
      expect(sparseArray.get(0)).toBe(true);
      expect(sparseArray.get(500)).toBeUndefined();
      expect(sparseArray.get(999)).toBeUndefined();
      expect(sparseArray.get(1000)).toBe(false);
    });
  });
});
