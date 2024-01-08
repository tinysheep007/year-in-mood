# Year In Mood Project
1. [About](#about)
2. [running the project](#running-the-project)
3. [setup mysql](#mysql-table)

## About
Year In Mood is a full-stack web application designed for mood tracking and self-discovery. Users can record emotions on specific dates, visualize mood patterns, and document memorable experiences in a journal. The app supports functionalities such as resetting feelings, editing journals, and securely saving data through the MySQL database. The Data Analysis tab provides insightful visualizations of feelings throughout the year, breaking down counts by type, weeks, and months. This project leverages React.js for the front end, Node.js and Express for the backend, and MySQL for database management, offering a comprehensive and interactive experience for users seeking to understand their emotional well-being.

More detailed instruction is in the INTRSUCTIONS tab inside the web app. Note: Click the UPDATE IN SQL button to re-render the page so that all data is saved locally or to acutal database.

## Running the project
First, we need to configure a proper MYSQL database using the guide below.
Then we need to run both the backend and the front end.
Note: Without database or backend setup, you can still view the web app. However, not all functionality are working.
we can access ```./backend``` and type in ```npm install```
Then, we can run the backend side by ```npm start```

On your terminal or powershell or bash, if you see the console.log is printing out "mysql connected"
Then you set up the database sucesssfully.

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

You can check if data is populated properly by 
```
SELECT * FROM moods;
```
