"use client";

import { useQuery } from "@tanstack/react-query";
import getTrends from "@/api/tiktok/getTrends";
import Dashboard from "@/layouts/dashboard";
import { useState } from "react";
import DateRangePicker from "@/components/ui/date-range-picker";
import getInterestGraphs from "@/api/tiktok/getInterestGraphs";
import getTagRelationGraphs from "@/api/tiktok/getTagRelationGraphs";
import useStatisticDateStore from "@/store/statistic-date-store";
import useGraphDateStore from "@/store/graph-date-store";

const Trend = () => {
  const [query, setQuery] = useState("");
  const [graphQuery, setGraphQuery] = useState("");
  const statisticDate = useStatisticDateStore();
  const graphDate = useGraphDateStore();
  const trends = useQuery({
    queryKey: ["trends", "statistics"],
    queryFn: () =>
      getTrends({
        project: "0",
        since: statisticDate?.from?.toISOString().split("T")[0],
        until: statisticDate?.to?.toISOString().split("T")[0],
        string: query,
      }),
  });
  const interestNetwork = useQuery({
    queryKey: ["trends", "graphs", "interestNet"],
    queryFn: () =>
      getInterestGraphs({
        project: "0",
        since: graphDate?.from?.toISOString().split("T")[0],
        until: graphDate?.to?.toISOString().split("T")[0],
        string: graphQuery,
      }),
  });
  const hashtagsNetwork = useQuery({
    queryKey: ["trends", "graphs", "hashtagsNet"],
    queryFn: () =>
      getTagRelationGraphs({
        project: "0",
        since: graphDate?.from?.toISOString().split("T")[0],
        until: graphDate?.to?.toISOString().split("T")[0],
        string: graphQuery,
      }),
  });
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-2">
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
