import chroma from "chroma-js";

const generateNodeColors = (indicators: string[]) => {
  const colors = chroma
    .scale(["red", "green", "blue", "purple", "teal", "gold", "pink"])
    .mode("lch")
    .colors(indicators.length);

  return indicators.reduce((acc, curr, index) => {
    acc[curr] = colors[index];
    return acc;
  }, {} as Record<string, string>);
};

export default generateNodeColors;
