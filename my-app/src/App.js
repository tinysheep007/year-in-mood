import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MoodSelector from './Components/MoodSelector';
import SingularDate from './Components/SingularDate';
import './Style/AppStyle.scss'; 
import moodData from './moodData.js';
import MoodAnalysis from './Components/MoodAnalysis.jsx';


function App() {
  const [mood, setMood] = useState('green');
  const [dateColors, setDateColors] = useState({});

  const handleMoodChange = (selectedMood) => {
    setMood(selectedMood);
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

  const organizedMoodData = organizeMoodDataByMonth(moodData);

  const handleColorSelection = (date, color) => {
    setDateColors((prevColors) => {
      const newColors = {
        ...prevColors,
        [date]: color,
      };
      // console.log(newColors); // Log the updated state
      return newColors;
    });
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <MoodAnalysis moodData = {dateColors}/>
        <MoodSelector onMoodChange={handleMoodChange}/>
        <div>
        {Object.entries(organizedMoodData).map(([month, data]) => (
          <div key={month} className="month-section">
            <h2>{month}</h2>
            <div className="mood-selector-container">
              {data.map(({ date }) => (
                <SingularDate key={date} value={date} color={mood} date={date} updateDateColor={handleColorSelection}/>
              ))}
            </div>
          </div>
        ))}
      </div>

        <p>
          Edt <code>src/App.js</code> and save to reload.
        </p>
        
        
      </header>
    </div>
  );
}

export default App;
