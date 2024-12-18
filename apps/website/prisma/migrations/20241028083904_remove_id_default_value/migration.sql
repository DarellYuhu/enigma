/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `ApiUrl` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ApiUrl" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "ApiUrl_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "ApiUrl_url_key" ON "ApiUrl"("url");
