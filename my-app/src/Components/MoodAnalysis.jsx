import React, { useEffect, useState } from 'react';
import "../Style/MoodAnalysisStyle.scss"

const MoodAnalysis = ({ moodData }) => {
  const [analysisResults, setAnalysisResults] = useState({});

  useEffect(() => {
    const analyzeMoodData = () => {
      if (!moodData || Object.keys(moodData).length === 0) {
        // Handle the case where moodData is null or empty
        setAnalysisResults({ green: 0, blue: 0, red: 0 });
        return;
      }

      const colorCounts = { green: 0, blue: 0, red: 0 };

      Object.values(moodData).forEach((color) => {
        colorCounts[color] = (colorCounts[color] || 0) + 1;
      });

      const totalDays = 365

      const colorPercentages = {
        green: ((colorCounts.green / totalDays) * 100).toFixed(3),
        blue: ((colorCounts.blue / totalDays) * 100).toFixed(3),
        red: ((colorCounts.red / totalDays) * 100).toFixed(3),
      };

      setAnalysisResults(colorPercentages);
    };

    analyzeMoodData();
  }, [moodData]);

  return (
    <div>
      <h2>Mood Analysis</h2>
      <p>Percentage of Green Days: {analysisResults.green}%</p>
      <p>Percentage of Blue Days: {analysisResults.blue}%</p>
      <p>Percentage of Red Days: {analysisResults.red}%</p>
    </div>
  );
};

export default MoodAnalysis;
