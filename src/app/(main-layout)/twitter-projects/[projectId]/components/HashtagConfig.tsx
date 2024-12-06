"use client";

import { DatePicker } from "@/components/DatePicker";
import useHashtagStore from "../store/hashtag-config-store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const HashtagConfig = () => {
  const searchParams = useSearchParams();
  const dateParams = searchParams.get("date");
  const { date, setDate } = useHashtagStore();

  useEffect(() => {
    if (dateParams) setDate(new Date(dateParams));
  }, [dateParams]);

  return (
    <div className="flex justify-end">
      <DatePicker
        date={date}
        onDateChange={(value) => value && setDate(value)}
      />
    </div>
  );
};

export default HashtagConfig;
