"use client";

import { DatePicker } from "@/components/DatePicker";
import useGraphConfigStore from "../store/graph-config-store";

export default function GraphFilter() {
  const { to, setTo } = useGraphConfigStore();

  return (
    <div className="flex flex-row gap-4 justify-end">
      <DatePicker date={to} onDateChange={setTo} />
      {/* <Window onValueChange={setWindow} value={window} /> */}
    </div>
  );
}
