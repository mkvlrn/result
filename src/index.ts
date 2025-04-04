/**
 * This module exports a Result type and helper functions that represent the outcome of an operation.
 * @module
 */

/**
 * Creates a successful Result with the given value.
 * @param value The success value
 * @returns A Result object representing success
 */
function success<T>(value: T): Result<T, never> {
  return { ok: true, value: value };
}

/**
 * Creates a successful Result with the given value.
 * @param value The success value
 * @returns A Result object representing success
 */
function error<E = Error>(error: E): Result<never, E> {
  return { ok: false, error: error };
}

/**
 * Result type to represent the outcome of an operation.
 * It can either be a success with a value or an error with an error message.
 * This is a generic type that can be used with any type of value and error.
 */
export type Result<T, E = Error> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };

/**
 * Helper functions to create Result objects.
 */
export const Result: {
  success<T>(value: T): Result<T, never>;
  error<E = Error>(error: E): Result<never, E>;
} = {
  success: success,
  error: error,
};
