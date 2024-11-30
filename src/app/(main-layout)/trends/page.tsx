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
import useGeoJson from "@/hooks/features/trends/useGeoJson";
import { Layer, Map, Source } from "react-map-gl";
import PH_JSON from "@/data/geojson/ph.json";
import { useTheme } from "next-themes";
import { MAP_THEME } from "@/constants";

const TrendsPage = () => {
  const { theme } = useTheme();
  const { category, level, details, since, until } = useConfigStore();
  const { data } = useTrends({
    category,
    level,
    details,
    since: since!,
    until: until!,
  });
  const geoJson = useGeoJson({
    category,
    since: since && dateFormatter("ISO", since),
    until: until && dateFormatter("ISO", until),
  });

  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-full">
        <Configuration />
      </div>
      {data && (
        <>
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
                config={data.data.dic.map((item) => ({
                  color: data.colors[item.key],
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
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Maps</CardTitle>
        </CardHeader>
        <CardContent className="h-96">
          {geoJson.data && data && (
            <Map
              interactiveLayerIds={["geo-json"]}
              initialViewState={{
                longitude: 122.4,
                latitude: 11.8,
                zoom: 4,
              }}
              style={{ width: "100%", height: "100%" }}
              onMouseEnter={(e) => console.log(e.features)}
              mapStyle={theme === "dark" ? MAP_THEME.dark : MAP_THEME.light}
            >
              <Source
                type="geojson"
                data={PH_JSON as GeoJSON.FeatureCollection<GeoJSON.Geometry>}
              >
                <Layer
                  id={"geo-json"}
                  key={"geo-json"}
                  type="fill"
                  paint={{
                    "fill-color": {
                      type: "categorical",
                      property: "regcode",
                      stops: geoJson.data.map((item) => [
                        item.rid,
                        data.colors[item.pct_total[0].key],
                      ]),
                    },
                    "fill-opacity": 0.5,
                  }}
                />
              </Source>
            </Map>
          )}
        </CardContent>
      </Card>
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
