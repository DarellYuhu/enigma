"use client";

import useTwitterStatistics from "@/hooks/useTwitterStatistics";
import useBoardConfigStore from "../store/board-config-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BarChart2 from "@/components/BarChart2";

const TimeSeries = ({ projectId }: { projectId: string }) => {
  const { from, to } = useBoardConfigStore();
  const { data } = useTwitterStatistics({
    projectId,
    since: from,
    until: to,
    string: "",
  });

  if (!data) return null;
  return (
    <div className="grid grid-cols-12 gap-4">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Daily</CardTitle>
          <CardDescription>Authors</CardDescription>
        </CardHeader>
        <CardContent className="h-60">
          <BarChart2
            yAxis={false}
            topLabel={false}
            xAxis={false}
            data={data.normalized.daily}
            dataKey="authors"
            labelKey="date"
            label="Authors"
          />
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Daily</CardTitle>
          <CardDescription>Tweets</CardDescription>
        </CardHeader>
        <CardContent className="h-60">
          <BarChart2
            yAxis={false}
            topLabel={false}
            xAxis={false}
            data={data.normalized.daily}
            dataKey="tweets"
            labelKey="date"
            label="Tweets"
          />
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Weekly</CardTitle>
          <CardDescription>Authors</CardDescription>
        </CardHeader>
        <CardContent className="h-60">
          <BarChart2
            yAxis={false}
            topLabel={false}
            xAxis={false}
            data={data.normalized.weekly}
            dataKey="authors"
            labelKey="date"
            label="Authors"
          />
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Weekly</CardTitle>
          <CardDescription>Tweets</CardDescription>
        </CardHeader>
        <CardContent className="h-60">
          <BarChart2
            yAxis={false}
            topLabel={false}
            xAxis={false}
            data={data.normalized.weekly}
            dataKey="tweets"
            labelKey="date"
            label="Tweets"
          />
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Monthly</CardTitle>
          <CardDescription>Authors</CardDescription>
        </CardHeader>
        <CardContent className="h-60">
          <BarChart2
            yAxis={false}
            topLabel={false}
            xAxis={false}
            data={data.normalized.monthly}
            dataKey="authors"
            labelKey="date"
            label="Authors"
          />
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Monthly</CardTitle>
          <CardDescription>Tweets</CardDescription>
        </CardHeader>
        <CardContent className="h-60">
          <BarChart2
            yAxis={false}
            topLabel={false}
            xAxis={false}
            data={data.normalized.monthly}
            dataKey="tweets"
            labelKey="date"
            label="Tweets"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeSeries;
