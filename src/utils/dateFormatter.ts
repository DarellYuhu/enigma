type Type = "ISO" | "DMY" | "MY" | "MD" | "M";

export default function dateFormatter(type: Type, date: Date) {
  switch (type) {
    case "ISO":
      return date.toISOString().split("T")[0];
    case "DMY":
      return `${date.getDate()} ${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;
    case "MY":
      return `${date.toLocaleString("default", {
        month: "long",
      })} ${date.toLocaleString("default", { year: "numeric" })}`;
    case "MD":
      return `${date.toLocaleString("default", {
        month: "long",
      })} ${date.getDate()}`;
    case "M":
      return date.toLocaleString("default", { month: "long" });
    default:
      return "UNKOWN TYPE";
  }
}
