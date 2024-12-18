import { addDays } from "date-fns";

export default function adjustDateByFactor(factor: number, date: Date) {
  return addDays(date, factor);
}
