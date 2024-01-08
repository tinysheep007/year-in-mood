import React, { useState, useEffect } from 'react';
import "../Style/SingularDateStyle.scss";
import Modal from 'react-modal';
import moodToColor from '../utils/moodToColor';

const SingularDate = ({ date, color, updateDateColor, SQLComments, defaultMood }) => {
    
    const [sty, setSty] = useState("transparent")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comment, setComment] = useState('');
    
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

    useEffect(()=>{
        setSty(moodToColor(defaultMood))
    },[defaultMood])

    useEffect(() => {
        // Initialize the comment state with the default comments
        setComment(SQLComments || '');
    }, [SQLComments]);
    
    const handleCommentButtonClick = () => {
        setIsModalOpen(true);
      };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    const handleSaveComment = () => {
        // Get the current date and time
        const currentDate = new Date();

        // Format the date as a string (you can customize the format as needed)
        const formattedDate = `Last updated by ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

        // Append the formatted date to the comment
        const commentWithDate = `${comment} - ${formattedDate}`;
        // Perform any actions you need with the comment data
        updateDateColor(date, sty, commentWithDate);
        // console.log('Comment saved:', comment);
        // Close the modal
        setIsModalOpen(false);
    };

      
    const handleClick = () => {
        setSty(color)
        updateDateColor(date, color, comment)
    }

    const reset = () => {
        setSty("transparent")
        updateDateColor(date, "transparent", comment);
    }


    let exactDay = date.slice(8,)

    const getMonth = () => {
        if (exactDay[0] === '0'){
            exactDay = exactDay[1]
        }
    }

    getMonth(exactDay);

    

  return (
    <div className='single-big-container'>
        
        <div onClick={handleClick}
            style={{
                backgroundColor: sty,
                color: defaultMood === "none" ? "black" : "white",
            }} 
            className="singular-date"
        >
            <p className='textInCell exactDay' >{exactDay}</p>
            <p className='textInCell dayOfWeek' >{dayOfWeek}</p>
            <p className='textInCell moodOfDay' >{defaultMood}</p>
        
            </div>
            <div>
                <button onClick={reset}>reset</button>

                <div>
                    <button onClick={handleCommentButtonClick}>Journal</button>
                    {/* Add the following modal code */}
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={handleCloseModal}
                        contentLabel="Comment Modal"
                        style={{
                            overlay: {
                                
                                zIndex: 1000, // Set a higher z-index value for the overlay
                            },
                            content: {
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                maxWidth: '400px',
                                width: '100%',
                                padding: '20px',
                                borderRadius: '10px',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                                backgroundColor: 'white',
                            },
                        }}
                        className="ReactModal__Overlay"
                    >
                        <div className='ReactModal__Content'>

                            <h2 style={{fontSize: "30px"}}>Journal</h2>
                            <textarea
                            style={{
                                width: '100%',  // Adjust the width as needed
                                height: '100px', // Adjust the height as needed
                                fontSize: '16px', // Adjust the font size as needed
                                
                                // Add any other styling properties you want
                              }}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Enter your comment here..."
                            />
                            <div className='single-buttons'>
                            <button
                                onClick={handleSaveComment}
                                style={{
                                    backgroundColor: '#495153',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                    transition: 'background-color 0.3s ease',
                                    marginRight: '10px', // Adjust the margin as needed
                                }}
                                >
                                Save Journal
                                </button>

                                <button
                                onClick={handleCloseModal}
                                style={{
                                    backgroundColor: '#495153',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                    transition: 'background-color 0.3s ease',
                                }}
                                >
                                Close
                                </button>

                            </div>
                        </div>
                        
                        
                    </Modal>
                </div>

            </div>
        

      
    </div>
  );
};

export default SingularDate;
