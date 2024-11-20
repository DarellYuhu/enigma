"use client";

import Graph from "@/components/Graph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useTwitterScatterTopics, {
  ScatterTopicsResult,
} from "@/hooks/useTwitterScatterTopics";
import chroma from "chroma-js";
import { Frown, Meh, Smile } from "lucide-react";
import { useState } from "react";
import {
  DiscreteLegend,
  DiscreteLegendEntry,
  LinearGauge,
  LinearGaugeSeries,
} from "reaviz";

const debounce = (func: any, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const ScatterTopics = ({ projectId }: { projectId: string }) => {
  const [filterd, setFiltered] =
    useState<ScatterTopicsResult["normalized"]["nodes"]["0"]["data"]>(null);
  const { data } = useTwitterScatterTopics({
    project: projectId,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  });

  const handleFilter = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filtered = data?.data.tweets.filter((item) =>
      item.full_text.toLowerCase().includes(value)
    );
    setFiltered(filtered || null);
  }, 500);

  return (
    <div className="relative w-full h-80 flex flex-row">
      <Input
        type="search"
        placeholder="Search..."
        className="absolute top-0 left-0 z-10 md:w-[100px] lg:w-[300px]"
        onChange={handleFilter}
      />
      {data && (
        <Graph
          nodeGreyoutOpacity={0.05}
          selectedNodes={filterd}
          data={data.normalized}
          showDynamicLabel={false}
          nodeLabelAccessor={(node) => {
            return `${node.label}: ${node.data.full_text}`;
          }}
        />
      )}
      <div className="bg-white">
        <Card>
          <CardContent className="p-2">
            <CardHeader className="p-2">
              <CardTitle className="text-sm">Tone</CardTitle>
            </CardHeader>
            <ScrollArea className="h-60">
              <DiscreteLegend
                orientation="horizontal"
                entries={scale.map((v, i) => (
                  <DiscreteLegendEntry
                    key={i}
                    style={{
                      padding: "0 3px",
                    }}
                    symbol={v.icon}
                    label={`${v.type}`}
                    color={colorScheme[i]}
                    orientation="horizontal"
                  />
                ))}
              />
              <div className="space-y-2">
                {data?.data.class &&
                  Object.entries(data?.data.class)
                    .sort((a, b) => b[1].tone_negative - a[1].tone_negative)
                    .map(([key, item], index) => (
                      <div key={index} className="flex flex-row gap-2">
                        <Separator
                          onClick={() =>
                            setFiltered(
                              data.data.tweets.filter(
                                (item) => item.class === key
                              )
                            )
                          }
                          className="w-2"
                          style={{
                            height: 15,
                            backgroundColor: data.colors[key] ?? "#808080",
                          }}
                        />
                        <div>
                          <LinearGauge
                            series={
                              <LinearGaugeSeries colorScheme={colorScheme} />
                            }
                            data={[
                              {
                                key: "Negative",
                                data: item.tone_negative * 100,
                              },
                              {
                                key: "Neutral",
                                data: item.tone_neutral * 100,
                              },
                              {
                                key: "Positive",
                                data: item.tone_positive * 100,
                              },
                            ]}
                            width={300}
                            height={15}
                          />
                        </div>
                      </div>
                    ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const colorScheme = chroma.scale(["#f87171", "#4ade80"]).colors(3);
const scale = [
  {
    type: "Negative",
    icon: <Frown />,
  },
  {
    type: "Neutral",
    icon: <Meh />,
  },
  {
    type: "Positive",
    icon: <Smile />,
  },
];

export default ScatterTopics;
