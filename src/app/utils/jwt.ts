import jwt, { Secret, SignOptions } from "jsonwebtoken";

export const createToken = (
  payload: object,
  secret: Secret,
  expiresIn: SignOptions["expiresIn"],
) => {
  const options: SignOptions = {
    expiresIn,
  };

  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret);
};