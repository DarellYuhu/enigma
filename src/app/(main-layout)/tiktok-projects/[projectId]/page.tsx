"use client";

import DateRangePicker from "@/components/ui/date-range-picker";
import useGraphDateStore from "@/store/graph-date-store";
import useStatisticDateStore from "@/store/statistic-date-store";
import { useEffect, useState } from "react";
import Dashboard from "@/layouts/Dashboard";
import Board from "./components/Board";
import { useTiktokTrends } from "@/hooks/useTiktokTrends";
import { useTiktokInterestNet } from "@/hooks/useTiktokInterestNet";
import { useTiktokHashtagNet } from "@/hooks/useTiktokHashtagNet";
import { useTiktokBoards } from "@/hooks/useTiktokBoards";

const ProjectDetail = ({ params }: { params: { projectId: string } }) => {
  const graphDate = useGraphDateStore();
  const statisticDate = useStatisticDateStore();
  const [query, setQuery] = useState("");
  const [graphQuery, setGraphQuery] = useState("");
  const trends = useTiktokTrends({ params, query, statisticDate });
  const boards = useTiktokBoards({
    from: statisticDate.from,
    to: statisticDate.to,
    projectId: params.projectId,
    string: query,
  });
  const interestNetwork = useTiktokInterestNet({
    params,
    graphQuery,
    graphDate,
  });
  const hashtagsNetwork = useTiktokHashtagNet({
    params,
    graphDate,
    graphQuery,
  });
  useEffect(() => {
    graphDate.reset();
    statisticDate.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          onClick={() => {
            trends.refetch();
            boards.refetch();
          }}
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
              // max={7}
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
