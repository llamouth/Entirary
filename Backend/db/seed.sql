\c entirary_dev;

-- Clear existing data (if necessary)
TRUNCATE users, destinations, recommendations, flights, weather, festivals, user_activity RESTART IDENTITY CASCADE;

-- Insert dummy data into users
INSERT INTO users (first_name, last_name, username, email, password_hash, profile_picture_url, bio, role)
VALUES
    ('John', 'Doe', 'johndoe', 'john.doe@example.com', 'hashedpassword1', 'https://via.placeholder.com/150', 'Travel enthusiast.', 'user'),
    ('Jane', 'Smith', 'janesmith', 'jane.smith@example.com', 'hashedpassword2', 'https://via.placeholder.com/150', 'Loves exploring new places.', 'user'),
    ('Admin', 'User', 'adminuser', 'admin@example.com', 'hashedpassword3', 'https://via.placeholder.com/150', 'Site administrator.', 'admin');

-- Insert dummy data into destinations
INSERT INTO destinations (country, city, name, description, latitude, longitude)
VALUES
    ('France', 'Paris', 'Eiffel Tower', 'Iconic Parisian landmark and world-famous tower.', 48.858844, 2.294351),
    ('USA', 'New York', 'Statue of Liberty', 'Symbol of freedom and democracy.', 40.689247, -74.044502),
    ('Italy', 'Rome', 'Colosseum', 'Ancient Roman amphitheater and historic site.', 41.890251, 12.492373);

-- Insert dummy data into recommendations
INSERT INTO recommendations (destination_id, user_id, name, description, rating, total_reviews)
VALUES
    (1, 1, 'Best view from the top!', 'You can see all of Paris from here. Totally worth it!', 4.8, 1200),
    (2, 2, 'Great experience', 'Loved the ferry ride and the view of Manhattan.', 4.5, 800),
    (3, 1, 'Amazing history', 'A must-see for history buffs. Very well preserved.', 4.7, 950);

-- Insert dummy data into flights
INSERT INTO flights (destination_id, departure_date, return_date, price, airline)
VALUES
    (1, '2024-12-10', '2024-12-20', 650.00, 'Air France'),
    (2, '2024-11-15', '2024-11-25', 550.00, 'Delta Airlines'),
    (3, '2024-10-05', '2024-10-15', 700.00, 'Alitalia');

-- Insert dummy data into weather
INSERT INTO weather (destination_id, forecast_date, temperature, condition)
VALUES
    (1, '2024-12-10', 8, 'Cloudy'),
    (2, '2024-11-15', 12, 'Sunny'),
    (3, '2024-10-05', 18, 'Partly Cloudy');

-- Insert dummy data into festivals
INSERT INTO festivals (destination_id, name, description, start_date, end_date)
VALUES
    (1, 'Paris Jazz Festival', 'Celebration of jazz music in the heart of Paris.', '2024-06-01', '2024-06-30'),
    (2, 'Macys Thanksgiving Day Parade', 'Iconic parade in New York City during Thanksgiving.', '2024-11-28', '2024-11-28'),
    (3, 'Rome Film Festival', 'Annual film festival showcasing Italian and international movies.', '2024-10-15', '2024-10-25');

-- Insert dummy data into user_activity
INSERT INTO user_activity (user_id, action, created_at)
VALUES
    (1, 'login', '2024-11-20'),
    (2, 'recommendation', '2024-11-18'),
    (3, 'flight search', '2024-11-19');
