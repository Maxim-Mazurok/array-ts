# AI Assistant Project Instructions

Purpose: Provide precise Dense vs Sparse array abstractions for TypeScript using type-level API design (not runtime scanning) to communicate when `undefined` can appear.

## Architecture & Design

- Public entry: `index.ts` re-exports `DenseArray`, `SparseArray` with explicit `.js` extensions for ESM consumers. Build emits JS to `dist/` + d.ts to `types/`.
- Exactly two core classes; keep surface minimal. No index signatures—forces explicit `.get()` so out-of-range is `T | undefined`.
- `DenseArray<T>`: iteration yields `T`; `.get(i)` returns `T | undefined` if out of range. Single-item `push(item: T)` (not variadic) prevents bulk hole introduction without runtime validation.
- `SparseArray<T>`: holes allowed; iteration and `.get()` yield `T | undefined`.
- No runtime hole checks: safety is enforced by what APIs are exposed, not by scanning inputs.

## Type Safety Principles

- Do not add APIs that permit inserting multiple values at once into `DenseArray` unless you can prove they cannot introduce holes without runtime inspection.
- Any new mutator for `DenseArray` must maintain: iteration type stays `T`; only explicit `.get()` may yield `undefined`.
- Never add direct index property access or signatures; that would reintroduce native array unsafety.
- Keep `noUncheckedIndexedAccess` disabled; library encodes localized safety.

## Build & Test Workflow

- Build: `npm run build` (tsc -> `dist/` + declarations into `types/`).
- Prep for tests / publish: `npm run prepare` (cleans `types/` then builds).
- Type tests are primary: `npm test` runs Prettier check then `tsd` (`test/index.test-d.ts`). Add new assertions there when API changes.
- Runtime tests: Use [Vitest](https://vitest.dev/) for any logic with branches or runtime effects. Place runtime tests in `test/*.spec.ts`. Vitest is a required dev dependency and should be used for all future runtime test coverage.

## Conventions

- ESM project (`"type": "module"`); always use explicit `.js` extensions in source exports.
- No default exports or extra barrel files beyond root `index.ts`.
- Favor smallest API; do not mirror all native Array methods—only add when dense vs sparse semantics affect types.
- Avoid external dependencies and side effects.

## Extending Examples

- `filter` on `DenseArray<T>` returns `DenseArray<T>`; for `SparseArray<T>` returns `SparseArray<T>` unless predicate type-narrows away `undefined`.
- `toArray()`: `DenseArray` -> `T[]`; `SparseArray` -> `(T | undefined)[]`.

## Testing Guidance

- Demonstrate type guarantees via `tsd` comparisons against native arrays first.
- Add runtime tests with Vitest only for logic branches not trivially enforced by the type system.

## Review Checklist

- Iteration types unchanged (or intentionally updated with tests).
- No index signatures added; no widening of `DenseArray` iteration type.
- New methods respect single-item mutation principle or justify safety.
- `npm test` + build succeed; formatting clean.

Request clarifications if proposing multi-item operations, bulk initialization, or hole-compaction features before implementing.
