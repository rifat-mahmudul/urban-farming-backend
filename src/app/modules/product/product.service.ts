import { prisma } from "../../../lib/prisma";

interface ProductPayload {
  name: string;
  price: number;
  quantity: number;
  description?: string;
  categoryId: string;
}

interface QueryParams {
  search?: string;
  categoryId?: string;
  vendorId?: string;
  page?: number;
  limit?: number;
}

const createProduct = async (userId: string, payload: ProductPayload) => {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId },
  });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  const product = await prisma.product.create({
    data: {
      name: payload.name,
      price: payload.price,
      quantity: payload.quantity,
      description: payload.description,
      categoryId: payload.categoryId,
      vendorId: vendor.id,
    },
  });

  return product;
};

const getAllProducts = async (query: QueryParams) => {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const skip = (page - 1) * limit;

  const products = await prisma.product.findMany({
    where: {
      AND: [
        query.search
          ? {
              name: {
                contains: query.search,
                mode: "insensitive",
              },
            }
          : {},
        query.categoryId ? { categoryId: query.categoryId } : {},
        query.vendorId ? { vendorId: query.vendorId } : {},
      ],
    },
    include: {
      vendor: true,
      category: true,
    },
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.product.count();

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: products,
  };
};

export const ProductService = {
  createProduct,
  getAllProducts,
};
