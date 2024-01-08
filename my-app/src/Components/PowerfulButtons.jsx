import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Style/PowerfulButtonsStyle.scss"

const PowerfulButtons = () => {

    const handleClick = async ( val ) => {
        try {
            console.log("selected mood is "+val)
            await axios.get(`http://localhost:8000/api/changeAllMoods?moodType=${val}`)

        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div className='powerful-buttons-container'>
            <h2>All Mood Change Buttons</h2>
            <div className='buttons-row '>
                <button value="none"  className="powerb all-none" onClick={(e)=>handleClick("none")}><div>ALL NONE</div></button>
                <button value="happy" className="powerb all-happy" onClick={(e)=>handleClick("happy")}><div>ALL HAPPY</div></button>
                <button value="sad" className="powerb all-sad" onClick={(e)=>handleClick("sad")}><div>ALL SAD</div></button>
                <button value="angry" className="powerb all-angry" onClick={(e)=>handleClick("angry")}><div>ALL ANGRY</div></button>
            </div>
            
        </div>
    )
}

export default PowerfulButtons