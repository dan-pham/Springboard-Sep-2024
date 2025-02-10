-- Drop existing databases
DROP DATABASE IF EXISTS soccer_league_db;

-- Create the database
CREATE DATABASE soccer_league_db;

\c soccer_league_db

-- Teams Table
CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT,
  stadium TEXT
);

-- Players Table
CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  team_id INT NOT NULL,
  position TEXT,
  FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- Referees Table
CREATE TABLE referees (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- Matches Table
CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  home_team_id INT NOT NULL,
  away_team_id INT NOT NULL,
  match_date DATE NOT NULL,
  season_id INT NOT NULL,
  FOREIGN KEY (home_team_id) REFERENCES teams(id),
  FOREIGN KEY (away_team_id) REFERENCES teams(id)
);

-- Goals Table
CREATE TABLE goals (
  id SERIAL PRIMARY KEY,
  match_id INT NOT NULL,
  player_id INT NOT NULL,
  goals_scored INT NOT NULL,
  FOREIGN KEY (match_id) REFERENCES matches(id),
  FOREIGN KEY (player_id) REFERENCES players(id)
);

-- Referee Match Assignments Table
CREATE TABLE referee_match_assignments (
  match_id INT NOT NULL,
  referee_id INT NOT NULL,
  PRIMARY KEY (match_id, referee_id),
  FOREIGN KEY (match_id) REFERENCES matches(id),
  FOREIGN KEY (referee_id) REFERENCES referees(id)
);

-- Seasons Table
CREATE TABLE seasons (
  id SERIAL PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);

-- Rankings View
CREATE VIEW rankings AS
SELECT t.id AS team_id,
       t.name AS team_name,
       SUM(g.id) AS goals_scored,
       COUNT(m.id) AS matches_played
FROM teams t
JOIN players p ON p.team_id = t.id
JOIN goals g ON g.player_id = p.id
JOIN matches m ON (m.home_team_id = t.id OR m.away_team_id = t.id)
GROUP BY t.id;




-- Insert some teams into the system
INSERT INTO teams (name, city, stadium)
VALUES 
  ('Team A', 'City A', 'Stadium A'),
  ('Team B', 'City B', 'Stadium B');

-- Insert some players
INSERT INTO players (name, team_id, position)
VALUES 
  ('Player 1', 1, 'Forward'),
  ('Player 2', 1, 'Defender'),
  ('Player 3', 2, 'Midfielder');

-- Insert some referees
INSERT INTO referees (name)
VALUES 
  ('Referee 1'),
  ('Referee 2');

-- Insert a season
INSERT INTO seasons (start_date, end_date)
VALUES ('2025-01-01', '2025-12-31');

-- Insert a match
INSERT INTO matches (home_team_id, away_team_id, match_date, season_id)
VALUES 
  (1, 2, '2025-05-01', 1);

-- Insert some goals
INSERT INTO goals (match_id, player_id, goals_scored)
VALUES 
  (1, 1, 2), -- Player 1 scores 2 goals
  (1, 3, 1); -- Player 3 scores 1 goal

-- Assign referees to a match
INSERT INTO referee_match_assignments (match_id, referee_id)
VALUES 
  (1, 1), 
  (1, 2);




-- Get all referees assigned to match 1 
SELECT * FROM referee_match_assignments WHERE match_id = 1;

-- Get all rankings
SELECT * FROM rankings;

-- Get the number of goals scored by each player
SELECT player_id, SUM(goals_scored) AS total_goals
FROM goals
GROUP BY player_id;