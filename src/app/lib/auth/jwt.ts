import jwt from "jsonwebtoken";

export function generateToken(payload: object, secret: string, option: object) {
  return jwt.sign(payload, secret, option);
}
