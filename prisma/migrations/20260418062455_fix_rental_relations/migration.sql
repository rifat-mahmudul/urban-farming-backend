-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- CreateTable
CREATE TABLE "RentalSpace" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "pricePerDay" DOUBLE PRECISION NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RentalSpace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalBooking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RentalBooking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RentalSpace" ADD CONSTRAINT "RentalSpace_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "VendorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalBooking" ADD CONSTRAINT "RentalBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalBooking" ADD CONSTRAINT "RentalBooking_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "RentalSpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
