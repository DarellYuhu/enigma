"use client";

import useTwitterStatistics, {
  TwitterStatistics,
} from "@/hooks/useTwitterStatistics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import BarChart2 from "@/components/charts/BarChart2";
import SingleSelect from "@/components/SingleSelect";
import { useState } from "react";
import adjustDateByFactor from "@/utils/adjustDateByFactor";
import DateRangePicker from "@/components/ui/date-range-picker";
import SearchInput from "@/components/SearchInput";
import { useSearchParams } from "next/navigation";

const TimeSeries = ({ projectId }: { projectId: string }) => {
  const searchParams = useSearchParams();
  const [date, setDate] = useState<{ since?: Date; until?: Date }>({
    since: adjustDateByFactor(-30, new Date(searchParams.get("date") || "")),
    until: new Date(searchParams.get("date") || ""),
  });
  const [string, setString] = useState("");
  const [type, setType] = useState<keyof TwitterStatistics["ts"]>("daily");
  const { data, refetch } = useTwitterStatistics({
    projectId,
    since: date.since,
    until: date.until,
    string,
  });

  if (!data) return null;
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-6">
          <CardHeader>
            <CardDescription>Accounts</CardDescription>
          </CardHeader>
          <CardContent className="h-60">
            <BarChart2
              yAxis={false}
              topLabel={false}
              xAxis={false}
              data={data.normalized[type]}
              dataKey="authors"
              labelKey="date"
              label="Authors"
            />
          </CardContent>
        </Card>
        <Card className="col-span-6">
          <CardHeader>
            <CardDescription>Tweets</CardDescription>
          </CardHeader>
          <CardContent className="h-60">
            <BarChart2
              yAxis={false}
              topLabel={false}
              xAxis={false}
              data={data.normalized[type]}
              dataKey="tweets"
              labelKey="date"
              label="Tweets"
            />
          </CardContent>
        </Card>
      </div>
      <div className="absolute top-4 right-4 flex flex-row gap-3">
        <DateRangePicker
          date={{ from: date.since, to: date.until }}
          setDate={(value) =>
            setDate({
              since: value?.from,
              until: value?.to,
            })
          }
        />
        <SearchInput
          onChange={setString}
          onClick={() => {
            refetch();
          }}
        />
        <SingleSelect
          selections={selections}
          value={type}
          setValue={(value) => setType(value as typeof type)}
        />
      </div>
    </>
  );
};

const selections = [
  {
    label: "Daily",
    value: "daily",
  },
  {
    label: "Weekly",
    value: "weekly",
  },
  {
    label: "Monthly",
    value: "monthly",
  },
];

export default TimeSeries;
