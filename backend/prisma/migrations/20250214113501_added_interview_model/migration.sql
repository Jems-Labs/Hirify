-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'accepted');

-- CreateTable
CREATE TABLE "Interview" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "roleOffered" TEXT NOT NULL,
    "candidateEmail" TEXT NOT NULL,
    "interviewerId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_interviewerId_fkey" FOREIGN KEY ("interviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
