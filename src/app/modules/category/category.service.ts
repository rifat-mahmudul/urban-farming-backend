import { prisma } from "../../../lib/prisma";

interface CategoryPayload {
  name: string;
}

const createCategory = async (payload: CategoryPayload) => {
  const category = await prisma.category.create({
    data: {
      name: payload.name,
    },
  });

  return category;
};

const getAllCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      products: true,
    },
  });
};

export const CategoryService = {
  createCategory,
  getAllCategories,
};
