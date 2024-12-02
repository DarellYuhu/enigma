"use client";

import { useSearchParams } from "next/navigation";
import useConfigStore from "../store/config-store";
import { DatePicker } from "@/components/DatePicker";
import { useEffect } from "react";

const Configuration = () => {
  const searchParams = useSearchParams();
  const dateParams = searchParams.get("date");
  const { date, setDate } = useConfigStore();
  useEffect(() => {
    if (dateParams) setDate(new Date(dateParams));
  }, [dateParams]);
  return (
    <DatePicker
      date={date}
      onDateChange={(date) => setDate(date!)}
      toDate={new Date()}
    />
  );
};

export default Configuration;
