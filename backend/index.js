const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()
app.use(cors());
// Express middleware to parse JSON
app.use(express.json());

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


// Function to format date
function formatDate(date) {
    const dateValue = new Date(date);
    return `${dateValue.getFullYear()}-${(dateValue.getMonth() + 1).toString().padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}`;
}

//get all the moods
app.get('/api/getAllMoods', (req, res) => {
    const query = 'SELECT * FROM moods';

    // Execute the query
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Sort the results based on the date column
        results.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            return dateA - dateB;
        });

        // The rest of your code
        const extractedData = results.map(item => ({
            id: item.idmoods,
            mood: item.singleMood,
            date: item.date ? formatDate(item.date) : null,
            comments: item.comments === null ? '' : item.comments
        }));

        // console.log(extractedData);
        res.json(extractedData);
    });
});

function convertToMySQLDatetime(dateString) {
    const dateObject = new Date(dateString);
  
    // Ensure the dateObject is valid
    if (isNaN(dateObject.getTime())) {
        console.error('Invalid date:', dateString);
        return null;
    }

    // Clone the dateObject to avoid modifying the original
    const nextDay = new Date(dateObject);
    nextDay.setDate(nextDay.getDate() + 1);

    const year = nextDay.getFullYear();
    const month = (nextDay.getMonth() + 1).toString().padStart(2, '0');
    const day = nextDay.getDate().toString().padStart(2, '0');

    const mysqlDatetime = `${year}-${month}-${day} 00:00:00`;
    return mysqlDatetime;
}



const colorToMood = (color) =>{
    if (color === "green") return 'happy';
    if (color === "blue") return 'sad';
    if (color === "red") return 'angry';
    else return "none"
}
// Express route to save moods to MySQL
app.post('/api/saveMoods', async (req, res) => {
    const moodsData = req.body; // Assuming the array of objects is in the request body
  
    // Use your logic to iterate over the array and save/update each mood to MySQL
    for (const { date, color, comments } of moodsData) {
      // Convert date to MySQL DATETIME format
      const mysqlDatetime = convertToMySQLDatetime(date);
  
      // Check if the conversion was successful
      if (mysqlDatetime) {
        try {
          // Update the mood in MySQL based on the date
          const query = "UPDATE `moods` SET `singleMood` = ?, comments = ? WHERE `date` = ?";
          const values = [colorToMood(color), comments, mysqlDatetime];
          console.log(mysqlDatetime)
            // console.log(values)

          // Execute the query using async/await
          await new Promise((resolve, reject) => {
            db.query(query, values, (err, result) => {
              if (err) {
                console.error('Error executing query:', err);
                reject(err);
                return;
              }
  
              console.log('Row updated successfully');
              resolve(result);
            });
          });
        } catch (error) {
          console.error('Error updating row:', error);
          res.status(500).send('Internal Server Error');
          return;
        }
      } else {
        console.error('Invalid date:', date);
      }
    }
  
    // The loop has completed, all moods are saved or updated successfully
    console.log('All moods saved or updated successfully');
    res.status(200).send('All moods saved or updated successfully');
  });
  
//change all rows
app.get('/api/changeAllMoods',(req,res)=>{

    const moodType = req.query.moodType;
    console.log('Received moodType:', moodType);
    let query = `UPDATE moods SET singleMood = "${moodType}" WHERE date >= '2022-01-01';`;

    db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
        });
})


//listening
app.listen(8000,(req, res)=>{
    console.log("lisenting")
})

