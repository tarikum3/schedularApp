/*
  Warnings:

  - You are about to drop the column `endTimes` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `isCustom` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `isWorkingDay` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleId` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `startTimes` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `endTimes` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `isWorkingDay` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `startTimes` on the `Schedule` table. All the data in the column will be lost.
  - The `days` column on the `Schedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `scheduleType` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ScheduleType" AS ENUM ('MEETING', 'APPOINTMENT', 'PERSONAL');

-- DropForeignKey
ALTER TABLE "Day" DROP CONSTRAINT "Day_scheduleId_fkey";

-- AlterTable
ALTER TABLE "Day" DROP COLUMN "endTimes",
DROP COLUMN "isCustom",
DROP COLUMN "isWorkingDay",
DROP COLUMN "scheduleId",
DROP COLUMN "startTimes";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "endTimes",
DROP COLUMN "isWorkingDay",
DROP COLUMN "startTimes",
ADD COLUMN     "scheduleType" "ScheduleType" NOT NULL,
DROP COLUMN "days",
ADD COLUMN     "days" "DayEnum"[] DEFAULT ARRAY[]::"DayEnum"[];

-- CreateTable
CREATE TABLE "_DaySchedules" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DaySchedules_AB_unique" ON "_DaySchedules"("A", "B");

-- CreateIndex
CREATE INDEX "_DaySchedules_B_index" ON "_DaySchedules"("B");

-- AddForeignKey
ALTER TABLE "_DaySchedules" ADD CONSTRAINT "_DaySchedules_A_fkey" FOREIGN KEY ("A") REFERENCES "Day"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DaySchedules" ADD CONSTRAINT "_DaySchedules_B_fkey" FOREIGN KEY ("B") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
