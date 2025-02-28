DROP TABLE IF EXISTS order_status_summary;
DROP TABLE IF EXISTS customer_status_summary;
DROP TABLE IF EXISTS daily_new_orders;
DROP TABLE IF EXISTS daily_new_customers;
  
DROP MATERIALIZED VIEW IF EXISTS order_status_summary;
DROP MATERIALIZED VIEW IF EXISTS customer_status_summary;
DROP MATERIALIZED VIEW IF EXISTS daily_new_orders;
DROP MATERIALIZED VIEW IF EXISTS daily_new_customers;  
-- Create the updated materialized view
CREATE MATERIALIZED VIEW order_status_summary AS
SELECT
    DATE("createdAt") AS day,
    COUNT(id) AS total_orders,
    SUM(CASE WHEN "status" = 'PENDING' THEN 1 ELSE 0 END) AS pending_orders,
    SUM(CASE WHEN "status" = 'CONFIRMED' THEN 1 ELSE 0 END) AS confirmed_orders,
    SUM(CASE WHEN "status" = 'COMPLETED' THEN 1 ELSE 0 END) AS completed_orders,
    SUM(CASE WHEN "status" = 'CANCELED' THEN 1 ELSE 0 END) AS canceled_orders,
    SUM(CASE WHEN "status" = 'REFUNDED' THEN 1 ELSE 0 END) AS refunded_orders,
    SUM(CASE WHEN "status" = 'COMPLETED' THEN "totalPrice" ELSE 0 END) AS completed_revenue  -- Added revenue from completed orders
FROM
    "Order"
GROUP BY
    DATE("createdAt");


    CREATE MATERIALIZED VIEW customer_status_summary AS
SELECT
    DATE("createdAt") AS day,
    COUNT(id) AS total_customers,
    SUM(CASE WHEN "totalOrders" = 1 THEN 1 ELSE 0 END) AS one_time_customers,
    SUM(CASE WHEN "totalOrders" > 1 THEN 1 ELSE 0 END) AS returning_customers,
    SUM(CASE WHEN "totalSpent" >= 1000 THEN 1 ELSE 0 END) AS vip_customers,
    SUM(CASE WHEN "totalSpent" < 1000 THEN 1 ELSE 0 END) AS normal_customers,
    SUM(CASE WHEN COALESCE("lastOrderDate", '1970-01-01') >= CURRENT_DATE - INTERVAL '30 days' THEN 1 ELSE 0 END) AS active_customers,
    SUM(CASE WHEN COALESCE("lastOrderDate", '1970-01-01') < CURRENT_DATE - INTERVAL '30 days' THEN 1 ELSE 0 END) AS inactive_customers
FROM
    "Customer"
GROUP BY
    DATE("createdAt");

    -- Create the materialized view
CREATE MATERIALIZED VIEW daily_new_orders AS
SELECT
    DATE("createdAt") AS day,
    COUNT(id) AS new_orders
FROM
    "Order"  -- Use double quotes to match Prisma's exact table name
GROUP BY
    DATE("createdAt");

-- Create the materialized view
CREATE MATERIALIZED VIEW daily_new_customers AS
SELECT
    DATE("createdAt") AS day,
    COUNT(id) AS new_customers
FROM
    "Customer"  -- Use double quotes to match Prisma's exact table name
GROUP BY
    DATE("createdAt");



 


