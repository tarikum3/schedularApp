/*
  Warnings:

  - You are about to drop the column `cancelled_orders` on the `order_status_summary` table. All the data in the column will be lost.
  - You are about to drop the column `delivered_orders` on the `order_status_summary` table. All the data in the column will be lost.
  - You are about to drop the column `processing_orders` on the `order_status_summary` table. All the data in the column will be lost.
  - You are about to drop the column `shipped_orders` on the `order_status_summary` table. All the data in the column will be lost.
  - Added the required column `canceled_orders` to the `order_status_summary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completed_orders` to the `order_status_summary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confirmed_orders` to the `order_status_summary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refunded_orders` to the `order_status_summary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_status_summary" DROP COLUMN "cancelled_orders",
DROP COLUMN "delivered_orders",
DROP COLUMN "processing_orders",
DROP COLUMN "shipped_orders",
ADD COLUMN     "canceled_orders" INTEGER NOT NULL,
ADD COLUMN     "completed_orders" INTEGER NOT NULL,
ADD COLUMN     "confirmed_orders" INTEGER NOT NULL,
ADD COLUMN     "refunded_orders" INTEGER NOT NULL;
