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
import useConfigStore from "./store/config-store";
import Configuration from "./components/Configuration";

const TrendsPage = () => {
  const { category, level, details, since, until } = useConfigStore();
  const { data } = useTrends({
    category,
    level,
    details,
    since: since!,
    until: until!,
  });
  return (
    <div className="space-y-4">
      <Configuration />
      {data && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Daily</CardTitle>
              <CardDescription>
                {dateFormatter("DMY", new Date(data.normalized.day[0].date))} -{" "}
                {dateFormatter(
                  "DMY",
                  new Date(
                    data.normalized.day[data.normalized.day.length - 1].date
                  )
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <RechartMultiLine
                config={data.data.dic.map((item, index) => ({
                  color: data.colors[index],
                  dataKey: item.key,
                  label: item.name,
                  labelKey: "date",
                }))}
                data={data.normalized.day}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly</CardTitle>
              <CardDescription>
                {dateFormatter("DMY", new Date(data.normalized.week[0].date))} -{" "}
                {dateFormatter(
                  "DMY",
                  new Date(
                    data.normalized.week[data.normalized.week.length - 1].date
                  )
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <RechartMultiLine
                config={data.data.dic.map((item, index) => ({
                  color: data.colors[index],
                  dataKey: item.key,
                  label: item.name,
                  labelKey: "date",
                }))}
                data={data.normalized.week}
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

          <Card>
            <CardHeader>
              <CardTitle>Monthly</CardTitle>
              <CardDescription>
                {`${dateFormatter(
                  "MY",
                  new Date(data.normalized.month[0].date)
                )} - ${dateFormatter(
                  "MY",
                  new Date(
                    data.normalized.month[data.normalized.month.length - 1].date
                  )
                )}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <RechartMultiLine
                config={data.data.dic.map((item, index) => ({
                  color: data.colors[index],
                  dataKey: item.key,
                  label: item.name,
                  labelKey: "date",
                }))}
                data={data.normalized.month}
                tickFormatter={(value) => dateFormatter("M", new Date(value))}
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default TrendsPage;
