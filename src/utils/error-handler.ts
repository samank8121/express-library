import { Response, NextFunction } from 'express';

interface ErrorHandlerStrategy {
  canHandle(error: unknown): boolean;
  handle(error: unknown, res: Response): void;
}

// Strategy for MongoDB duplicate key errors
class DuplicateKeyErrorHandler implements ErrorHandlerStrategy {
  canHandle(error: unknown): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 11000 &&
      'keyPattern' in error &&
      error.keyPattern !== undefined &&
      'keyValue' in error &&
      error.keyValue !== undefined
    );
  }

  handle(error: unknown, res: Response): void {
    const mongoError = error as {
      keyPattern: Record<string, number>;
      keyValue: Record<string, string>;
    };

    const field = Object.keys(mongoError.keyPattern)[0];
    const value = mongoError.keyValue[field];

    res.status(409).json({
      status: 'fail',
      message: `${field} '${value}' already exists. Please use another ${field}.`,
    });
  }
}

// Strategy for Mongoose validation errors
class ValidationErrorHandler implements ErrorHandlerStrategy {
  canHandle(error: unknown): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      error.name === 'ValidationError' &&
      'message' in error &&
      typeof error.message === 'string'
    );
  }

  handle(error: unknown, res: Response): void {
    const validationError = error as { message: string };

    res.status(400).json({
      status: 'fail',
      message: validationError.message,
    });
  }
}

// Strategy for Mongoose cast errors
class CastErrorHandler implements ErrorHandlerStrategy {
  canHandle(error: unknown): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      error.name === 'CastError'
    );
  }

  handle(error: unknown, res: Response): void {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid ID or parameters',
    });
  }
}

export class ErrorHandler {
  private strategies: ErrorHandlerStrategy[] = [];

  constructor() {
    this.registerStrategy(new DuplicateKeyErrorHandler());
    this.registerStrategy(new ValidationErrorHandler());
    this.registerStrategy(new CastErrorHandler());
  }

  registerStrategy(strategy: ErrorHandlerStrategy): void {
    this.strategies.push(strategy);
  }

  handleError(error: unknown, res: Response, next: NextFunction): boolean {
    for (const strategy of this.strategies) {
      if (strategy.canHandle(error)) {
        strategy.handle(error, res);
        return true;
      }
    }

    next(error);
    return false;
  }
}
//Make it singleton
export const errorHandler = new ErrorHandler();

//For simple using
export const handleError = (
  error: unknown,
  res: Response,
  next: NextFunction
): boolean => {
  return errorHandler.handleError(error, res, next);
};
