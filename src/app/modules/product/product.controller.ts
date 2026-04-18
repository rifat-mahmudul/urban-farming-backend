import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createProduct = async (req: Request, res: Response) => {
  const result = await ProductService.createProduct(req.user.userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Product created successfully",
    data: result,
  });
};

const getAllProducts = async (req: Request, res: Response) => {
  const result = await ProductService.getAllProducts(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products fetched successfully",
    meta: result.meta,
    data: result.data,
  });
};

export const ProductController = {
  createProduct,
  getAllProducts,
};
