export class Result<T = unknown> {
  readonly error?: Error;
  readonly errorMessage?: string;
  readonly isSuccessful: boolean;
  readonly isUnexpectedFailure: boolean;
  readonly value?: NonNullable<T>;

  private constructor(
    isSuccessful: boolean,
    error?: Error | string,
    isUnexpectedFailure?: boolean,
    value?: NonNullable<T>,
  ) {
    this.isSuccessful = isSuccessful;
    if (error instanceof Error) {
      this.error = error;
      this.errorMessage = error.message;
    }
    if (typeof error === 'string') {
      this.error = new Error(error);
      this.errorMessage = error;
    }
    this.isUnexpectedFailure = !!isUnexpectedFailure;
    this.value = value;

    if (this.isSuccessful) {
      if (this.error) {
        throw new Error('a successful result cannot contain an error');
      }
      if (this.isUnexpectedFailure) {
        throw new Error('a successful result cannot be unexpected');
      }
    } else {
      if (!this.error) {
        throw new Error('an unsuccessful result should contain error');
      }
      if (this.value) {
        throw new Error('an unsuccessful result cannot contain value');
      }
    }
  }

  static Fail<U>(error: Error | string, isUnexpectedFailure = false): Result<U> {
    return new Result<U>(false, error, isUnexpectedFailure);
  }

  static Ok<U>(value?: NonNullable<U>): Result<U> {
    return new Result<U>(true, undefined, false, value);
  }
}
