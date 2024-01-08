# Year In Mood Project

## Set up MySQL database (With SQL commands in mySQL workbench)
configuration of the mySQL connection is located at the ```./backend/index.js```
Change your settings here for connection.
```
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"mood"
})
```
If you do not create a database yet, use the following command in workbench
```
CREATE DATABASE mood;
```

### MySQL table
There is only 1 table used which makes it simple to set up.
I used the name "moods" for the table.
There are 3 columns: 
1. date
  - datatype: DATETIME
  - primary key
  - non empty 
2. singleMood
  - datatype: varchar(255)
  - non empty
3. comments
  - datatype: varchar(10000)
  - default expression: null

MySQL commands for creating the table
```
CREATE TABLE moods (
  date DATETIME PRIMARY KEY NOT NULL,
  singleMood VARCHAR(255) NOT NULL,
  comments VARCHAR(10000) DEFAULT NULL
);
```

### Populate the database
run the following commands in mySQL workbench and it will fill your database with default data.
```
-- Generate a series of dates for the year 2023
SET @start_date = '2023-01-01';
SET @end_date = '2023-12-31';

-- Create a temporary table with all dates for the year 2023
CREATE TEMPORARY TABLE temp_dates AS
SELECT @start_date + INTERVAL a.a + b.a * 10 + c.a * 100 DAY AS date
FROM (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS a
CROSS JOIN (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS b
CROSS JOIN (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS c
WHERE @start_date + INTERVAL a.a + b.a * 10 + c.a * 100 DAY BETWEEN @start_date AND @end_date;

-- Insert data into the moods table with singleMood = "none" and comments = ""
INSERT INTO moods (date, singleMood, comments)
SELECT date, 'none', '' FROM temp_dates;

-- Drop the temporary table
DROP TEMPORARY TABLE IF EXISTS temp_dates;
```
