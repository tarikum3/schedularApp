CREATE MATERIALIZED VIEW order_status_summary AS
SELECT
    DATE("createdAt") AS day,
    COUNT(id) AS total_orders,
    SUM(CASE WHEN "status" = 'PENDING' THEN 1 ELSE 0 END) AS pending_orders,
    SUM(CASE WHEN "status" = 'CONFIRMED' THEN 1 ELSE 0 END) AS confirmed_orders,
    SUM(CASE WHEN "status" = 'COMPLETED' THEN 1 ELSE 0 END) AS completed_orders,
    SUM(CASE WHEN "status" = 'CANCELED' THEN 1 ELSE 0 END) AS canceled_orders,
    SUM(CASE WHEN "status" = 'REFUNDED' THEN 1 ELSE 0 END) AS refunded_orders
FROM
    "Order"  -- Use double quotes to match Prisma's exact table name
GROUP BY
    DATE("createdAt");



INSERT INTO refresh_metadata (view_name, last_refreshed_date)
VALUES ('order_status_summary', CURRENT_DATE);