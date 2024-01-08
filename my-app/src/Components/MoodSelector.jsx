import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import "../Style/MoodSelectorStyle.scss";
import colorToMood from '../utils/colorToMood';

const MoodSelector =  ({ onMoodChange }) => {
    const [mood, setMood] = useState("green")

    const handleMoodChange = (selectedMood) => {
        
        setMood(selectedMood);
        onMoodChange(selectedMood); // Notify the parent component about the mood change
    };

    

    return (
        <div className='mood-selector-button-container'>
            
            
            <div className="mood-description" >
                <h2 style={{fontSize: "28px"}}>Choose a mood HERE! </h2>
                <div style={{fontSize: "24px"}}>
                    The current mood is <div className='currMood' style={{ color: mood, fontWeight: 'bold', textTransform: 'uppercase'}}>{colorToMood(mood)}</div>
                </div>
            </div>
            
            
            
            
            <div className='buttons-row'>
                <button className="mood-button happy" value="green" onClick={(e) => handleMoodChange(e.target.value)}>happy</button>
                <button className="mood-button sad" value="blue" onClick={(e) => handleMoodChange(e.target.value)}>sad</button>
                <button className="mood-button angry" value="red" onClick={(e) => handleMoodChange(e.target.value)}>angry</button>
                <button className="mood-button tired" value="gray" onClick={(e) => handleMoodChange(e.target.value)}>tired</button>
                <button className="mood-button calm" value="orange" onClick={(e) => handleMoodChange(e.target.value)}>calm</button>

            </div>
            
        </div>
    )
}

export default MoodSelector