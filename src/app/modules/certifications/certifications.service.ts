import { prisma } from "../../../lib/prisma";

const createCertification = async (userId: string, payload: any) => {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId },
  });

  if (!vendor) {
    throw new Error("Vendor profile not found");
  }

  return prisma.sustainabilityCert.create({
    data: {
      vendorId: vendor.id,
      certifyingAgency: payload.certifyingAgency,
      certificationDate: new Date(payload.certificationDate),
    },
  });
};

const getAllCertifications = async () => {
  return prisma.sustainabilityCert.findMany({
    include: {
      vendor: true,
    },
  });
};

export const certificationsService = {
  createCertification,
  getAllCertifications,
};
