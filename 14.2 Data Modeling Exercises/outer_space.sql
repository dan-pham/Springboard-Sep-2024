-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  orbits_around TEXT NOT NULL,
  galaxy TEXT NOT NULL,
  moons TEXT[]
);

INSERT INTO planets
  (name, orbital_period_in_years, orbits_around, galaxy, moons)
VALUES
  ('Earth', 1.00, 'The Sun', 'Milky Way', '{"The Moon"}'),
  ('Mars', 1.88, 'The Sun', 'Milky Way', '{"Phobos", "Deimos"}'),
  ('Venus', 0.62, 'The Sun', 'Milky Way', '{}'),
  ('Neptune', 164.8, 'The Sun', 'Milky Way', '{"Naiad", "Thalassa", "Despina", "Galatea", "Larissa", "S/2004 N 1", "Proteus", "Triton", "Nereid", "Halimede", "Sao", "Laomedeia", "Psamathe", "Neso"}'),
  ('Proxima Centauri b', 0.03, 'Proxima Centauri', 'Milky Way', '{}'),
  ('Gliese 876 b', 0.23, 'Gliese 876', 'Milky Way', '{}');




-- Critique:
-- Because moons is stored in an array, it's violating normalization by storing multiple values in a single column.
-- This makes it harder to query, update, and maintain.
-- It also violates the open-closed principle in that it is not open for easy extension, 
-- and would require modifying the entire planets table to add in details for the moons. 

-- Solution:

-- Planets Table
CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  orbits_around TEXT NOT NULL,
  galaxy TEXT NOT NULL
);

-- Moons Table
CREATE TABLE moons
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  planet_id INT NOT NULL,
  FOREIGN KEY (planet_id) REFERENCES planets(id) ON DELETE CASCADE
);

-- Insert data into planets table
INSERT INTO planets
  (name, orbital_period_in_years, orbits_around, galaxy)
VALUES
  ('Earth', 1.00, 'The Sun', 'Milky Way'),
  ('Mars', 1.88, 'The Sun', 'Milky Way'),
  ('Venus', 0.62, 'The Sun', 'Milky Way'),
  ('Neptune', 164.8, 'The Sun', 'Milky Way'),
  ('Proxima Centauri b', 0.03, 'Proxima Centauri', 'Milky Way'),
  ('Gliese 876 b', 0.23, 'Gliese 876', 'Milky Way');

-- Insert data into moons table
INSERT INTO moons (name, planet_id)
VALUES
  ('The Moon', 1),  -- Moon of Earth (planet_id = 1)
  ('Phobos', 2),    -- Moon of Mars (planet_id = 2)
  ('Deimos', 2),    -- Moon of Mars (planet_id = 2)
  ('Naiad', 4),     -- Moon of Neptune (planet_id = 4)
  ('Thalassa', 4),  -- Moon of Neptune (planet_id = 4)
  ('Despina', 4),   -- Moon of Neptune (planet_id = 4)
  ('Galatea', 4),   -- Moon of Neptune (planet_id = 4)
  ('Larissa', 4),   -- Moon of Neptune (planet_id = 4)
  ('S/2004 N 1', 4),-- Moon of Neptune (planet_id = 4)
  ('Proteus', 4),   -- Moon of Neptune (planet_id = 4)
  ('Triton', 4),    -- Moon of Neptune (planet_id = 4)
  ('Nereid', 4),    -- Moon of Neptune (planet_id = 4)
  ('Halimede', 4),  -- Moon of Neptune (planet_id = 4)
  ('Sao', 4),       -- Moon of Neptune (planet_id = 4)
  ('Laomedeia', 4), -- Moon of Neptune (planet_id = 4)
  ('Psamathe', 4),  -- Moon of Neptune (planet_id = 4)
  ('Neso', 4);      -- Moon of Neptune (planet_id = 4)