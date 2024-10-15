"use client";

import { useQuery } from "@tanstack/react-query";
import getTrends from "@/api/getTrends";
import Dashboard from "@/layouts/dashboard";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import DateRangePicker from "@/components/ui/date-range-picker";
import getInterestGraphs from "@/api/getInterestGraphs";
import getTagRelationGraphs from "@/api/getTagRelationGraphs";

const Trend = () => {
  const [query, setQuery] = useState("");
  const [graphQuery, setGraphQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
    to: new Date(),
  });
  const [graphDateRange, setGraphDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
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
      getInterestGraphs({
        project: "0",
        since: graphDateRange?.from?.toISOString().split("T")[0],
        until: graphDateRange?.to?.toISOString().split("T")[0],
        string: graphQuery,
      }),
  });
  const hashtagsNetwork = useQuery({
    queryKey: ["trends", "graphs", "hashtagsNet"],
    queryFn: () =>
      getTagRelationGraphs({
        project: "0",
        since: graphDateRange?.from?.toISOString().split("T")[0],
        until: graphDateRange?.to?.toISOString().split("T")[0],
        string: graphQuery,
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
        interestNetwork={interestNetwork.data?.network}
        hashtags={interestNetwork.data?.hashtags}
        tagRelationNetwork={hashtagsNetwork.data}
        graphSettingsComponent={
          <div className="flex flex-row gap-2">
            <DateRangePicker
              date={graphDateRange}
              setDate={setGraphDateRange}
              max={7}
              className="w-fit"
            />
            <input
              onChange={(e) => setGraphQuery(e.target.value)}
              value={graphQuery}
              placeholder="filter"
              className="border-[1px]  rounded-md p-2 text-sm"
            />
            <button
              onClick={() => {
                interestNetwork.refetch();
                hashtagsNetwork.refetch();
              }}
              className="bg-blue-400 hover:bg-blue-500 text-white border rounded-md p-2 text-sm"
            >
              Submit
            </button>
          </div>
        }
      />
    </div>
  );
};

export default Trend;
