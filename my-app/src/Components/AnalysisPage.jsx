import React, { useState, useEffect } from "react";
import WordCloud from 'react-d3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import axios from 'axios';
import MoodAnalysis from "./MoodAnalysis";

const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

const AnalysisPage = () => {

    const [moodData, setMoodData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/getAllMoods');
            const data = await response.data;
            if (data.length === 0){
                console.log("error")
            }else{
                setMoodData(data);
            }
            
          } catch (error) {
          }
        };
    
        fetchData();
      }, []);


    return (
        <div>
            <MoodAnalysis originalData={moodData} />
        </div>
    )
}

export default AnalysisPage