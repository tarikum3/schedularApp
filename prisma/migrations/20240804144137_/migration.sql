/*
  Warnings:

  - You are about to drop the column `descriptionHtml` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Product` table. All the data in the column will be lost.
  - Added the required column `price` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_slug_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "descriptionHtml",
DROP COLUMN "path",
DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;
