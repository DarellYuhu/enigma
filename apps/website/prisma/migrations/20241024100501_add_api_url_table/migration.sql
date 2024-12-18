-- CreateEnum
CREATE TYPE "Type" AS ENUM ('YOUTUBE', 'TIKTOK');

-- CreateTable
CREATE TABLE "ApiUrl" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApiUrl_pkey" PRIMARY KEY ("id")
);
