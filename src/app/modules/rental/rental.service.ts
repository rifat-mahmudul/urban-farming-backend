import AppError from "../../../errors/appError";
import { prisma } from "../../../lib/prisma";
import httpsStatus from "http-status-codes";

const createSpace = async (userId: string, payload: any) => {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId },
  });

  if (!vendor) {
    throw new AppError(httpsStatus.BAD_REQUEST, "Vendor not found");
  }

  return prisma.rentalSpace.create({
    data: {
      vendorId: vendor.id,
      title: payload.title,
      location: payload.location,
      size: payload.size,
      pricePerDay: payload.pricePerDay,
    },
  });
};

const getAllSpaces = async () => {
  return prisma.rentalSpace.findMany({
    include: {
      vendor: true,
    },
  });
};

const bookSpace = async (userId: string, payload: any) => {
  const space = await prisma.rentalSpace.findUnique({
    where: { id: payload.spaceId },
  });

  if (!space || !space.isAvailable) {
    throw new AppError(httpsStatus.BAD_REQUEST, "Space not available");
  }

  const days =
    (new Date(payload.endDate).getTime() -
      new Date(payload.startDate).getTime()) /
    (1000 * 60 * 60 * 24);

  const totalCost = days * space.pricePerDay;

  const booking = await prisma.rentalBooking.create({
    data: {
      userId,
      spaceId: payload.spaceId,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      totalCost,
    },
  });

  return booking;
};

export const RentalServices = {
  createSpace,
  getAllSpaces,
  bookSpace,
};
