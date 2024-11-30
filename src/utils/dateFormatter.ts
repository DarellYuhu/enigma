import { format } from "date-fns";

type Type = "ISO" | "DMY" | "MY" | "MD" | "M";

export default function dateFormatter(type: Type, date: Date) {
  switch (type) {
    case "ISO":
      return format(date, "yyyy-MM-dd");
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
