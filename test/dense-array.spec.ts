import { describe, expect, it } from "vitest";
import { DenseArray } from "../src/dense-array";

describe("DenseArray", () => {
  describe("Construction", () => {
    it("should create empty DenseArray by default", () => {
      const denseArray = new DenseArray<number>();
      expect(denseArray.length).toBe(0);
    });

    it("should create empty DenseArray for different types", () => {
      const stringArray = new DenseArray<string>();
      const booleanArray = new DenseArray<boolean>();
      const objectArray = new DenseArray<{ id: number }>();

      expect(stringArray.length).toBe(0);
      expect(booleanArray.length).toBe(0);
      expect(objectArray.length).toBe(0);
    });
  });

  describe("Length tracking", () => {
    it("should start with length 0", () => {
      const denseArray = new DenseArray<number>();
      expect(denseArray.length).toBe(0);
    });

    it("should update length after push operations", () => {
      const denseArray = new DenseArray<number>();

      denseArray.push(1);
      expect(denseArray.length).toBe(1);

      denseArray.push(2);
      expect(denseArray.length).toBe(2);

      denseArray.push(3);
      expect(denseArray.length).toBe(3);
    });

    it("should track length correctly for various data types", () => {
      const stringArray = new DenseArray<string>();
      stringArray.push("hello");
      stringArray.push("world");
      expect(stringArray.length).toBe(2);

      const objectArray = new DenseArray<{ name: string }>();
      objectArray.push({ name: "test" });
      expect(objectArray.length).toBe(1);
    });
  });

  describe("Index access via get()", () => {
    it("should return correct values for valid indices", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(10);
      denseArray.push(20);
      denseArray.push(30);

      expect(denseArray.get(0)).toBe(10);
      expect(denseArray.get(1)).toBe(20);
      expect(denseArray.get(2)).toBe(30);
    });

    it("should return undefined for out-of-bounds indices", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(10);
      denseArray.push(20);

      expect(denseArray.get(2)).toBeUndefined();
      expect(denseArray.get(10)).toBeUndefined();
      expect(denseArray.get(100)).toBeUndefined();
    });

    it("should return undefined for negative indices", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(10);
      denseArray.push(20);

      expect(denseArray.get(-1)).toBeUndefined();
      expect(denseArray.get(-5)).toBeUndefined();
    });

    it("should return undefined when accessing empty array", () => {
      const denseArray = new DenseArray<number>();

      expect(denseArray.get(0)).toBeUndefined();
      expect(denseArray.get(1)).toBeUndefined();
    });

    it("should handle complex data types correctly", () => {
      const denseArray = new DenseArray<{ id: number; name: string }>();
      const obj1 = { id: 1, name: "first" };
      const obj2 = { id: 2, name: "second" };

      denseArray.push(obj1);
      denseArray.push(obj2);

      expect(denseArray.get(0)).toBe(obj1);
      expect(denseArray.get(1)).toBe(obj2);
      expect(denseArray.get(2)).toBeUndefined();
    });
  });

  describe("Iteration functionality", () => {
    describe("Symbol.iterator", () => {
      it("should iterate over all elements", () => {
        const denseArray = new DenseArray<number>();
        denseArray.push(1);
        denseArray.push(2);
        denseArray.push(3);

        const result = [...denseArray];
        expect(result).toEqual([1, 2, 3]);
      });

      it("should work with for...of loops", () => {
        const denseArray = new DenseArray<string>();
        denseArray.push("a");
        denseArray.push("b");
        denseArray.push("c");

        const collected: string[] = [];
        for (const item of denseArray) {
          collected.push(item);
        }

        expect(collected).toEqual(["a", "b", "c"]);
      });

      it("should handle empty array iteration", () => {
        const denseArray = new DenseArray<number>();

        const result = [...denseArray];
        expect(result).toEqual([]);

        const collected: number[] = [];
        for (const item of denseArray) {
          collected.push(item);
        }
        expect(collected).toEqual([]);
      });

      it("should maintain element types during iteration", () => {
        const denseArray = new DenseArray<{ value: number }>();
        const obj1 = { value: 10 };
        const obj2 = { value: 20 };

        denseArray.push(obj1);
        denseArray.push(obj2);

        const result = [...denseArray];
        expect(result).toEqual([obj1, obj2]);
        expect(result[0]).toBe(obj1);
        expect(result[1]).toBe(obj2);
      });
    });

    describe("forEach method", () => {
      it("should execute callback for each element", () => {
        const denseArray = new DenseArray<number>();
        denseArray.push(1);
        denseArray.push(2);
        denseArray.push(3);

        const result: number[] = [];
        denseArray.forEach((value, index, array) => {
          result.push(value);
          expect(typeof index).toBe("number");
          expect(Array.isArray(array)).toBe(true);
        });

        expect(result).toEqual([1, 2, 3]);
      });

      it("should provide correct indices in callback", () => {
        const denseArray = new DenseArray<string>();
        denseArray.push("first");
        denseArray.push("second");
        denseArray.push("third");

        const indices: number[] = [];
        denseArray.forEach((value, index) => {
          indices.push(index);
        });

        expect(indices).toEqual([0, 1, 2]);
      });

      it("should not execute callback for empty array", () => {
        const denseArray = new DenseArray<number>();
        let callCount = 0;

        denseArray.forEach(() => {
          callCount++;
        });

        expect(callCount).toBe(0);
      });

      it("should pass the underlying array as third parameter", () => {
        const denseArray = new DenseArray<number>();
        denseArray.push(100);
        denseArray.push(200);

        denseArray.forEach((value, index, array) => {
          expect(array).toEqual([100, 200]);
          expect(Array.isArray(array)).toBe(true);
        });
      });
    });
  });

  describe("Core mutating methods", () => {
    describe("push method", () => {
      it("should add single items correctly", () => {
        const denseArray = new DenseArray<number>();

        denseArray.push(1);
        expect(denseArray.get(0)).toBe(1);
        expect(denseArray.length).toBe(1);

        denseArray.push(2);
        expect(denseArray.get(1)).toBe(2);
        expect(denseArray.length).toBe(2);
      });

      it("should return new length after push", () => {
        const denseArray = new DenseArray<number>();

        const length1 = denseArray.push(10);
        expect(length1).toBe(1);
        expect(denseArray.length).toBe(1);

        const length2 = denseArray.push(20);
        expect(length2).toBe(2);
        expect(denseArray.length).toBe(2);

        const length3 = denseArray.push(30);
        expect(length3).toBe(3);
        expect(denseArray.length).toBe(3);
      });

      it("should handle different data types", () => {
        const stringArray = new DenseArray<string>();
        const length1 = stringArray.push("hello");
        expect(length1).toBe(1);
        expect(stringArray.get(0)).toBe("hello");

        const booleanArray = new DenseArray<boolean>();
        const length2 = booleanArray.push(true);
        expect(length2).toBe(1);
        expect(booleanArray.get(0)).toBe(true);

        const length3 = booleanArray.push(false);
        expect(length3).toBe(2);
        expect(booleanArray.get(1)).toBe(false);
      });

      it("should handle complex objects", () => {
        const objArray = new DenseArray<{ id: number; data: string }>();
        const obj1 = { id: 1, data: "test1" };
        const obj2 = { id: 2, data: "test2" };

        const length1 = objArray.push(obj1);
        expect(length1).toBe(1);
        expect(objArray.get(0)).toBe(obj1);

        const length2 = objArray.push(obj2);
        expect(length2).toBe(2);
        expect(objArray.get(1)).toBe(obj2);
      });

      it("should maintain sequential order", () => {
        const denseArray = new DenseArray<number>();
        const values = [5, 10, 15, 20, 25];

        values.forEach((value) => denseArray.push(value));

        values.forEach((value, index) => {
          expect(denseArray.get(index)).toBe(value);
        });

        expect([...denseArray]).toEqual(values);
      });
    });
  });

  describe("Immutability utilities", () => {
    describe("map method", () => {
      it("should transform all elements and return new array", () => {
        const denseArray = new DenseArray<number>();
        denseArray.push(1);
        denseArray.push(2);
        denseArray.push(3);

        const doubled = denseArray.map((x) => x * 2);

        expect(doubled).toEqual([2, 4, 6]);
        // Original should remain unchanged
        expect([...denseArray]).toEqual([1, 2, 3]);
      });

      it("should support type transformations", () => {
        const denseArray = new DenseArray<number>();
        denseArray.push(1);
        denseArray.push(2);
        denseArray.push(3);

        const strings = denseArray.map((x) => `number: ${x}`);

        expect(strings).toEqual(["number: 1", "number: 2", "number: 3"]);
        expect(typeof strings[0]).toBe("string");
      });

      it("should work with complex transformations", () => {
        const denseArray = new DenseArray<{ value: number }>();
        denseArray.push({ value: 10 });
        denseArray.push({ value: 20 });

        const extracted = denseArray.map((obj) => obj.value * 2);

        expect(extracted).toEqual([20, 40]);
      });

      it("should provide correct callback parameters", () => {
        const denseArray = new DenseArray<string>();
        denseArray.push("a");
        denseArray.push("b");

        const result = denseArray.map((value, index, array) => {
          expect(typeof value).toBe("string");
          expect(typeof index).toBe("number");
          expect(Array.isArray(array)).toBe(true);
          return `${index}:${value}`;
        });

        expect(result).toEqual(["0:a", "1:b"]);
      });

      it("should return empty array for empty DenseArray", () => {
        const denseArray = new DenseArray<number>();

        const result = denseArray.map((x) => x * 2);

        expect(result).toEqual([]);
      });

      it("should not modify original array", () => {
        const denseArray = new DenseArray<number>();
        denseArray.push(1);
        denseArray.push(2);
        denseArray.push(3);

        const originalValues = [...denseArray];

        denseArray.map((x) => x * 1000); // Large transformation

        expect([...denseArray]).toEqual(originalValues);
      });
    });
  });

  describe("Edge cases and safety", () => {
    it("should handle zero values correctly", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(0);

      expect(denseArray.get(0)).toBe(0);
      expect(denseArray.length).toBe(1);
    });

    it("should handle null values correctly", () => {
      const denseArray = new DenseArray<string | null>();
      denseArray.push(null);

      expect(denseArray.get(0)).toBeNull();
      expect(denseArray.length).toBe(1);
    });

    it("should handle falsy values correctly", () => {
      const denseArray = new DenseArray<boolean | string | number>();
      denseArray.push(false);
      denseArray.push("");
      denseArray.push(0);

      expect(denseArray.get(0)).toBe(false);
      expect(denseArray.get(1)).toBe("");
      expect(denseArray.get(2)).toBe(0);
      expect(denseArray.length).toBe(3);
    });

    it("should work correctly with large indices access", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(42);

      expect(denseArray.get(999999)).toBeUndefined();
      expect(denseArray.get(Number.MAX_SAFE_INTEGER)).toBeUndefined();
    });

    it("should maintain type safety and not allow holes", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(1);
      denseArray.push(2);

      // Since we can only use push() single items, holes cannot be created
      // Verify that we indeed have a dense array
      const allElements = [...denseArray];
      expect(allElements).toEqual([1, 2]);
      expect(allElements.length).toBe(2);
      expect(denseArray.length).toBe(2);
    });

    it("should work correctly with float numbers", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(3.14);
      denseArray.push(2.71);

      expect(denseArray.get(0)).toBe(3.14);
      expect(denseArray.get(1)).toBe(2.71);
    });

    it("should handle special number values", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(Infinity);
      denseArray.push(-Infinity);
      denseArray.push(NaN);

      expect(denseArray.get(0)).toBe(Infinity);
      expect(denseArray.get(1)).toBe(-Infinity);
      expect(Number.isNaN(denseArray.get(2))).toBe(true);
    });
  });

  describe("Comparison with native array behavior", () => {
    it("should behave like native array for valid operations", () => {
      const denseArray = new DenseArray<number>();
      const nativeArray: number[] = [];

      // Push same values
      [1, 2, 3, 4, 5].forEach((val) => {
        denseArray.push(val);
        nativeArray.push(val);
      });

      // Compare iteration
      expect([...denseArray]).toEqual(nativeArray);

      // Compare length
      expect(denseArray.length).toBe(nativeArray.length);

      // Compare forEach behavior
      const denseResults: number[] = [];
      const nativeResults: number[] = [];

      denseArray.forEach((val) => denseResults.push(val));
      nativeArray.forEach((val) => nativeResults.push(val));

      expect(denseResults).toEqual(nativeResults);

      // Compare map behavior
      const denseMapped = denseArray.map((x) => x * 2);
      const nativeMapped = nativeArray.map((x) => x * 2);

      expect(denseMapped).toEqual(nativeMapped);
    });

    it("should provide safer index access than native arrays", () => {
      const denseArray = new DenseArray<number>();
      denseArray.push(1);
      denseArray.push(2);

      // DenseArray.get() returns T | undefined, which is safer
      expect(denseArray.get(10)).toBeUndefined();

      // This shows the safety advantage - we must explicitly handle undefined
      const value = denseArray.get(0);
      if (value !== undefined) {
        expect(typeof value).toBe("number");
      }
    });
  });
});
