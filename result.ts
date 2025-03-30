/**
 * This module exports a Result type and helper functions that represent the outcome of an operation.
 * @module
 */

/**
 * Result type to represent the outcome of an operation.
 * It can either be a success with a value or an error with an error message.
 * This is a generic type that can be used with any type of value and error.
 * It is useful for handling operations that can fail, such as network requests or file operations.
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
  /**
   * Creates a successful Result with the given value.
   * @param value The success value
   * @returns A Result object representing success
   */
  success<T>(value: T): Result<T, never> {
    return { ok: true, value };
  },

  /**
   * Creates an error Result with the given error.
   * @param error The error value
   * @returns A Result object representing failure
   */
  error<E = Error>(error: E): Result<never, E> {
    return { ok: false, error };
  },
};
