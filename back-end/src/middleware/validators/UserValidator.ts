import type { Handler } from 'express';

import Joi from 'joi';
import { BadRequestError, UnprocessableEntityError } from 'restify-errors';

class UserValidator {
  private static readonly CREATE_USER_VALIDATOR = Joi.object({
    name: Joi.string().min(3).max(16).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required(),
  });

  private static readonly normalizeJoiError = (errorMessage: string): never => {
    throw errorMessage.includes('required')
      ? new BadRequestError(errorMessage)
      : new UnprocessableEntityError(errorMessage);
  };

  public static validateCreateUser: Handler = (req, _res, next) => {
    const { error } = UserValidator.CREATE_USER_VALIDATOR.validate(req.body);

    if (error) {
      UserValidator.normalizeJoiError(error.details[0].message);
    }

    next();
  };
}

export { UserValidator };
