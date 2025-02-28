-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('NEW_PRODUCT', 'NEW_USER', 'STOCK_OUT');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('OPENED', 'VIEWED', 'PENDING');

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "link" TEXT,
    "type" "NotificationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserNotification" (
    "userId" TEXT NOT NULL,
    "notificationId" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserNotification_pkey" PRIMARY KEY ("userId","notificationId")
);

-- CreateTable
CREATE TABLE "daily_new_customers" (
    "day" DATE NOT NULL,
    "new_customers" INTEGER NOT NULL,

    CONSTRAINT "daily_new_customers_pkey" PRIMARY KEY ("day")
);

-- CreateTable
CREATE TABLE "daily_new_orders" (
    "day" DATE NOT NULL,
    "new_orders" INTEGER NOT NULL,

    CONSTRAINT "daily_new_orders_pkey" PRIMARY KEY ("day")
);

-- CreateTable
CREATE TABLE "order_status_summary" (
    "day" DATE NOT NULL,
    "total_orders" INTEGER NOT NULL,
    "pending_orders" INTEGER NOT NULL,
    "processing_orders" INTEGER NOT NULL,
    "shipped_orders" INTEGER NOT NULL,
    "delivered_orders" INTEGER NOT NULL,
    "cancelled_orders" INTEGER NOT NULL,
    "completed_revenue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "order_status_summary_pkey" PRIMARY KEY ("day")
);

-- CreateTable
CREATE TABLE "customer_status_summary" (
    "day" DATE NOT NULL,
    "total_customers" INTEGER NOT NULL,
    "one_time_customers" INTEGER NOT NULL,
    "returning_customers" INTEGER NOT NULL,
    "vip_customers" INTEGER NOT NULL,
    "normal_customers" INTEGER NOT NULL,
    "active_customers" INTEGER NOT NULL,
    "inactive_customers" INTEGER NOT NULL,

    CONSTRAINT "customer_status_summary_pkey" PRIMARY KEY ("day")
);

-- CreateIndex
CREATE INDEX "UserNotification_userId_idx" ON "UserNotification"("userId");

-- CreateIndex
CREATE INDEX "UserNotification_notificationId_idx" ON "UserNotification"("notificationId");

-- AddForeignKey
ALTER TABLE "UserNotification" ADD CONSTRAINT "UserNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotification" ADD CONSTRAINT "UserNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
