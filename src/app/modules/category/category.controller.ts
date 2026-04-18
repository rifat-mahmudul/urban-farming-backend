import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createCategory = async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Category created successfully",
    data: result,
  });
};

const getAllCategories = async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategories();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories fetched successfully",
    data: result,
  });
};

export const CategoryController = {
  createCategory,
  getAllCategories,
};
