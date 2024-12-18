export default function extractAgeLabel(key: string) {
  switch (key) {
    case "level1":
      return "18-24";
    case "level2":
      return "24-35";

    default:
      return "35+";
  }
}
