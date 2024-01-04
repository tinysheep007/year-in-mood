import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MoodSelector =  ({ onMoodChange }) => {
    const [mood, setMood] = useState("green")

    const handleMoodChange = (selectedMood) => {
        setMood(selectedMood);
        onMoodChange(selectedMood); // Notify the parent component about the mood change
    };

    return (
        <div>
            the current mood is {mood}
            
            <div>
                <button value="green" onClick={(e) => handleMoodChange(e.target.value)}>Happy</button>
                <button value="blue" onClick={(e) => handleMoodChange(e.target.value)}>sad</button>
                <button value="red" onClick={(e) => handleMoodChange(e.target.value)}>mad</button>
            </div>
            
        </div>
    )
}

export default MoodSelector