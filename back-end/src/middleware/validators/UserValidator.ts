import { celebrate, Joi, Segments } from 'celebrate';

class UserValidator {
  private static readonly CREATE_USER_VALIDATOR = celebrate(
    {
      [Segments.BODY]: Joi.object({
        name: Joi.string().min(3).max(16).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(16).required(),
      }),
    },
    { abortEarly: true }
  );

  private static readonly LOGIN_USER_VALIDATOR = celebrate(
    {
      [Segments.BODY]: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    },
    { abortEarly: true }
  );

  static get validateCreateUser() {
    return UserValidator.CREATE_USER_VALIDATOR;
  }

  static get validateLoginUser() {
    return UserValidator.LOGIN_USER_VALIDATOR;
  }
}

export { UserValidator };
