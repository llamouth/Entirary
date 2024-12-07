\c entirary_dev;

-- Trigger function to update `updated_at` on row update
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to the `users`, `destinations`, `recommendations`, `flights`, `weather`, `festivals` tables
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_recommendations_updated_at
BEFORE UPDATE ON recommendations
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_flights_updated_at
BEFORE UPDATE ON flights
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_weather_updated_at
BEFORE UPDATE ON weather
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_festivals_updated_at
BEFORE UPDATE ON festivals
FOR EACH ROW EXECUTE FUNCTION update_timestamp();