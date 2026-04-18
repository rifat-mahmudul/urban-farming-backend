import { prisma } from "../../../lib/prisma";

interface CartPayload {
  productId: string;
  quantity: number;
}

const addToCart = async (userId: string, payload: CartPayload) => {
  const cart = await prisma.cart.upsert({
    where: {
      userId_productId: {
        userId,
        productId: payload.productId,
      },
    },
    update: {
      quantity: {
        increment: payload.quantity,
      },
    },
    create: {
      userId,
      productId: payload.productId,
      quantity: payload.quantity,
    },
  });

  return cart;
};

const getMyCart = async (userId: string) => {
  return prisma.cart.findMany({
    where: { userId },
    include: {
      product: true,
    },
  });
};

const removeFromCart = async (userId: string, productId: string) => {
  return prisma.cart.delete({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
};

export const CartService = {
  addToCart,
  getMyCart,
  removeFromCart,
};
