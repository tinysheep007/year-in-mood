import React, { useEffect, useState } from 'react';
import "../Style/MoodAnalysisStyle.scss"
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid  } from 'recharts';
import { BarChart, Bar, Cell, Label, LineChart, Line } from 'recharts';
import CreateWordCloud from './CreateWordCloud';

const MoodAnalysis = ({  originalData }) => {
  
  //count how many specific mood is in the dataset
  const countMoodInt = (mood) =>{
    const amt = originalData.filter((entry) => entry.mood === mood).length;
    return parseInt(amt)
  }

  // Calculate the percentage of dates with a specific mood
  const calculateMoodPercentage = (mood) => {
    const totalDates = originalData.length;
    const moodDates = countMoodInt(mood)
    return parseFloat(totalDates > 0 ? ((moodDates / totalDates) * 100).toFixed(2) : 0);
  };


  const calculateMoodsPerDayOfWeek = (originalData) => {
    // Initialize an object to store the count of each mood for each day of the week
    const moodCounts = {
      Sunday: { happy: 0, sad: 0, angry: 0, tired: 0, calm: 0 },
      Monday: { happy: 0, sad: 0, angry: 0, tired: 0, calm: 0  },
      Tuesday: { happy: 0, sad: 0, angry: 0, tired: 0, calm: 0  },
      Wednesday: { happy: 0, sad: 0, angry: 0, tired: 0, calm: 0  },
      Thursday: { happy: 0, sad: 0, angry: 0, tired: 0, calm: 0  },
      Friday: { happy: 0, sad: 0, angry: 0, tired: 0, calm: 0  },
      Saturday: { happy: 0, sad: 0, angry: 0, tired: 0, calm: 0  },
    };
  
    // Iterate through the original data and update the mood counts
    originalData.forEach((entry) => {
      const date = new Date(entry.date);
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
      const mood = entry.mood.toLowerCase(); // assuming mood values are lowercase
  
      // Update the mood count for the corresponding day of the week
      if (moodCounts[dayOfWeek] && moodCounts[dayOfWeek][mood] !== undefined) {
        moodCounts[dayOfWeek][mood]++;
      }
    });
  
    return moodCounts;
  };

  const moodCountsForWeek = calculateMoodsPerDayOfWeek(originalData);

  const chartDataForWeek = Object.keys(moodCountsForWeek).map((dayOfWeek) => ({
    dayOfWeek,
    happy: moodCountsForWeek[dayOfWeek].happy,
    sad: moodCountsForWeek[dayOfWeek].sad,
    angry: moodCountsForWeek[dayOfWeek].angry,
    tired:  moodCountsForWeek[dayOfWeek].tired,
    calm: moodCountsForWeek[dayOfWeek].calm,
  }));

  
  const calculateMoodsPerMonth = (data) => {
    const moodCounts = {};

    data.forEach((entry) => {
      const date = new Date(entry.date);
      const month = date.toLocaleDateString('en-US', { month: 'long' });
      const mood = entry.mood.toLowerCase();

      if (!moodCounts[month]) {
        moodCounts[month] = { happy: 0, sad: 0, angry: 0, tired: 0, calm: 0 };
      }

      if (moodCounts[month] && moodCounts[month][mood] !== undefined) {
        moodCounts[month][mood]++;
      }
    });

    return moodCounts;
  };

  const moodCountsForMonth = calculateMoodsPerMonth(originalData);

  const chartDataForMonth = Object.keys(moodCountsForMonth).map((month) => ({
    month,
    happy: moodCountsForMonth[month].happy,
    sad: moodCountsForMonth[month].sad,
    angry: moodCountsForMonth[month].angry,
    tired: moodCountsForMonth[month].tired,
    calm: moodCountsForMonth[month].calm,
  }));


  let happyVal = countMoodInt('happy')
  let sadVal = countMoodInt('sad')
  let angryVal = countMoodInt('angry')
  let tiredVal = countMoodInt('tired')
  let calmVal = countMoodInt('calm')

  let happyPerc = calculateMoodPercentage("happy")
  let sadPerc = calculateMoodPercentage("sad")
  let angryPerc = calculateMoodPercentage("angry")

  const data = [
    {
      name: 'Happy',
      amt: happyVal,
    },
    {
      name: 'Sad',
      amt: sadVal,
    },
    {
      name: 'Angry',
      amt: angryVal,
    },
    {
      name: 'tired',
      amt: tiredVal,
    },
    {
      name: 'calm',
      amt: calmVal,
    },

  ];


  const dataForPie = [
    { name: 'Happy', value: happyVal },
    { name: 'Sad', value: sadVal },
    { name: 'Angry', value: angryVal },
    { name: "Tired", value: tiredVal },
    { name: "Calm", value: calmVal },
  ];

  const COLORS = ['green', 'blue', 'red', 'gray', 'orange']

  return (
    <div className='mood-analysis'>
      
        <h2>Mood Analysis</h2>

        <div className='percentage-container'>
          <p>Percentage of Green Days: {calculateMoodPercentage('happy')}%</p>
          <p>Percentage of Blue Days: {calculateMoodPercentage('sad')}%</p>
          <p>Percentage of Red Days: {calculateMoodPercentage('angry')}%</p>
        </div>
        
        
      <div className='mood-analysis-container'>
        
        <div className='chart-container pie-chart'>
          <h3>Pie chart for moods distribution</h3>
          <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={dataForPie}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {dataForPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                
              </Pie>
              <Tooltip />
          </PieChart>
        </div>
        
        <div className='chart-container bar-chart'>
          <h3>Bar chart for moods distribution</h3>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />

            <Bar dataKey="amt" fill="black" background={{ fill: '#eee' }} />
      
          </BarChart>
        </div>


        <div className='chart-container'>
          <h3>Line chart for moods in different days of the week</h3>
            <LineChart width={730} height={250} data={chartDataForWeek}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dayOfWeek" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="happy" stroke="green" />
              <Line type="monotone" dataKey="sad" stroke="blue" />
              <Line type="monotone" dataKey="angry" stroke="red" />
              <Line type="monotone" dataKey="tired" stroke="gray" />
              <Line type="monotone" dataKey="calm" stroke="orange" />
            </LineChart>
        </div>

        <div className='chart-container'>
            <h3>Line chart for moods in different month</h3>
            <LineChart width={730} height={250} data={chartDataForMonth}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="happy" stroke="green" />
              <Line type="monotone" dataKey="sad" stroke="blue" />
              <Line type="monotone" dataKey="angry" stroke="red" />
              <Line type="monotone" dataKey="tired" stroke="gray" />
              <Line type="monotone" dataKey="calm" stroke="orange" />
            </LineChart>
        </div>
      </div>

      

      <CreateWordCloud data={originalData}/>

    </div>
  );
};


export default MoodAnalysis;
