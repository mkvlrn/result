# Result

A lightweight, zero-dependency TypeScript utility for type-safe error handling using the Result pattern.

## Installation

```bash
# Using npm
npm install mkvlrn/result

# Using yarn
yarn add mkvlrn/result
```

## Usage

```ts
import { Result } from '@mkvlrn/result';

// Success case
const success = Result.success(42);
if (success.ok) {
  console.log(success.value); // 42
}

// Error case
const error = Result.error(new Error('Something went wrong'));
if (!error.ok) {
  console.log(error.error.message); // "Something went wrong"
}

// Custom error type
type ValidationError = { field: string; message: string };
const validationError = Result.error<ValidationError>({ 
  field: 'email', 
  message: 'Invalid email format' 
});
```

## Features

- Type-safe error handling
- Zero dependencies
- Simple API
- Full TypeScript support
- Tiny bundle size
