import React from "react";
import { Link } from 'react-router-dom';
import "../Style/InstructionsStyle.scss";

const Instructions = () => {
    return (
        <div className="front-page-container fade-in">
            <div className="front-content" style={{marginTop: "150px"}}>
                <h2 className="front-h2" >
                    Instructions on navigating the web app!
                </h2>
                <div className="front-div">
                    <div className="section">
                        <div className="section-header">Introduction</div>
                        <p>
                        In this web application, you can record various emotions on specific dates throughout the year. The purpose of this app is to analyze the stability of your mood and how well you understand your inner self. Not only can you visualize the duration of consecutive feelings, but you can also note down memorable experiences in the journal section beneath each date. By analyzing the patterns of your emotions and identifying repetitive themes in the journal, you will gain deeper insights into yourself. Welcome to a journey of self-discovery!
                        </p>
                    </div>

                    <div className="section">
                        <div className="section-header"> Before We Start </div>
                        <p>
                        We strongly encourage you to set up the MySQL database and secure the connection. You can only experience the full functionality by correctly deploying the data portion. For instructions on how to set up the database, visit https://github.com/tinysheep007/year-in-mood.
                        In the home page, if you are not properly connected to a database, there would be
                        a message on the top of the dates. If the database it's connected proerply, then message should be saying using SQL data.
                         Also without MySQL connected, not all the functionality
                        are properly functioning. For exmaple, ALL MOOD CHANGE BUTTONS would not function. You can still
                        color in the dates with moods and save it by clicking the UPDATE IN SQL button to save the data 
                        locally, but the DATA ANALYSIS section would only be using the default data.
                        </p>
                    </div>

                    <div className="section">
                        <div className="section-header"> Navbar </div>
                        <p>
                        The main interactive sections are the 'Home' and 'Data Analysis' tabs. To learn how to use this site, you can visit the 'Instructions' tab. You can return to the front page by clicking on the prominent 'Year In Mood' button. The Home page is dedicated to the main activities of recording moods and writing journals, while the Data Analysis page is designed for visualizing your data.
                        </p>
                    </div>

                    <div className="section">
                        <div className="section-header"> Home </div>
                        <p>
                        The Home page allows you to select a feeling and assign it to a specific date. In case you labeled your feelings incorrectly the first time, don't worry! You can click the reset button to clear the feelings. Additionally, you can click on the journal button underneath the dates. After editing the text field, you can choose to click 'Save' to update the journal, or you can close the tab to discard the changes. The most important step is to CLICK ON the 'UPDATE IN SQL' button after making any changes to the data. This ensures that all the data is securely saved through the MySQL database.
                        </p>
                    </div>

                    <div className="section">
                        <div className="section-header"> Data Analysis </div>
                        <p>
                        The Data Analysis tab can help you visualize your feelings throughout the year. Not only can you see the total count of different types of feelings, but we also break it down by weeks and months so that you can observe the intervals during which you are the most active.
                        </p>
                    </div>
                    

                    
                </div>

                <div style={{marginTop: "40px"}}>
                    <Link to="/home" ><button className="home-button">Let's filling out moods!</button></Link>
                </div>
                
            </div>
            <div className="image-container-ins">
                <img src="https://hips.hearstapps.com/hmg-prod/images/happy-smiley-face-balloons-against-colorful-cotton-royalty-free-image-1677446093.jpg?crop=0.668xw:1.00xh;0,0&resize=1200:*" alt="Description of the image" />
            </div>
        </div>
    )
} 

export default Instructions