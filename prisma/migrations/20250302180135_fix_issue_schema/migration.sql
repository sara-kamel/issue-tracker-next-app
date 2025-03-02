/*
  Warnings:

  - You are about to drop the column `creatAt` on the `Issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_assignedToUserId_fkey";

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "creatAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "assignedToUserId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
