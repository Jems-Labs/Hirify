/*
  Warnings:

  - You are about to drop the column `status` on the `Interview` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "userStatus" AS ENUM ('openToWork', 'hiring');

-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "roles" TEXT[],
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "status" "userStatus" NOT NULL DEFAULT 'openToWork';

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" SERIAL NOT NULL,
    "employer" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "fromDate" TEXT NOT NULL,
    "toDate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
