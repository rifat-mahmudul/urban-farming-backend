import httpStatus from "http-status-codes";
import { OrderService } from "./order.service";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from "express";

const createOrder = async (req: Request, res: Response) => {
  const result = await OrderService.createOrder(req.user.userId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order created successfully",
    data: result,
  });
};

const getMyOrders = async (req: Request, res: Response) => {
  const result = await OrderService.getMyOrders(req.user.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders fetched successfully",
    data: result,
  });
};

export const OrderController = {
  createOrder,
  getMyOrders,
};