const moodData = [];

for (let month = 1; month <= 12; month++) {
  const daysInMonth = new Date(2023, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = `2023-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    
    // Adjust the mood assignment logic to include "happy," "sad," and "angry"
    const moodProbability = day % 5; // Adjust the divisor based on your preference
    let mood;

    switch (moodProbability) {
      case 0:
        mood = 'tired';
        break;
      case 1:
        mood = 'calm';
        break;
      case 2:
        mood = 'happy';
        break;
      case 3:
        mood = 'sad';
        break;
      case 4:
        mood = 'angry';
        break;
      default:
        mood = 'happy'; // Default to "happy" if needed
    }

    const comments = "";

    moodData.push({ date: dateString, mood, comments });
  }
}






// const moodData = [
//     { date: '2023-01-01', mood: 'angry', comments: "wot" },
//     { date: '2023-01-02', mood: 'sad' , comments: "wot" },
//     { date: '2023-01-03', mood: 'happy' , comments: "wot" },
//     { date: '2023-01-04', mood: 'angry' , comments: "wot" },
//     { date: '2023-01-05', mood: 'sad', comments: "wot"  },
//     { date: '2023-01-06', mood: 'happy', comments: "wot"  },
//     { date: '2023-01-07', mood: 'angry', comments: "wot"  },
//     { date: '2023-01-08', mood: 'sad', comments: "wot"  },
//     { date: '2023-01-09', mood: 'happy' , comments: "wot" },
//     { date: '2023-01-10', mood: 'angry' , comments: "wot" },
//     { date: '2023-01-11', mood: 'sad', comments: "wot"  },
//     { date: '2023-01-12', mood: 'happy' , comments: "wot" },
//     { date: '2023-01-13', mood: 'angry' , comments: "wot" },
//     { date: '2023-01-14', mood: 'sad', comments: "wot"  },
//     { date: '2023-01-15', mood: 'happy', comments: "wot"  },
//     { date: '2023-01-16', mood: 'angry', comments: "wot"  },
//     { date: '2023-01-17', mood: 'sad', comments: "wot"  },
//     { date: '2023-01-18', mood: 'happy' , comments: "wot" },
//     { date: '2023-01-19', mood: 'angry' , comments: "wot" },
//     { date: '2023-01-20', mood: 'sad' , comments: "wot" },
//     { date: '2023-01-21', mood: 'happy' , comments: "wot" },
//     { date: '2023-01-22', mood: 'angry' , comments: "wot" },
//     { date: '2023-01-23', mood: 'sad' , comments: "wot" },
//     { date: '2023-01-24', mood: 'happy', comments: "wot"  },
//     { date: '2023-01-25', mood: 'angry' , comments: "wot" },
//     { date: '2023-01-26', mood: 'sad', comments: "wot"  },
//     { date: '2023-01-27', mood: 'happy' , comments: "wot" },
//     { date: '2023-01-28', mood: 'angry' , comments: "wot" },
//     { date: '2023-01-29', mood: 'sad' , comments: "wot" },
//     { date: '2023-01-30', mood: 'happy', comments: "wot"  },
//     { date: '2023-01-31', mood: 'angry', comments: "wot"  },
//   ];

export default moodData