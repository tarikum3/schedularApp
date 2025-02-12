-- Create the materialized view
CREATE MATERIALIZED VIEW daily_new_customers AS
SELECT
    DATE("createdAt") AS day,
    COUNT(id) AS new_customers
FROM
    "Customer"  -- Use double quotes to match Prisma's exact table name
GROUP BY
    DATE("createdAt");

-- Create the refresh_metadata table
CREATE TABLE refresh_metadata (
    view_name TEXT PRIMARY KEY,
    last_refreshed_date DATE
);

-- Initialize the metadata table with an entry for the materialized view
INSERT INTO refresh_metadata (view_name, last_refreshed_date)
VALUES ('daily_new_customers', CURRENT_DATE);





