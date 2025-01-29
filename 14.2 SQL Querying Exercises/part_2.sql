-- Part 2: More SQL (Including aggregates)

-- SQL Basics: Simple WHERE and ORDER BY
SELECT * FROM people 
    WHERE age > 50
    ORDER BY age DESC;

-- SQL Basics: Simple SUM
SELECT SUM(age) AS age_sum from people;

-- SQL Basics: Simple MIN / MAX
SELECT MIN(age) AS age_min, MAX(age) AS age_max FROM people;

-- Find all active students
SELECT * FROM students WHERE IsActive = 1;

-- SQL Basics: Simple GROUP BY
SELECT age, COUNT(*) AS people_count FROM people GROUP BY age;

-- SQL Basics: Simple HAVING
SELECT age, COUNT(*) AS total_people FROM people 
    GROUP BY age
    HAVING COUNT(*) >= 10;

-- SQL Zoo: Tutorial 5 SUM_and_COUNT

-- 1.
SELECT SUM(population) FROM world;

-- 2.
SELECT DISTINCT(continent) FROM world;

-- 3.
SELECT SUM(gdp) AS total_gdp FROM world
    WHERE continent = 'Africa';

-- 4.
SELECT COUNT(*) AS countries FROM world
    WHERE area >= 1000000;

-- 5.
SELECT SUM(population) AS total_population FROM world
    WHERE name IN ('Estonia', 'Latvia', 'Lithuania');

-- 6.
SELECT continent, COUNT(*) AS num_countries FROM world
    GROUP BY continent;

-- 7.
SELECT continent, COUNT(*) AS num_countries FROM world
    WHERE population > 10000000
    GROUP BY continent;

-- 8.
SELECT continent FROM world
    GROUP BY continent
    HAVING SUM(population) > 100000000;