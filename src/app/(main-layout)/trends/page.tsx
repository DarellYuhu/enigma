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
import { TrendingDown, TrendingUp } from "lucide-react";
import Datatable from "@/components/Datatable";
import { ColumnDef } from "@tanstack/react-table";

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
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-full">
        <Configuration />
      </div>
      {data && (
        <>
          {/* <Card>
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
          </Card> */}

          <Card className="col-span-8">
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
            {/* <CardFooter>
              {data.rank.rankWeekly.map((item, index) => (
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>{`#${index + 1} ${item.name}`}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-row gap-3">
                      <p>{item.prev}</p>
                      {item.curr > item.prev ? (
                        <TrendingUp className="text-green-500" />
                      ) : (
                        <TrendingDown className="text-red-500" />
                      )}
                      <p>{item.curr}</p>
                    </CardContent>
                  </Card>
                  <p>
                    {(parseFloat(item.curr) - parseFloat(item.prev)).toFixed(2)}
                  </p>
                </div>
              ))}
            </CardFooter> */}
          </Card>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <Datatable
                columns={columns}
                data={data.rank.rankWeekly}
                pagination={false}
              />
            </CardContent>
          </Card>

          <Card className="col-span-8">
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

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <Datatable
                columns={columns}
                data={data.rank.rankMonthly}
                pagination={false}
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

const columns: ColumnDef<
  NonNullable<ReturnType<typeof useTrends>["data"]>["rank"]["rankMonthly"]["0"]
>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "curr",
    header: "Current",
  },
  {
    accessorKey: "prev",
    header: "Previous",
  },
  {
    accessorKey: "diff",
    header: "Change",
    cell({ row }) {
      return (
        <span className="flex flex-row items-center gap-2">
          {parseFloat(row.original.diff).toFixed(2)}
          {parseFloat(row.original.diff) > 0 ? (
            <TrendingUp className="text-green-500" />
          ) : (
            <TrendingDown className="text-red-500" />
          )}
        </span>
      );
    },
  },
];

export default TrendsPage;
