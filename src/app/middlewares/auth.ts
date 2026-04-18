import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { verifyToken } from "../utils/jwt";
import AppError from "../../errors/appError";
import { jwtConfig } from "../config/jwtConfig";

export const auth =
  (...requiredRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

      const verifiedToken = verifyToken(token, jwtConfig.accessToken) as any;

      req.user = verifiedToken;

      if (requiredRoles.length && !requiredRoles.includes(verifiedToken.role)) {
        throw new AppError(httpStatus.FORBIDDEN, "Forbidden access");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
