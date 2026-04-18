import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { VendorService } from "./vendor.service";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";

const createVendor = catchAsync(async (req: Request, res: Response) => {
  const result = await VendorService.createVendor(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Vendor created successfully",
    data: result,
  });
});

const getAllVendors = catchAsync(async (req: Request, res: Response) => {
  const result = await VendorService.getAllVendors();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Vendors retrieved successfully",
    data: result,
  });
});

export const VendorController = {
  createVendor,
  getAllVendors,
};