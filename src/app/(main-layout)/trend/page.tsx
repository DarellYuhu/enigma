"use client";

import { useQuery } from "@tanstack/react-query";
import getTrends from "@/api/getTrends";
import Dashboard from "@/layouts/dashboard";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import DateRangePicker from "@/components/ui/date-range-picker";
import getGraphs from "@/api/getGraphs";

const Trend = () => {
  const [query, setQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
    to: new Date(),
  });
  const trends = useQuery({
    queryKey: ["trends", "statistics"],
    queryFn: () =>
      getTrends({
        project: "0",
        since: dateRange?.from?.toISOString().split("T")[0],
        until: dateRange?.to?.toISOString().split("T")[0],
        string: query,
      }),
  });
  const interestNetwork = useQuery({
    queryKey: ["trends", "graphs", "interestNet"],
    queryFn: () =>
      getGraphs({
        type: "interestNet",
        project: "0",
        since: "2024-10-12",
        until: "2024-10-13",
        string: "",
      }),
  });
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-2">
        <DateRangePicker
          date={dateRange}
          setDate={setDateRange}
          className="w-fit"
        />
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="filter"
          className="border-[1px]  rounded-md p-2 text-sm"
        />
        <button
          onClick={() => trends.refetch()}
          className="bg-blue-400 hover:bg-blue-500 text-white border rounded-md p-2 text-sm"
        >
          Submit
        </button>
      </div>
      <Dashboard
        statistics={trends.data}
        interestNetwork={interestNetwork.data}
      >
        <div className="bg-green-400 border-[1px] border-black">
          trending topics
        </div>
      </Dashboard>
    </div>
  );
};

export default Trend;
