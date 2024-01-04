const express = require("express")
const mysql = require("mysql2")

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"mood"
})

db.connect((err)=>{
    if(err) throw err;
    console.log("mysql connected")
})

app.get('/world', (req, res) => {
    const query = 'SELECT * FROM moods LIMIT 25';
  
    // Execute the query
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
    
        // Print the results to the console
        //   console.log('First 5 rows from the "moods" table:', results);
      
        const dateArray = results.map(item => new Date(item.date));

        // console.log(dateArray);
        
        // Extract year, month, and date components for each date
        const extractedDates = dateArray.map(date => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Pad single-digit months with leading zero
            const day = date.getDate().toString().padStart(2, '0'); // Pad single-digit days with leading zero
          
            return `${year}-${month}-${day}`;
        });

        // Extract "singleMood" and "date" properties from each object
        const extractedData = results.map(item => ({
            id: item.idmoods,
            mood: item.singleMood,
            date: extractedDates[item.idmoods - 1], // Assuming idmoods is the index in extractedDates + 1
            comments: item.comments === null ? '' : item.comments
        }));

        console.log(extractedData)
        // Send the results as  JSON response
        res.json(extractedData);
    });
  });

app.listen(8000,(req, res)=>{
    console.log("lisenting")
})

