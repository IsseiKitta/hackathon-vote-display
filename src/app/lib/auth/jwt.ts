import jwt from "jsonwebtoken";

export function generateToken(
  payload: object,
  secret: string,
  option: jwt.SignOptions
) {
  return jwt.sign(payload, secret, option);
}

export function verifyToken(
  token: string,
  secret: string
): string | jwt.JwtPayload {
  return jwt.verify(token, secret);
}
