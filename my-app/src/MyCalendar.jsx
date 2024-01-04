import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateColors, setDateColors] = useState({});

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleColorSelection = (date, color) => {
    setDateColors((prevColors) => ({
      ...prevColors,
      [date.toISOString()]: color,
    }));
  };

  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      return (
        <div
          style={{
            backgroundColor: dateColors[date.toISOString()] || 'transparent',
          }}
          onClick={() => handleColorSelection(date, 'green')}
        />
      );
    }
    return null;
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={getTileContent}
      />
    </div>
  );
};

export default Home;
