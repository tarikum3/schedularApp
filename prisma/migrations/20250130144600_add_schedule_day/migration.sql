/*
  Warnings:

  - You are about to drop the `Workinghour` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DayEnum" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- DropForeignKey
ALTER TABLE "Workinghour" DROP CONSTRAINT "Workinghour_scheduleId_fkey";

-- DropTable
DROP TABLE "Workinghour";

-- DropEnum
DROP TYPE "Day";

-- CreateTable
CREATE TABLE "Day" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "dayName" "DayEnum" NOT NULL,
    "startTimes" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[],
    "endTimes" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[],
    "isWorkingDay" BOOLEAN NOT NULL DEFAULT true,
    "isCustom" BOOLEAN NOT NULL DEFAULT false,
    "year" TEXT NOT NULL,
    "scheduleId" INTEGER,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
