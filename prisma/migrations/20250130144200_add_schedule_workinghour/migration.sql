-- CreateEnum
CREATE TYPE "Day" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "days" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "startTimes" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[],
    "endTimes" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[],
    "isWorkingDay" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workinghour" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "day" "Day" NOT NULL,
    "startTimes" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[],
    "endTimes" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[],
    "isWorkingDay" BOOLEAN NOT NULL DEFAULT true,
    "isCustom" BOOLEAN NOT NULL DEFAULT false,
    "year" TEXT NOT NULL,
    "scheduleId" INTEGER,

    CONSTRAINT "Workinghour_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workinghour" ADD CONSTRAINT "Workinghour_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
