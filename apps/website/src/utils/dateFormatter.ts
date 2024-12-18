import { format } from "date-fns";

type Type = "ISO" | "DMY" | "MY" | "MD" | "M";

export default function dateFormatter(type: Type, date: Date) {
  switch (type) {
    case "ISO":
      return format(date, "yyyy-MM-dd");
    case "DMY":
      return `${date.getDate()} ${date.toLocaleString("en-US", {
        month: "long",
      })} ${date.getFullYear()}`;
    case "MY":
      return `${date.toLocaleString("en-US", {
        month: "long",
      })} ${date.toLocaleString("en-US", { year: "numeric" })}`;
    case "MD":
      return `${date.toLocaleString("en-US", {
        month: "long",
      })} ${date.getDate()}`;
    case "M":
      return date.toLocaleString("en-US", { month: "long" });
    default:
      return "UNKOWN TYPE";
  }
}
