"use client";

import { DatePicker } from "@/components/DatePicker";
import useGraphConfigStore from "../store/graph-config-store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GraphFilter() {
  const { to, setTo } = useGraphConfigStore();
  const searchParams = useSearchParams();
  const date = searchParams.get("date");

  useEffect(() => {
    if (date) setTo(new Date(date));
  }, [date]);

  return (
    <div className="flex flex-row gap-4 justify-end">
      <DatePicker date={to} onDateChange={setTo} />
      {/* <Window onValueChange={setWindow} value={window} /> */}
    </div>
  );
}
