import chroma from "chroma-js";

const generateNodeColors = (indicators: string[]) => {
  const colors = chroma
    .scale(["#e23670", "#e88c30", "#2eb88a", "#af57db", "#2662d9"])
    .mode("lch")
    .colors(indicators.length);

  // shuffle(colors);

  return indicators.reduce((acc, curr, index) => {
    acc[curr] = colors[index];
    return acc;
  }, {} as Record<string, string>);
};

// function shuffle(array: string[]) {
//   let currentIndex = array.length;

//   // While there remain elements to shuffle...
//   while (currentIndex != 0) {
//     // Pick a remaining element...
//     let randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     // And swap it with the current element.
//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
//   }
// }

export default generateNodeColors;
