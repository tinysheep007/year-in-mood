const colorToMood = (c) => {
    if (c === "green") return "happy"
    if (c === "blue") return "sad"
    if (c === "red") return "angry"
    if (c === "gray") return "tired"
    if (c === "orange") return "calm"
    else return "none"
}

export default colorToMood