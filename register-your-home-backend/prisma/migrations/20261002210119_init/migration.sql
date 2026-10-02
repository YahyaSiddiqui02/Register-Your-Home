-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('BUYER_TENANT', 'OWNER', 'LIAISON', 'ADMIN');

-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('RENT', 'SALE');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('FLAT', 'HOUSE', 'PLOT', 'PG', 'SHOP');

-- CreateEnum
CREATE TYPE "FurnishingStatus" AS ENUM ('UNFURNISHED', 'SEMI_FURNISHED', 'FULLY_FURNISHED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'BUYER_TENANT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "listingType" "ListingType" NOT NULL,
    "propertyType" "PropertyType" NOT NULL,
    "furnished" "FurnishingStatus" NOT NULL,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "areaSqFt" INTEGER,
    "price" DECIMAL(12,2) NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
