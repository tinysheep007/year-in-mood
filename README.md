# Year In Mood Project ℹ️
1. [About](#about-)
2. [Running the project](#running-the-project-)
3. [Setup MySql](#mysql-table-)
4. [Future improvements](#future-plan-%EF%B8%8F)

## Accessible Web App without database connected 📊
https://tinysheep007.github.io/year-in-mood/

Note: The initial page is blank, we have to click on the top title "Year In Mood" to navigate to front page.
The app is build on a big monitor which means there is no responsive styling yet! The style would be
twisted if the viewing device screen is too small. Also, at home tab and data analysis  tab, please wait 
about 3 seconds until it renders properly.

## Showcase 📺
<img src="https://github.com/tinysheep007/year-in-mood/assets/58338071/e3c4dfbe-75bf-4ebc-9e7e-32f3dac925af" alt="Image 1" width="600">
<img src="https://github.com/tinysheep007/year-in-mood/assets/58338071/ad55dd9d-451a-42e9-80c4-2510ecb15439" alt="Image 2" width="600">
<img src="https://github.com/tinysheep007/year-in-mood/assets/58338071/24b74fc0-dfb9-459b-a1a3-d0b50ef864b3" alt="Image 3" width="600">
<img src="https://github.com/tinysheep007/year-in-mood/assets/58338071/e86aad25-a9b7-45c2-aed0-22aa0950ceb5" alt="Image 4" width="600">
<img src="https://github.com/tinysheep007/year-in-mood/assets/58338071/e4c55047-5510-4048-abfb-1185e3c60e3c" alt="Image 5" width="600">


## About 📒
Year In Mood is a full-stack web application designed for mood tracking and self-discovery. Users can record emotions on specific dates, visualize mood patterns, and document memorable experiences in a journal. The app supports functionalities such as resetting feelings, editing journals, and securely saving data through the MySQL database. The Data Analysis tab provides insightful visualizations of feelings throughout the year, breaking down counts by type, weeks, and months. This project leverages React.js for the front end, Node.js and Express for the backend, and MySQL for database management, offering a comprehensive and interactive experience for users seeking to understand their emotional well-being.

More detailed instruction is in the INTRSUCTIONS tab inside the web app. Note: Click the UPDATE IN SQL button to re-render the page so that all data is saved locally or to acutal database. 
Some page takes about 3 seconds to render, please be patient. 

## Running the project 🏃
First, we need to configure a proper MYSQL database using the guide below.
Then we need to run both the backend and the front end.
Note: Without database or backend setup, you can still view the web app. However, not all functionality are working.

## Start: Running the backend 
we can access ```./backend``` and type in ```npm install``` in the terminal or powershell or bash or ...
Then, we can run the backend side by ```npm start```

On your terminal or powershell or bash, if you see the console.log is printing out "mysql connected"
Then you set up the database sucesssfully.

## Start: Running the frontend
we can access ```./my-app``` and type in ```npm install``` in the terminal or powershell or bash or ...
Then, we can run the frontend side by ```npm start```

Once you set up the MYSQL, refresh the web app, you can start enjoying the app.

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

### MySQL table 💻
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

## Future plan ☢️
1. add user authentication so that each user can have separate moods, but it might require us to edit our mysql database.
2. make DATA ANALYSIS page able to analysis the recent saved local data as well.
3. Styling the DATA ANALYSIS page.
4. add more data analysis functions. Ex: comments sentiments analysis.
