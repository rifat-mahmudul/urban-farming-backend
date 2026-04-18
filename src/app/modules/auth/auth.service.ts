import AppError from "../../../errors/appError";
import bcrypt from "bcrypt";
import httpStatus from "http-status-codes";
import { prisma } from "../../../lib/prisma";

interface RegisterInfo {
  name: string;
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

export const AuthServices = {
  register,
};
