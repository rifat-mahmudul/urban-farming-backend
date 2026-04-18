import { SignOptions } from "jsonwebtoken";

export const jwtConfig: {
  accessToken: string;
  accessTokenExpiresIn: SignOptions["expiresIn"];
  refreshToken: string;
  refreshTokenExpiresIn: SignOptions["expiresIn"];
} = {
  accessToken: process.env.JWT_ACCESS_SECRET as string,
  accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"],

  refreshToken:  process.env.JWT_REFRESH_SECRET as string,
  refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
};