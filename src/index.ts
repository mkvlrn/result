/**
 * Creates a successful Result with the given value.
 * @param value The success value
 * @returns A Result object representing success
 */
function resultSuccess<T>(value: T): Result<T, never> {
  return { ok: true, value: value };
}

/**
 * Creates a successful Result with the given value.
 * @param value The success value
 * @returns A Result object representing success
 */
function resultError<E = Error>(error: E): Result<never, E> {
  return { ok: false, error: error };
}

/**
 * Result type to represent the outcome of an operation.
 * It can either be a success with a value or an error with an error message.
 * This is a generic type that can be used with any type of value and error.
 *
 * It also aliases the success and error functions to make it easier to create
 * Result objects.
 */
export type Result<T, E = Error> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };

// biome-ignore lint/nursery/useExplicitType: https://github.com/biomejs/biome/issues/5932
export const Result: {
  success<T>(value: T): Result<T, never>;
  error<E = Error>(error: E): Result<never, E>;
} = {
  success: resultSuccess,
  error: resultError,
};
