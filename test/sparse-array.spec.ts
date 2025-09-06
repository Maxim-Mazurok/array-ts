import { describe, expect, it } from "vitest";
import { SparseArray } from "../src/sparse-array";

describe("SparseArray", () => {
  it("should create SparseArray with initial values", () => {
    const sparseArray = new SparseArray<number>([1, undefined, 3]);
    expect(sparseArray.length).toBe(3);
    expect(sparseArray.get(0)).toBe(1);
    expect(sparseArray.get(1)).toBeUndefined();
    expect(sparseArray.get(2)).toBe(3);
  });
});
