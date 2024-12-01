"use client";
import RechartMultiLine from "@/components/RechartMultiLine";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useTrends from "@/hooks/features/useTrends";
import dateFormatter from "@/utils/dateFormatter";
import useConfigStore from "../store/config-store";
import SingleSelect from "@/components/SingleSelect";

const TimeSeries = ({ details }: { details: string }) => {
  const { category, level, since, until, type, setType } = useConfigStore();
  const { data } = useTrends({
    category,
    level,
    details,
    since: since!,
    until: until!,
  });
  if (!data) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Series</CardTitle>
        <CardDescription>
          {dateFormatter("DMY", new Date(data.normalized[type][0].date))} -{" "}
          {dateFormatter(
            "DMY",
            new Date(
              data.normalized[type][data.normalized[type].length - 1].date
            )
          )}
        </CardDescription>
        <SingleSelect
          selections={selections}
          value={type}
          setValue={(value) => setType(value as typeof type)}
        />
      </CardHeader>
      <CardContent className="h-80">
        <RechartMultiLine
          config={data.data.dic.map((item) => ({
            color: data.colors[item.key],
            dataKey: item.key,
            label: item.name,
            labelKey: "date",
          }))}
          data={data.normalized[type]}
          tickFormatter={(value) =>
            value
              ? new Date(value).toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                })
              : ""
          }
        />
      </CardContent>
    </Card>
  );
};

const selections = [
  {
    value: "week",
    label: "Weekly",
  },
  {
    value: "month",
    label: "Monthly",
  },
];

export default TimeSeries;
