import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { RentalServices } from "./rental.service";
import { Request, Response } from "express";

const createSpace = async (req: Request, res: Response) => {
  const result = await RentalServices.createSpace(req.user.userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Farm space created",
    data: result,
  });
};

const getAllSpaces = async (req: Request, res: Response) => {
  const result = await RentalServices.getAllSpaces();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Spaces fetched",
    data: result,
  });
};

const bookSpace = async (req: Request, res: Response) => {
  const result = await RentalServices.bookSpace(req.user.userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Space booked",
    data: result,
  });
};

export const RentalController = {
  createSpace,
  getAllSpaces,
  bookSpace,
};
