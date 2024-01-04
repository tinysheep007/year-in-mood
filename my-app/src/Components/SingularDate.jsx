import React, { useState } from 'react';
import "../Style/SingularDateStyle.scss";

const SingularDate = ({ date, color, updateDateColor }) => {
    
    const [sty, setSty] = useState("transparent")
    const handleClick = () => {
        setSty(color)
        updateDateColor(date, color)
    }
    const reset = () => {
        setSty("transparent")
    }

    let month = date.slice(8,)

    const getMonth = () => {
        if (month[0] === '0'){
            month = month[1]
        }
    }

    getMonth(month);


  return (
    <div>
        <div onClick={handleClick}
            style={{
                backgroundColor: sty,
            }} 
        >
            <p>{month}</p>
        </div>
    
        <div>
            <button onClick={reset}>reset</button>
        </div>

      
    </div>
  );
};

export default SingularDate;
