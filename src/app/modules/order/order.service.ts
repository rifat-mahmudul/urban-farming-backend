import AppError from "../../../errors/appError";
import { prisma } from "../../../lib/prisma";
import httpStatus from "http-status-codes";

const createOrder = async (userId: string) => {
  const cartItems = await prisma.cart.findMany({
    where: { userId },
    include: { product: true },
  });

  if (!cartItems.length) {
    throw new AppError(httpStatus.BAD_REQUEST, "Cart is empty");
  }

  const total = cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      userId,
      total,
      items: {
        create: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
    include: {
      items: true,
    },
  });

  await prisma.cart.deleteMany({
    where: { userId },
  });

  return order;
};

const getMyOrders = async (userId: string) => {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const OrderService = {
  createOrder,
  getMyOrders,
};
