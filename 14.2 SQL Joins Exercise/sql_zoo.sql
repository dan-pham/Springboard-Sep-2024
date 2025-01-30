-- Part Two: SQL Zoo

-- Tutorial 6: JOIN

-- 1.
SELECT matchid, player FROM goal 
    WHERE teamid = 'GER';

-- 2.
SELECT id, stadium, team1, team2 FROM game
    WHERE id = 1012;

-- 3.
SELECT player, teamid, stadium, mdate
    FROM game JOIN goal ON (id = matchid)
    WHERE teamid = 'GER';

-- 4.
SELECT team1, team2, player
    FROM game JOIN goal ON (id = matchid)
    WHERE player LIKE 'Mario%';

-- 5.
SELECT player, teamid, coach, gtime
    FROM goal JOIN eteam ON (teamid = id)
    WHERE gtime <= 10;

-- 6.
SELECT mdate, teamname
    FROM game JOIN eteam ON (team1 = eteam.id)
    WHERE coach = 'Fernando Santos';

-- 7.
SELECT player
    FROM goal JOIN game ON (id = matchid)
    WHERE stadium = 'National Stadium, Warsaw';

-- 8.
SELECT DISTINCT(player)
    FROM game JOIN goal ON matchid = id 
    WHERE (team1 = 'GER' OR team2 = 'GER') AND teamid != 'GER';

-- 9.
SELECT teamname, COUNT(*) AS goals
    FROM eteam JOIN goal ON id=teamid
    GROUP BY teamname;

-- 10.
SELECT stadium, COUNT(*) AS goals
    FROM game JOIN goal ON id=matchid
    GROUP BY stadium;

-- 11.
SELECT matchid, mdate, COUNT(*) AS goals
    FROM game JOIN goal ON matchid = id 
    WHERE (team1 = 'POL' OR team2 = 'POL')
    GROUP BY matchid;

-- 12.
SELECT matchid, mdate, COUNT(*) AS goals
    FROM game JOIN goal ON matchid = id 
    WHERE teamid = 'GER'
    GROUP BY matchid;

-- 13.
SELECT mdate, 
    team1, 
    SUM(CASE WHEN teamid = team1 THEN 1 ELSE 0 END) AS score1, 
    team2, 
    SUM(CASE WHEN teamid = team2 THEN 1 ELSE 0 END) AS score2
        FROM game LEFT JOIN goal ON matchid = id
        ROUP BY mdate, matchid, team1, team2
        ORDER BY mdate, matchid, team1, team2;

-- Tutorial 7: More JOIN operations

-- 1.
SELECT id, title
    FROM movie
    WHERE yr = 1962;

-- 2.
SELECT yr FROM movie
    WHERE title = 'Citizen Kane';

-- 3.
SELECT id, title, yr FROM movie
    WHERE title LIKE '%Star Trek%'
    ORDER BY yr;

-- 4.
SELECT id FROM actor
    WHERE name = 'Glenn Close';

-- 5.
SELECT id FROM movie
    WHERE title = 'Casablanca';

-- 6.
SELECT name FROM actor
    JOIN casting ON (id = actorid)
    WHERE movieid = 11768;

-- 7.
SELECT name FROM actor
    JOIN casting ON (id = actorid)
    JOIN movie on movie.id = movieid
    WHERE title = 'Alien';

-- 8.
SELECT title FROM movie
    JOIN casting ON (id = movieid)
    JOIN actor on actorid = actor.id
    WHERE name = 'Harrison Ford';

-- 9.
SELECT title FROM movie
    JOIN casting ON (id = movieid)
    JOIN actor on actorid = actor.id
    WHERE name = 'Harrison Ford' 
    AND ord != 1;

-- 10.
SELECT title, name FROM casting
    JOIN movie ON movieid = id
    JOIN actor ON actorid = actor.id
    WHERE yr = '1962'
    AND ord = 1;

-- 11.
SELECT yr, COUNT(title) FROM movie 
    JOIN casting ON movie.id = movieid
    JOIN actor   ON actorid = actor.id
    WHERE name = 'Rock Hudson'
    GROUP BY yr
    HAVING COUNT(title) > 2;

-- 12.
SELECT title, name FROM casting
    JOIN movie ON (movieid = id)
    JOIN actor ON (actorid = actor.id)
    WHERE movieid IN (
        SELECT movieid FROM casting
        WHERE actorid IN (
            SELECT id FROM actor
            WHERE name = 'Julie Andrews'))
    AND ord = 1;

-- 13.
SELECT name FROM actor
    JOIN casting ON (actorid = id)
    WHERE ord = 1
    GROUP BY name
    HAVING COUNT(movieid) >= 15;

-- 14.
SELECT title, COUNT(actorid) FROM movie
    JOIN casting ON (id = movieid)
    WHERE yr = '1978'
    GROUP BY title
    ORDER BY COUNT(actorid) DESC, title;

-- 15.
SELECT name FROM actor
    JOIN casting ON id = actorid
    WHERE movieid IN (
        SELECT movieid FROM casting 
        WHERE actorid = (
            SELECT id FROM actor WHERE name = 'Art Garfunkel'))
    AND name != 'Art Garfunkel';