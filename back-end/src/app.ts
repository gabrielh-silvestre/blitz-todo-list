import "express-async-errors";
import cors from "cors";
import express from "express";

import { accessControl } from "./config/accessControl.config";
import { ErrorHandler } from "./middleware/ErrorHandler";
import { router } from "./routes";

const app = express();

app.use(accessControl);
app.use("/api/v1", cors(), express.json(), router);
app.use(ErrorHandler.handler);

export { app };
