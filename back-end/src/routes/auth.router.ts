import { Router } from "express";

import { UserValidator } from "../middleware/validators/UserValidator";
import { signInController } from "../modules/users/useCases/signIn";

const AuthRouter = Router();

AuthRouter.get("/", (_req, res) => {
  res.send("Hello from AuthRouter");
});

AuthRouter.post("/", UserValidator.validateLoginUser, signInController.handle);

export { AuthRouter };
