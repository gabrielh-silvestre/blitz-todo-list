import { celebrate, Joi, Segments } from "celebrate";

class TaskValidator {
  private static readonly CREATE_TASK_VALIDATOR = celebrate({
    [Segments.BODY]: Joi.object({
      title: Joi.string().min(5).max(12).required(),
      description: Joi.string().empty().max(80),
      mainTaskId: Joi.string().empty(),
    }),
  });

  private static readonly UPDATE_TASK_VALIDATOR = celebrate({
    [Segments.BODY]: Joi.object({
      title: Joi.string().min(5).max(12).required(),
      description: Joi.string().allow(null).empty().max(80).required(),
      status: Joi.string()
        .empty()
        .valid("CREATED", "IN_PROGRESS", "DONE", "DELETED")
        .required(),
      mainTaskId: Joi.string().empty(),
    }),
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().required(),
    }),
  });

  static get validateCreateTask() {
    return TaskValidator.CREATE_TASK_VALIDATOR;
  }

  static get validateUpdateTask() {
    return TaskValidator.UPDATE_TASK_VALIDATOR;
  }
}

export { TaskValidator };
