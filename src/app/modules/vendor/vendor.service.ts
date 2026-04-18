import { prisma } from "../../../lib/prisma";

interface VendorPayload {
  userId: string;
  farmName: string;
  farmLocation: string;
}

const createVendor = async (payload: VendorPayload) => {
  const vendor = await prisma.vendorProfile.create({
    data: {
      userId: payload.userId,
      farmName: payload.farmName,
      farmLocation: payload.farmLocation,
    },
  });

  return vendor;
};

const getAllVendors = async () => {
  return await prisma.vendorProfile.findMany({
    include: {
      user: true,
    },
  });
};

export const VendorService = {
  createVendor,
  getAllVendors,
};
