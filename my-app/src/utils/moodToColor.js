const moodToColor = (mood) =>{
    if (mood === "happy") return "green"
    if (mood === "sad") return "blue"
    if (mood === "angry") return "red"
    if (mood === "tired") return "gray"
    if (mood === "calm") return "orange"
    else return "none"
}

export default moodToColor