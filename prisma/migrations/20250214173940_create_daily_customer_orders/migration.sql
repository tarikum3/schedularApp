-- Create the materialized view
CREATE MATERIALIZED VIEW daily_new_orders AS
SELECT
    DATE("createdAt") AS day,
    COUNT(id) AS new_orders
FROM
    "Order"  -- Use double quotes to match Prisma's exact table name
GROUP BY
    DATE("createdAt");


