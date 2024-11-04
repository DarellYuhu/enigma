"use client";

import Dashboard from "@/layouts/Dashboard";
import { useEffect, useState } from "react";
import DateRangePicker from "@/components/ui/date-range-picker";
import useStatisticDateStore from "@/store/statistic-date-store";
import useGraphDateStore from "@/store/graph-date-store";
import { useTiktokTrends } from "@/hooks/useTiktokTrends";
import { useTiktokInterestNet } from "@/hooks/useTiktokInterestNet";
import { useTiktokHashtagNet } from "@/hooks/useTiktokHashtagNet";

const Trend = () => {
  const [query, setQuery] = useState("");
  const [graphQuery, setGraphQuery] = useState("");
  const statisticDate = useStatisticDateStore();
  const graphDate = useGraphDateStore();
  const trends = useTiktokTrends({
    params: { projectId: "0" },
    query,
    statisticDate,
  });
  const interestNetwork = useTiktokInterestNet({
    params: { projectId: "0" },
    graphDate,
    graphQuery,
  });
  const hashtagsNetwork = useTiktokHashtagNet({
    params: { projectId: "0" },
    graphDate: statisticDate,
    graphQuery,
  });

  useEffect(() => {
    graphDate.reset();
    statisticDate.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-2 flex-wrap">
        <DateRangePicker
          date={{ from: statisticDate.from, to: statisticDate.to }}
          setDate={(value) => {
            statisticDate.setFrom(value?.from);
            statisticDate.setTo(value?.to);
          }}
          className="w-fit"
        />
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="filter"
          className="border-[1px]  rounded-md p-2 text-sm"
        />
        <button
          onClick={() => {
            trends.refetch();
            hashtagsNetwork.refetch();
          }}
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
          <div className="flex flex-row flex-wrap gap-2">
            <DateRangePicker
              date={{ from: graphDate.from, to: graphDate.to }}
              setDate={(value) => {
                graphDate.setFrom(value?.from);
                graphDate.setTo(value?.to);
              }}
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
              onClick={() => interestNetwork.refetch()}
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
