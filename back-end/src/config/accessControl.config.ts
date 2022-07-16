import { RequestHandler } from "express";

const origin =
  process.env.NODE_ENV === "production"
    ? process.env.FRONT_URL
    : "http://localhost:3000";

const accessControl: RequestHandler = (_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", origin as string);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
};

export { accessControl };
