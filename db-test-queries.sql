SELECT listings.*, types.name, time_period.name
FROM listings
JOIN types ON listings.type_id = types.id
JOIN time_period ON listings.time_period_id = time_period.id;

