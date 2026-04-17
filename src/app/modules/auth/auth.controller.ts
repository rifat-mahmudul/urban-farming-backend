import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await AuthServices.register(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Created Successfully",
      data: user,
    });
  },
);

export const AuthControllers = {
  register,
};
