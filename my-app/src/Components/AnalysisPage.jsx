import React, { useState, useEffect } from "react";
import WordCloud from 'react-d3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import axios from 'axios';
import MoodAnalysis from "./MoodAnalysis";
import localData from "../moodData.js";
import "../Style/AnalysisPageStyle.scss";
import loadingGif from "../utils/loadingGif.gif";

const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

const AnalysisPage = () => {

    const [moodData, setMoodData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/getAllMoods');
            const data = await response.data;
            if (data.length === 0){
                console.log("error")
                // get default local data 
                setMoodData(localData)
            }else{
                setMoodData(data);
            }
            setLoading(false)
            
          } catch (error) {
            setMoodData(localData)
            setLoading(false)
          }
        };
    
        fetchData();
      }, []);


    return (
        <div className="out" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {loading ? (
              <div className="loading-container">
                
                <img src={loadingGif} alt="Loading" style={{ marginTop:"300px",width: '250px', height: '250px' }} />

                <p style={{color:"black", fontSize: "45px", marginBottom:"500px"}}>Loading...</p>
              </div>
            ) : <MoodAnalysis originalData={moodData} />}
            
            
        </div>
    )
}

export default AnalysisPage