-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "buttonColor" TEXT,
ADD COLUMN     "textColor" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "gradientBgColor" TEXT,
ADD COLUMN     "textColor" TEXT;

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "bgColor" TEXT,
ADD COLUMN     "textColor" TEXT;
