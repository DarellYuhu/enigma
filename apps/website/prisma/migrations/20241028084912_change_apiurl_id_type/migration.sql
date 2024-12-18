/*
  Warnings:

  - The primary key for the `ApiUrl` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ApiUrl" DROP CONSTRAINT "ApiUrl_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ApiUrl_pkey" PRIMARY KEY ("id");
