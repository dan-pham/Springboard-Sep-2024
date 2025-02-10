-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  release_date DATE NOT NULL,
  artists TEXT[] NOT NULL,
  album TEXT NOT NULL,
  producers TEXT[] NOT NULL
);

INSERT INTO songs
  (title, duration_in_seconds, release_date, artists, album, producers)
VALUES
  ('MMMBop', 238, '04-15-1997', '{"Hanson"}', 'Middle of Nowhere', '{"Dust Brothers", "Stephen Lironi"}'),
  ('Bohemian Rhapsody', 355, '10-31-1975', '{"Queen"}', 'A Night at the Opera', '{"Roy Thomas Baker"}'),
  ('One Sweet Day', 282, '11-14-1995', '{"Mariah Cary", "Boyz II Men"}', 'Daydream', '{"Walter Afanasieff"}'),
  ('Shallow', 216, '09-27-2018', '{"Lady Gaga", "Bradley Cooper"}', 'A Star Is Born', '{"Benjamin Rice"}'),
  ('How You Remind Me', 223, '08-21-2001', '{"Nickelback"}', 'Silver Side Up', '{"Rick Parashar"}'),
  ('New York State of Mind', 276, '10-20-2009', '{"Jay Z", "Alicia Keys"}', 'The Blueprint 3', '{"Al Shux"}'),
  ('Dark Horse', 215, '12-17-2013', '{"Katy Perry", "Juicy J"}', 'Prism', '{"Max Martin", "Cirkut"}'),
  ('Moves Like Jagger', 201, '06-21-2011', '{"Maroon 5", "Christina Aguilera"}', 'Hands All Over', '{"Shellback", "Benny Blanco"}'),
  ('Complicated', 244, '05-14-2002', '{"Avril Lavigne"}', 'Let Go', '{"The Matrix"}'),
  ('Say My Name', 240, '11-07-1999', '{"Destiny''s Child"}', 'The Writing''s on the Wall', '{"Darkchild"}');




-- Critique:
-- Songs can have multiple artists and producers, but artists and producers can have multiple songs as well.
-- To express many-to-many relationships, we need to insert songs individually for their relationship tables.
-- To avoid redundancy, artists and producers can be made into their own tables.

-- Solution:

-- Artists Table
CREATE TABLE artists
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- Producers Table
CREATE TABLE producers
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- Songs Table
CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  release_date DATE NOT NULL,
  album TEXT NOT NULL
);

-- Song-Artist Relationship Table (Many-to-Many)
CREATE TABLE song_artists
(
  song_id INTEGER REFERENCES songs(id),
  artist_id INTEGER REFERENCES artists(id),
  PRIMARY KEY (song_id, artist_id)
);

-- Song-Producer Relationship Table (Many-to-Many)
CREATE TABLE song_producers
(
  song_id INTEGER REFERENCES songs(id),
  producer_id INTEGER REFERENCES producers(id),
  PRIMARY KEY (song_id, producer_id)
);

-- Inserting artists
INSERT INTO artists (name)
VALUES
  ('Hanson'),
  ('Queen'),
  ('Mariah Carey'),
  ('Boyz II Men'),
  ('Lady Gaga'),
  ('Bradley Cooper'),
  ('Nickelback'),
  ('Jay Z'),
  ('Alicia Keys'),
  ('Katy Perry'),
  ('Juicy J'),
  ('Maroon 5'),
  ('Christina Aguilera'),
  ('Avril Lavigne'),
  ('Destiny''s Child');

-- Inserting producers
INSERT INTO producers (name)
VALUES
  ('Dust Brothers'),
  ('Stephen Lironi'),
  ('Roy Thomas Baker'),
  ('Walter Afanasieff'),
  ('Benjamin Rice'),
  ('Rick Parashar'),
  ('Al Shux'),
  ('Max Martin'),
  ('Cirkut'),
  ('Shellback'),
  ('Benny Blanco'),
  ('The Matrix'),
  ('Darkchild');

-- Inserting songs
INSERT INTO songs (title, duration_in_seconds, release_date, album)
VALUES
  ('MMMBop', 238, '1997-04-15', 'Middle of Nowhere'),
  ('Bohemian Rhapsody', 355, '1975-10-31', 'A Night at the Opera'),
  ('One Sweet Day', 282, '1995-11-14', 'Daydream'),
  ('Shallow', 216, '2018-09-27', 'A Star Is Born'),
  ('How You Remind Me', 223, '2001-08-21', 'Silver Side Up'),
  ('New York State of Mind', 276, '2009-10-20', 'The Blueprint 3'),
  ('Dark Horse', 215, '2013-12-17', 'Prism'),
  ('Moves Like Jagger', 201, '2011-06-21', 'Hands All Over'),
  ('Complicated', 244, '2002-05-14', 'Let Go'),
  ('Say My Name', 240, '1999-11-07', 'The Writing''s on the Wall');

-- Song-Artist Relationships
INSERT INTO song_artists (song_id, artist_id) 
VALUES
  (1, 1),  -- "MMMBop" by Hanson
  (2, 2),  -- "Bohemian Rhapsody" by Queen
  (3, 3),  -- "One Sweet Day" by Mariah Carey
  (3, 4),  -- "One Sweet Day" by Boyz II Men
  (4, 5),  -- "Shallow" by Lady Gaga
  (4, 6),  -- "Shallow" by Bradley Cooper
  (5, 7),  -- "How You Remind Me" by Nickelback
  (6, 8),  -- "New York State of Mind" by Jay Z
  (6, 9),  -- "New York State of Mind" by Alicia Keys
  (7, 10), -- "Dark Horse" by Katy Perry
  (7, 11), -- "Dark Horse" by Juicy J
  (8, 12), -- "Moves Like Jagger" by Maroon 5
  (8, 13), -- "Moves Like Jagger" by Christina Aguilera
  (9, 14), -- "Complicated" by Avril Lavigne
  (10, 15);-- "Say My Name" by Destiny's Child

-- Song-Producer Relationships
INSERT INTO song_producers (song_id, producer_id) 
VALUES
  (1, 1),  -- "MMMBop" by Dust Brothers
  (1, 2),  -- "MMMBop" by Stephen Lironi
  (2, 3),  -- "Bohemian Rhapsody" by Roy Thomas Baker
  (3, 4),  -- "One Sweet Day" by Walter Afanasieff
  (4, 5),  -- "Shallow" by Benjamin Rice
  (5, 6),  -- "How You Remind Me" by Rick Parashar
  (6, 7),  -- "New York State of Mind" by Al Shux
  (7, 8),  -- "Dark Horse" by Max Martin
  (7, 9),  -- "Dark Horse" by Cirkut
  (8, 10), -- "Moves Like Jagger" by Shellback
  (8, 11), -- "Moves Like Jagger" by Benny Blanco
  (9, 12), -- "Complicated" by The Matrix
  (10, 13);-- "Say My Name" by Darkchild
