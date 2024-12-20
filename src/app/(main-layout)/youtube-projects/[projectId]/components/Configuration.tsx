"use client";

import useConfigStore from "../store/config-store";
import { DatePicker } from "@/components/DatePicker";

const Configuration = () => {
  const { date, setDate } = useConfigStore();
  return (
    <DatePicker
      date={date}
      onDateChange={(date) => date && setDate(date)}
      toDate={new Date()}
    />
  );
};

export default Configuration;
