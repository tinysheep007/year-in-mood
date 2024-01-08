import React from "react";
import { Link } from 'react-router-dom';
import "../Style/FrontPageStyle.scss";

const FrontPage = () => {
    return (
        <div className="front-page-container">
            <div className="front-content">
                <h2 className="front-h2" >
                    Come and log how you are doing this year with moods, journals, and more!
                </h2>

                <div className="front-div">
                This app enables users to track and analyze daily moods, offering insightful visualizations to identify emotional patterns and enhance self-awareness. Click "Get Started" to begin the journey of self-discovery.
                </div>
                <div style={{marginTop: "40px"}}>
                    <Link to="/instruction" ><button className="get-started-button">Get Started!</button></Link>
                    <Link to="/home" ><button className="home-button">Began filling out moods!</button></Link>
                </div>
                
            </div>
            <div className="image-container">
                <img src="https://in.ewu.edu/managementtoolbox/wp-content/uploads/sites/204/2018/11/Mood-chart.jpg" alt="Description of the image" />
            </div>
        </div>
    )
} 

export default FrontPage;
