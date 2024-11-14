"use client";

import Graph from "@/components/Graph";
import HorizontalBarChart2 from "@/components/HorizontalBarChart2";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Toggle } from "@/components/ui/toggle";
import { useTiktokInterestNet } from "@/hooks/useTiktokInterestNet";
import useGraphDateStore from "@/store/graph-date-store";
import { useGraphQueryStore } from "@/store/graph-query-store";
import { interestNetExport } from "@/utils/interestNetExport";
import Link from "next/link";
import React, { useState } from "react";

const InterestGraph = ({ projectId }: { projectId: string }) => {
  const [label, setLabel] = useState(false);
  const [node, setNode] = useState<any>(null);
  const { from, to } = useGraphDateStore();
  const { query } = useGraphQueryStore();
  const { data } = useTiktokInterestNet({
    params: { projectId },
    graphDate: {
      from,
      to,
    },
    graphQuery: query,
  });

  if (!data) return null;

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="relative col-span-full md:col-span-8 h-80">
        <Graph
          showDynamicLabel={label}
          data={data.network}
          onClick={(node) => {
            if (node) {
              setNode(node.data);
            } else {
              setNode(null);
            }
          }}
        />
        <div className="absolute top-2 right-2 space-x-3">
          <Toggle
            variant={"outline"}
            pressed={label}
            onPressedChange={setLabel}
            className={buttonVariants({ variant: "outline" })}
          >
            Show Label
          </Toggle>
          <Button
            variant={"outline"}
            onClick={() => interestNetExport(from!, to!, data.data.network)}
          >
            Export (.gdf)
          </Button>
        </div>
      </div>
      <div className="col-span-full md:col-span-4 w-full rounded-md h-80 p-2">
        <Carousel>
          <CarouselContent>
            {data.hashtags?.map((item, index) => (
              <CarouselItem key={index}>
                <div className=" w-full px-7 h-80">
                  <HorizontalBarChart2
                    data={item.data}
                    labelKey="hashtag"
                    dataKey="value"
                    color={item.color}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0" />
          <CarouselNext className="absolute right-0" />
        </Carousel>
      </div>
      {node ? (
        <div className="absolute bottom-2 left-2 h-3/5 w-64 flex flex-col gap-2 border rounded-md p-2 shadow-lg backdrop-blur-md">
          <h6 className="text-wrap">{node.author_name}</h6>
          <Link
            target="_blank"
            href={`https://www.tiktok.com/@${node.author_name}/video/${node.id}`}
            className="bg-green-300 hover:bg-green-400 rounded-md p-1.5 text-sm text-center justify-center items-center"
          >
            View Video
          </Link>
          <span className="text-xs overflow-y-auto">{node.desc}</span>
        </div>
      ) : null}
    </div>
  );
};

export default InterestGraph;
