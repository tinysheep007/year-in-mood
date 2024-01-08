import React, { useState, useEffect } from "react";
import WordCloud from 'react-d3-cloud';
import "../Style/CreateWordCloudStyle.scss"

const CreateWordCloud = ({ data }) => {

    const happyDays = data.filter(entry => entry.mood === 'happy');
    const sadDays = data.filter(entry => entry.mood === 'sad');
    const angryDays = data.filter(entry => entry.mood === 'angry');
    const tiredDays = data.filter(entry => entry.mood === 'tired');
    const calmDays = data.filter(entry => entry.mood === 'calm');
    
    //console.log(happyDays, sadDays, angryDays, tiredDays, calmDays)

    const trim = (base) => {
        // Use a regular expression to match the pattern
        const regex = / - Last updated by/i;
        const match = base.match(regex);

        // If the pattern is found, get the portion of the string before the match
        if (match) {
            return base.slice(0, match.index).trim();
        }

        // If the pattern is not found, return the original string
        return base.trim();
    }

    // Function to count word frequency
    const countWordFrequency = (d) => {
        const wordFrequency = {};
        
         // Loop through each data entry
            d.forEach(entry => {
                
                    // Extract comments from the entry
                    let comments = entry.comments.toLowerCase(); // Convert to lowercase for case-insensitive counting
                    
                    // Remove everything including and after "- Last updated by"
                    comments = trim(comments)

                    // Split comments into words
                    const words = comments.split(/\s+/);
                    
                    // Count frequency of each word
                    words.forEach(word => {
                        if (word in wordFrequency) {
                            wordFrequency[word]++;
                        } else {
                            wordFrequency[word] = 1;
                        }
                    });
                
            });
  
        // Convert word frequency data to the desired format
        const formattedData = Object.entries(wordFrequency).map(([text, value]) => ({ text, value: value * 1500 }));
  
        // Display the formatted word frequency
        return formattedData;
    };

    console.log(countWordFrequency(happyDays))

    return (
        <div className="word-cloud-container">
            <div className="happy-dict word-cloud-section">
                <h3>Happy Mood Word Cloud</h3>
                <div style={{width: "500px", border: "3px black solid"}} className="word-cloud">
                <WordCloud  data={countWordFrequency(happyDays)} />
                </div>
            </div>

            <div className="sad-dict word-cloud-section">
                <h3>Sad Mood Word Cloud</h3>
                <div style={{width: "500px", border: "3px black solid"}} className="word-cloud">
                <WordCloud  data={countWordFrequency(sadDays)} />
                </div>
            </div>

            <div className="angry-dict word-cloud-section">
                <h3>Angry Mood Word Cloud</h3>
                <div style={{width: "500px", border: "3px black solid"}} className="word-cloud">
                <WordCloud  data={countWordFrequency(angryDays)} />
                </div>
            </div>

            <div className="tired-dict word-cloud-section">
                <h3>Tired Mood Word Cloud</h3>
                <div style={{width: "500px", border: "3px black solid"}} className="word-cloud">
                <WordCloud  data={countWordFrequency(tiredDays)} />
                </div>
            </div>

            <div className="calm-dict word-cloud-section">
                <h3>Calm Mood Word Cloud</h3>
                <div style={{width: "500px", border: "3px black solid"}} className="word-cloud">
                <WordCloud  data={countWordFrequency(calmDays)} />
                </div>
            </div>

            <div className="overall-dict word-cloud-section">
                <h3>Overall Mood Word Cloud</h3>
                <div style={{width: "500px", border: "3px black solid"}} className="word-cloud">
                <WordCloud  data={countWordFrequency(data)} />
                </div>
            </div>
            
        </div>
        
    )
}

export default CreateWordCloud