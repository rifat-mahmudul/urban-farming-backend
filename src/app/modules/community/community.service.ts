import { prisma } from "../../../lib/prisma";

const createPost = async (userId: string, payload: any) => {
  return prisma.communityPost.create({
    data: {
      userId,
      postContent: payload.postContent,
    },
  });
};

const getAllPosts = async () => {
  return prisma.communityPost.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const CommunityService = {
  createPost,
  getAllPosts,
};