import { celebrate, Joi, Segments } from "celebrate";

class TaskValidator {
  private static readonly CREATE_TASK_VALIDATOR = celebrate({
    [Segments.BODY]: Joi.object({
      title: Joi.string().min(5).max(12).required(),
      description: Joi.string().empty().max(80),
      mainTaskId: Joi.string().empty(),
    }),
  });

  static get validateCreateTask() {
    return TaskValidator.CREATE_TASK_VALIDATOR;
  }
}

export { TaskValidator };
