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

    CONSTRAINT "order_status_summary_pkey" PRIMARY KEY ("day")
);
