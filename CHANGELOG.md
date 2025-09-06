# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

#### Enhanced Array Operations

- `toArray()` method for both `DenseArray` and `SparseArray` to convert back to native arrays
- `filter()` method that preserves array type semantics (DenseArray returns DenseArray, SparseArray returns SparseArray)
- `find()` and `findIndex()` methods for element searching with proper type safety
- `includes()`, `indexOf()`, and `lastIndexOf()` methods for element location
- `slice()` method for creating subarrays while maintaining type safety
- Static `from()` methods for creating instances from native arrays
- `join()` method for converting arrays to strings
- `reverse()` and `sort()` methods for in-place array mutations
- `reduce()` and `reduceRight()` methods for functional transformations
- `some()` and `every()` methods for predicate testing
- `concat()` method for type-safe array concatenation

#### SparseArray-Specific Methods

- `clear()` method to reset array to empty state
- `delete(index)` method as semantic alternative to `set(index, undefined)`

#### Type-Level Utilities

- `IsDenseArray<T>` and `IsSparseArray<T>` type predicates
- `ElementType<T>` utility to extract element type from array-ts types
- `AsDenseArray<T>` and `AsSparseArray<T>` type conversion utilities
- Runtime type predicates: `isDenseArray()` and `isSparseArray()`

#### Bridging Functions

- `asDense()` zero-cost wrapper to treat native arrays as dense (use with caution)
- `asSparse()` zero-cost wrapper to treat native arrays as sparse
- `safeToDense()` function that safely converts native arrays to DenseArray with hole detection

### Fixed

- Fixed `indexOf()` and `lastIndexOf()` methods to properly handle optional `fromIndex` parameter

## [0.0.5] - Previous Release

Initial implementation of `DenseArray` and `SparseArray` with basic operations.
