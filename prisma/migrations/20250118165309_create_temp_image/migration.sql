-- CreateTable
CREATE TABLE "TempImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "imageFor" TEXT NOT NULL,
    "supabaseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TempImage_pkey" PRIMARY KEY ("id")
);
