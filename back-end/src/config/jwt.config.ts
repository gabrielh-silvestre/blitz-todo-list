import "dotenv/config";
import { Secret, SignOptions } from "jsonwebtoken";

const secret = process.env.JWT_SECRET as Secret;

const jwtOptions: SignOptions = {
  expiresIn: "3d",
  algorithm: "HS256",
};

export { secret, jwtOptions };
