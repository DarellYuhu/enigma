"use client";

import { DatePicker } from "@/components/DatePicker";
import useHashtagStore from "../store/hashtag-config-store";

const HashtagConfig = () => {
  const { date, setDate } = useHashtagStore();
  return (
    <div className="flex justify-end">
      <DatePicker date={date} onDateChange={setDate} />
    </div>
  );
};

export default HashtagConfig;
