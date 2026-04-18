import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { CommunityService } from "./community.service";

const createPost = async (req: Request, res: Response) => {
  const result = await CommunityService.createPost(req.user.userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Post created successfully",
    data: result,
  });
};

const getAllPosts = async (req: Request, res: Response) => {
  const result = await CommunityService.getAllPosts();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Posts fetched successfully",
    data: result,
  });
};

export const CommunityController = {
  createPost,
  getAllPosts,
};
