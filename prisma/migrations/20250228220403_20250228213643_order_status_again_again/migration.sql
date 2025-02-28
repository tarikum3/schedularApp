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
    "confirmed_orders" INTEGER NOT NULL,
    "completed_orders" INTEGER NOT NULL,
    "canceled_orders" INTEGER NOT NULL,
    "refunded_orders" INTEGER NOT NULL,
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
