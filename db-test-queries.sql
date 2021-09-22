SELECT users.id,users.name, listings.*
FROM user_favorite
JOIN users ON user_favorite.user_id = users.id
JOIN listings ON user_favorite.listing_id = listings.id;


-- SELECT listings.*, types.name, time_period.name
-- FROM listings
-- JOIN types ON listings.type_id = types.id
-- JOIN time_period ON listings.time_period_id = time_period.id;

