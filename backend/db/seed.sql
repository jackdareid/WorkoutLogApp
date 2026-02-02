-- backend/db/seed.sql

-- Create fake user
INSERT INTO users (f_name, l_name, email, password_hash)
VALUES ('Test', 'Testy', 'testy@gmail.com', 'fake_password!'); 

-- Create exercise data
INSERT INTO exercises (name, muscle_group)
VALUES
('Bench Press', 'Chest'),
('Incline Dumbbell Press', 'Chest'),
('Chest Fly', 'Chest'),
('Squat', 'Legs'),
('Leg Press', 'Legs'),
('Leg Extension', 'Legs'),
('Leg Curl', 'Legs'),
('Deadlift', 'Back'),
('Pull Up', 'Back'),
('Barbell Row', 'Back'),
('Overhead Press', 'Shoulders'),
('Lateral Raise', 'Shoulders'),
('Dumbbell Curl', 'Arms'),
('Tricep Pushdown', 'Arms'),
('Plank', 'Core');
