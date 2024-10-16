"use client";

import getInterestGraphs from "@/api/getInterestGraphs";
import getTagRelationGraphs from "@/api/getTagRelationGraphs";
import getTrends from "@/api/getTrends";
import Board from "@/components/board";
import DateRangePicker from "@/components/ui/date-range-picker";
import Dashboard from "@/layouts/dashboard";
import useGraphDateStore from "@/store/graph-date-store";
import useStatisticDateStore from "@/store/statistic-date-store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const ProjectDetail = ({ params }: { params: { projectId: string } }) => {
  const graphDate = useGraphDateStore();
  const statisticDate = useStatisticDateStore();
  const [query, setQuery] = useState("");
  const [graphQuery, setGraphQuery] = useState("");
  const trends = useQuery({
    queryKey: ["trends", "statistics", params.projectId],
    queryFn: () =>
      getTrends({
        project: params.projectId,
        since: statisticDate?.from?.toISOString().split("T")[0],
        until: statisticDate?.to?.toISOString().split("T")[0],
        string: query,
      }),
  });
  const interestNetwork = useQuery({
    queryKey: ["trends", "graphs", "interestNet", params.projectId],
    queryFn: () =>
      getInterestGraphs({
        project: params.projectId,
        since: graphDate.from?.toISOString().split("T")[0],
        until: graphDate.to?.toISOString().split("T")[0],
        string: graphQuery,
      }),
  });
  const hashtagsNetwork = useQuery({
    queryKey: ["trends", "graphs", "hashtagsNet", params.projectId],
    queryFn: () =>
      getTagRelationGraphs({
        project: params.projectId,
        since: graphDate.from?.toISOString().split("T")[0],
        until: graphDate.to?.toISOString().split("T")[0],
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
        board={<Board string={query} projectId={params.projectId} />}
        statistics={trends.data}
        interestNetwork={interestNetwork.data?.network}
        hashtags={interestNetwork.data?.hashtags}
        tagRelationNetwork={hashtagsNetwork.data}
        graphSettingsComponent={
          <div className="flex flex-row gap-2">
            <DateRangePicker
              date={{ from: graphDate.from, to: graphDate.to }}
              setDate={(date) => {
                graphDate.setFrom(date?.from);
                graphDate.setTo(date?.to);
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

export default ProjectDetail;
