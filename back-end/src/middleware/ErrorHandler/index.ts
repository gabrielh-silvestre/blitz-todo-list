import type { ErrorRequestHandler } from 'express';
import { HttpError, InternalServerError } from 'restify-errors';

class ErrorHandler {
  private static readonly normalize = (err: HttpError | Error): HttpError => {
    if (err instanceof HttpError) {
      return err;
    }

    console.error(err);
    return new InternalServerError(err, 'Internal Server Error');
  };

  static handler: ErrorRequestHandler = (err, _req, res, _next) => {
    const error = ErrorHandler.normalize(err);

    res.status(error.statusCode).json({ message: error.message });
  };
}

export { ErrorHandler };
