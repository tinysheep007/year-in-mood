import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import axios from 'axios';
import Modal from 'react-modal';
import MoodSelector from './Components/MoodSelector.jsx';
import SingularDate from './Components/SingularDate.jsx';
import './Style/HomeStyle.scss'; 
import moodData from './moodData.js';
import MoodAnalysis from './Components/MoodAnalysis.jsx';
import PowerfulButtons from './Components/PowerfulButtons.jsx';
import RouterTest from './Components/AnalysisPage.jsx';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

function Home() {
  const [currMood, setCurrMood] = useState('green');
  const [dateColors, setDateColors] = useState({});

  // from mysql data
  // mood, date, comments
  const [moodSQLData, setMoodSQLData] = useState([]);

  const [fetchError, setFetchError] = useState(false);
  // useEffect to fetch data from the Express API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getAllMoods');
        const data = await response.data;
        if (data.length === 0){
          setFetchError(true);
          setMoodSQLData(moodData)

        }else{
          setMoodSQLData(data);// Updated state variable name
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setFetchError(true);
        // Handle error if not fetched properly, use the default data
        // but it could take sometime to load in
        setMoodSQLData(moodData);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    //console.log('Updated moodSQLData:', moodSQLData); // Updated state variable name
  }, [moodSQLData]); // This useEffect runs whenever moodSQLData is updated

  const handleMoodChange = (selectedMood) => {
    setCurrMood(selectedMood);
    // console.log(mood)
  };
  
  const organizeMoodDataByMonth = (moodData) => {
    const organizedData = {};
    moodData.forEach((entry) => {
      const month = entry.date.slice(0, 7); // Extracts the YYYY-MM part
      if (!organizedData[month]) {
        organizedData[month] = [];
      }
      organizedData[month].push(entry);
    });

    return organizedData;
  };

  const organizedMoodData = organizeMoodDataByMonth(moodSQLData);

  const handleColorSelection = (date, color, comments) => {
    setDateColors((prevColors) => {
      const newColors = {
        ...prevColors,
        [date]: {
          color: color,
          comments: comments,
        },
      };

      // Iterate over entries of the updated state
      Object.entries(newColors).forEach(([date, data]) => {
        console.log(`Date: ${date}, Color: ${data.color}, Comments: ${data.comments}`);
      });
      
      return newColors;
    });
  };
  
  const handleSaveToSQL = async () => {
    try {
      // Convert dateColors into an array of objects
      const dataToSave = Object.entries(dateColors).flatMap(([date, colors]) => {
        if (Array.isArray(colors)) {
          // If colors is an array, map over it
          return colors.map(({ color, comments }) => ({ date, color, comments }));
        } else {
          // If colors is not an array, create an array with a single object
          return [{ date, color: colors.color, comments: colors.comments }];
        }
      });
  
      // Make a POST request to your Express endpoint
      await axios.post('http://localhost:8000/api/saveMoods', dataToSave);
  
      // Optionally, update your state or perform other actions after successful save
      console.log('Data saved to SQL successfully');

      // Auto-refresh the page after the Axios call is done
      window.location.reload();
      
    } catch (error) {
      console.error('Error saving data to SQL:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className='two-column-container'>
          <div className="left-column" style={{ display: 'flex',  alignItems: 'center', marginTop: '40px',  }}>
            <PowerfulButtons />
            <MoodSelector onMoodChange={handleMoodChange}/>
            <div className="sqlUpdateButton" style={{boxShadow: "12px 7px 5px 2px rgba(128, 128, 128, 0.5)"}}>
              <div style={{ fontSize: "26px", fontWeight: "bold" }}>Update your database here!</div>
              <button onClick={handleSaveToSQL}>UPDATE IN SQL</button>
            </div>
          </div>
          
          <div className='right-column'>
            

            {fetchError ? <p style={{marginTop:"70px", color: "black", marginLeft:"30px"}}>Using default data NOTE: CHANGES WON'T BE SAVED. To experience the full application, you must
              connect to a database so that backend could update dynamically.
            </p>: <p style={{marginTop:"100px", color: "black"}}>Using SQL data</p>}

            <div>
            {Object.entries(organizedMoodData).map(([month, data]) => (
              <div key={month} className="month-section" style={{color: "black"}}>
                <h2>{month}</h2>
                <div className="mood-selector-container">
                  {data.map(({ mood, date, comments }) => (
                    <SingularDate 
                      key={date} 
                      value={date} 
                      color={currMood} 
                      defaultMood={mood}
                      date={date} 
                      SQLComments={comments}
                      updateDateColor={handleColorSelection}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

        
              
        
      </header>
    </div>
  );
}

export default Home;
