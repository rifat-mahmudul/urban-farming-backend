import AppError from "../../../errors/appError";
import bcrypt from "bcrypt";
import httpStatus from "http-status-codes";
import { prisma } from "../../../lib/prisma";
import { createToken } from "../../utils/jwt";
import { jwtConfig } from "../../config/jwtConfig";

interface RegisterInfo {
  name: string;
  email: string;
  password: string;
}

interface LoginInfo {
  email: string;
  password: string;
}

const register = async (payload: RegisterInfo) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exists");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    },
  });

  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

const login = async (payload: LoginInfo) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    jwtConfig.accessToken,
    jwtConfig.accessTokenExpiresIn,
  );

  const refreshToken = createToken(
    jwtPayload,
    jwtConfig.refreshToken,
    jwtConfig.refreshTokenExpiresIn,
  );

  const { password, ...userWithoutPassword } = user;

  return {
    accessToken,
    refreshToken,
    user: userWithoutPassword,
  };
};

export const AuthServices = {
  register,
  login,
};
