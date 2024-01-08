# Year In Mood Project

## Set up MySQL database
configuration 

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
