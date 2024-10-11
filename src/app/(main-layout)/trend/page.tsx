"use client";

import VisNetworkGraph from "@/componenets/VisNetworkGraph";
import Chip from "@/componenets/Chip";
import Card from "@/componenets/Card";
import CustomBarChart from "@/componenets/CustomBarChart";
import CustomPieChart from "@/componenets/CustomPieChart";
import Select from "@/componenets/Select";
import CustomLineChart from "@/componenets/CustomLineChart";
import VerticalBarChart from "@/componenets/VerticalBarChart";
import { useQuery } from "@tanstack/react-query";
import getTrends from "@/api/getTrends";
import Dashboard from "@/layouts/dashboard";
import getGraphs from "@/api/getGraphs";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import DateRangePicker from "@/components/ui/date-range-picker";

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
  // const graphs = useQuery({
  //   queryKey: ["trends", "graphs"],
  //   queryFn: () =>
  //     getGraphs({
  //       type: "interestNet",
  //       project: "0",
  //       since: "2024-10-09",
  //       until: "2024-10-11",
  //       string: "",
  //     }),
  // });
  // if (graphs.status === "pending") {
  //   return <div>Loading...</div>;
  // }
  // if (!graphs.data) {
  //   return <div>No data</div>;
  // }
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
      <Dashboard statistics={trends.data}>
        <div className="bg-green-400 border-[1px] border-black">
          trending topics
        </div>
      </Dashboard>
    </div>
  );
};

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const statisticData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];

const verticalBarData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
];

export default Trend;
