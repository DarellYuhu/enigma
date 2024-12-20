/*
  Warnings:

  - A unique constraint covering the columns `[metricId,end_time]` on the table `Values` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Values_metricId_end_time_key" ON "Values"("metricId", "end_time");
