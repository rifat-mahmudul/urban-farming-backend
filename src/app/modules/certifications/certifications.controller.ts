import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { certificationsService } from "./certifications.service";

const createCertification = async (req: Request, res: Response) => {
  const result = await certificationsService.createCertification(
    req.user.userId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Certification submitted",
    data: result,
  });
};

const getAllCertifications = async (req: Request, res: Response) => {
  const result = await certificationsService.getAllCertifications();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Certifications fetched successfully",
    data: result,
  });
};

export const CertificationController = {
  createCertification,
  getAllCertifications,
};