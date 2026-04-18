import { Request, Response } from "express";
import { CartService } from "./cart.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const addToCart = async (req: Request, res: Response) => {
  const result = await CartService.addToCart(
    req.user.userId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Item added to cart",
    data: result,
  });
};

const getMyCart = async (req: Request, res: Response) => {
  const result = await CartService.getMyCart(req.user.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart fetched successfully",
    data: result,
  });
};

const removeFromCart = async (req: Request, res: Response) => {
  const productId = Array.isArray(req.params.productId)
    ? req.params.productId[0]
    : req.params.productId;

  const result = await CartService.removeFromCart(
    req.user.userId,
    productId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Item removed from cart",
    data: result,
  });
};

export const CartController = {
  addToCart,
  getMyCart,
  removeFromCart,
};