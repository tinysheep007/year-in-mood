const moodData = [];

for (let month = 1; month <= 12; month++) {
  const daysInMonth = new Date(2023, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = `2023-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    const mood = day % 3 === 0 ? 'happy' : day % 3 === 1 ? 'angry' : 'sad';

    moodData.push({ date: dateString, mood });
  }
}





// const moodData = [
//     { date: '2023-01-01', mood: 'angry' },
//     { date: '2023-01-02', mood: 'sad' },
//     { date: '2023-01-03', mood: 'happy' },
//     { date: '2023-01-04', mood: 'angry' },
//     { date: '2023-01-05', mood: 'sad' },
//     { date: '2023-01-06', mood: 'happy' },
//     { date: '2023-01-07', mood: 'angry' },
//     { date: '2023-01-08', mood: 'sad' },
//     { date: '2023-01-09', mood: 'happy' },
//     { date: '2023-01-10', mood: 'angry' },
//     { date: '2023-01-11', mood: 'sad' },
//     { date: '2023-01-12', mood: 'happy' },
//     { date: '2023-01-13', mood: 'angry' },
//     { date: '2023-01-14', mood: 'sad' },
//     { date: '2023-01-15', mood: 'happy' },
//     { date: '2023-01-16', mood: 'angry' },
//     { date: '2023-01-17', mood: 'sad' },
//     { date: '2023-01-18', mood: 'happy' },
//     { date: '2023-01-19', mood: 'angry' },
//     { date: '2023-01-20', mood: 'sad' },
//     { date: '2023-01-21', mood: 'happy' },
//     { date: '2023-01-22', mood: 'angry' },
//     { date: '2023-01-23', mood: 'sad' },
//     { date: '2023-01-24', mood: 'happy' },
//     { date: '2023-01-25', mood: 'angry' },
//     { date: '2023-01-26', mood: 'sad' },
//     { date: '2023-01-27', mood: 'happy' },
//     { date: '2023-01-28', mood: 'angry' },
//     { date: '2023-01-29', mood: 'sad' },
//     { date: '2023-01-30', mood: 'happy' },
//     { date: '2023-01-31', mood: 'angry' },
//   ];

export default moodData