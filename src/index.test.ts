// biome-ignore lint/correctness/noNodejsModules: need the timer
import { setTimeout } from "node:timers/promises";
import { assert, describe, it } from "vitest";
import { Result } from "./index.js";

class CustomError extends Error {
  readonly customField: number;

  constructor(customField: number, message: string) {
    super(message);
    this.name = "CustomField";
    this.customField = customField;
  }
}

function division(a: number, b: number): Result<number, Error> {
  if (b === 0) {
    return Result.error(new Error("cannot divide by zero"));
  }

  return Result.ok(a / b);
}

async function longRunning(shouldFail: boolean): Promise<Result<number, CustomError>> {
  await setTimeout(1);

  return shouldFail ? Result.error(new CustomError(42, "wrong")) : Result.ok(3);
}

describe("creates a valid result", () => {
  describe("default Error type", () => {
    it("ok result", () => {
      const result = division(4, 2);

      assert.isUndefined(result.error);
      assert.isDefined(result.value);
      assert.strictEqual(result.value, 2);
    });

    it("error result", () => {
      const result = division(4, 0);

      assert.isDefined(result.error);
      assert.instanceOf(result.error, Error);
      assert.strictEqual(result.error.message, "cannot divide by zero");
    });
  });

  describe("custom error", () => {
    it("ok result", async () => {
      const result = await longRunning(false);

      assert.isUndefined(result.error);
      assert.isDefined(result.value);
      assert.strictEqual(result.value, 3);
    });

    it("error result", async () => {
      const result = await longRunning(true);

      assert.isDefined(result.error);
      assert.instanceOf(result.error, CustomError);
      assert.strictEqual(result.error.message, "wrong");
      assert.strictEqual(result.error.customField, 42);
    });
  });
});
