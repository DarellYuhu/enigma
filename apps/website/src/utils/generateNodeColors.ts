import { COLORS, GLASBEY_COLORS } from "@/constants";
import chroma from "chroma-js";

const generateNodeColors = (
  indicators: string[],
  type: "chroma" | "other" | "random" = "chroma"
) => {
  let colors: string[];

  switch (type) {
    case "chroma":
      colors = chroma
        .scale(["#e23670", "#e88c30", "#2eb88a", "#af57db", "#2662d9"])
        .mode("lch")
        .colors(indicators.length);
      break;

    case "other":
      colors = Array.from({ length: indicators.length }).map(
        (_, index) => COLORS[index % COLORS.length]
      );
      break;

    case "random":
      colors = Array.from({ length: indicators.length }).map(
        (_, index) => GLASBEY_COLORS[index % GLASBEY_COLORS.length]
      );
      break;
  }

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
