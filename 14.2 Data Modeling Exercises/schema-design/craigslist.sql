-- Drop existing databases
DROP DATABASE IF EXISTS craigslist_db;

-- Create the database
CREATE DATABASE craigslist_db;

\c craigslist_db

-- Regions Table
CREATE TABLE regions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  preferred_region_id INT,
  FOREIGN KEY (preferred_region_id) REFERENCES regions(id)
);

-- Posts Table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  user_id INT,
  location TEXT NOT NULL,
  region_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (region_id) REFERENCES regions(id)
);

-- Categories Table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- Post Categories Table
CREATE TABLE post_categories (
  post_id INT,
  category_id INT,
  PRIMARY KEY (post_id, category_id),
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);




-- Inserting regions into the system
INSERT INTO regions (name)
VALUES
  ('San Francisco'),
  ('Atlanta'),
  ('Seattle');

-- Inserting users into the system
INSERT INTO users (name, email, preferred_region_id)
VALUES
  ('John Doe', 'john.doe@example.com', 1),
  ('Jane Smith', 'jane.smith@example.com', 2);

-- Inserting some posts
INSERT INTO posts (title, text, user_id, location, region_id)
VALUES
  ('Apartment for Rent', 'Spacious 2-bedroom apartment available for rent.', 1, 'Mission District, SF', 1),
  ('Job Opening: Software Engineer', 'Looking for a software engineer to join our team.', 2, 'Atlanta, GA', 2);

-- Inserting categories into the system
INSERT INTO categories (name)
VALUES
  ('Housing'),
  ('Jobs'),
  ('For Sale');

-- Inserting posts for categories
INSERT INTO post_categories (post_id, category_id)
VALUES
  (1, 1),  -- Apartment for Rent is a Housing post
  (2, 2);  -- Job Opening: Software Engineer is a Jobs post




-- Get all posts in a specific region
SELECT p.title, p.text, u.name AS author, r.name AS region
FROM posts p
JOIN users u ON p.user_id = u.id
JOIN regions r ON p.region_id = r.id
WHERE r.name = 'San Francisco';

-- Get all categories for a specific post
SELECT c.name AS category
FROM categories c
JOIN post_categories pc ON c.id = pc.category_id
WHERE pc.post_id = 1;
