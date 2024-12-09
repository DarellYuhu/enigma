"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import * as Tabs from "@radix-ui/react-tabs";
import abbreviateNumber from "@/utils/abbreviateNumber";
import { Separator } from "@/components/ui/separator";
import {
  DiscreteLegend,
  DiscreteLegendEntry,
  LinearGauge,
  LinearGaugeSeries,
} from "reaviz";
import chroma from "chroma-js";
import { Frown, Meh, Play, Smile, XIcon } from "lucide-react";
import useYoutubeVideoNet from "@/hooks/features/youtube/useYoutubeVideoNet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useConfigStore from "../store/config-store";
import dateFormatter from "@/utils/dateFormatter";

const ClusterInfo = ({ projectId }: { projectId: string }) => {
  const { date } = useConfigStore();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const { data } = useYoutubeVideoNet({
    projectId,
    window: 5,
    date: dateFormatter("ISO", date),
  });
  if (!data) return null;
  return (
    <>
      <Tabs.Root className="space-y-4" defaultValue="0">
        <ScrollArea className="w-full overflow-x-auto ">
          <Tabs.TabsList className="flex flex-row w-full bg-gray-300 rounded-md p-2 gap-2">
            {data?.classesWithVideos
              .filter((item) => !!item.representation)
              .map((item, index) => (
                <Tabs.TabsTrigger
                  key={index}
                  value={index.toString()}
                  className={
                    "p-2 w-10 h-10w-10 rounded-md data-[state=active]:opacity-35 data-[state=active]:shadow-md transition-all duration-300"
                  }
                  style={{
                    backgroundColor: item.colors,
                  }}
                />
              ))}
          </Tabs.TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {data?.classesWithVideos.map((item, index) => (
          <Tabs.TabsContent
            key={index}
            value={index.toString()}
            className="w-full grid grid-cols-12 gap-4"
          >
            <div className="grid grid-cols-12 gap-4 col-span-full lg:col-span-8">
              <Card className="col-span-6 lg:col-span-4">
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Representation</CardTitle>
                  <CardDescription>{item.representation}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="col-span-6 lg:col-span-8">
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Summary</CardTitle>
                  <CardDescription>{item.summary}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="col-span-full">
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Topics</CardTitle>
                  <CardDescription>
                    <ReactMarkdown>{item.topics}</ReactMarkdown>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            <div className="col-span-full lg:col-span-4 grid grid-cols-12 gap-4">
              <Card className="col-span-full">
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Overview Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row justify-evenly">
                    <div className="flex flex-col items-center">
                      {abbreviateNumber(item.num_authors)}
                      <p className="text-sm">Channels</p>
                    </div>
                    <Separator orientation="vertical" className="h-11" />
                    <div className="flex flex-col items-center">
                      {abbreviateNumber(item.num_contents)}
                      <p className="text-sm">Contents</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-full">
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Content Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row justify-evenly">
                    <div className="flex flex-col items-center">
                      {abbreviateNumber(item.total_views)}
                      <p className="text-sm">Views</p>
                    </div>
                    <Separator orientation="vertical" className="h-11" />
                    <div className="flex flex-col items-center">
                      {abbreviateNumber(item.total_likes)}
                      <p className="text-sm">Likes</p>
                    </div>
                    <Separator orientation="vertical" className="h-11" />
                    <div className="flex flex-col items-center">
                      {abbreviateNumber(item.total_comments)}
                      <p className="text-sm">Comments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-full">
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Tone</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="col-span-full">
                    <LinearGauge
                      series={<LinearGaugeSeries colorScheme={colorScheme} />}
                      data={[
                        { key: "Negative", data: item.tone_negative * 100 },
                        { key: "Neutral", data: item.tone_neutral * 100 },
                        { key: "Positive", data: item.tone_positive * 100 },
                      ]}
                      height={30}
                      className="w-full"
                    />
                    <DiscreteLegend
                      orientation="horizontal"
                      entries={scale.map((v, i) => (
                        <DiscreteLegendEntry
                          key={index}
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
                  </div>
                </CardContent>
              </Card>
              <div className="col-span-full h-96">
                <Carousel>
                  <CarouselContent>
                    {item.videos.map((video, index) => (
                      <CarouselItem key={index}>
                        <div
                          className="relative cursor-pointer group h-full"
                          onClick={() => {
                            setIsVideoOpen(true);
                            setVideoId(video.id);
                          }}
                        >
                          <img
                            src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
                            alt={"Hero Video"}
                            width={1920}
                            height={1080}
                            className="h-full object-contain w-full transition-all duration-200 group-hover:brightness-[0.8] ease-out rounded-md shadow-lg border bg-black"
                          />
                          <div className="absolute inset-0 flex items-center justify-center group-hover:scale-100 scale-[0.9] transition-all duration-200 ease-out rounded-2xl">
                            <Play
                              className="text-white fill-white group-hover:scale-105 scale-100 transition-transform duration-200 ease-out"
                              style={{
                                filter:
                                  "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                              }}
                            />
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              </div>
            </div>
          </Tabs.TabsContent>
        ))}
      </Tabs.Root>
      <AnimatePresence>
        {isVideoOpen && videoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsVideoOpen(false)}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-video mx-4 md:mx-0"
            >
              <motion.button className="absolute -top-16 right-0 text-white text-xl bg-neutral-900/50 ring-1 backdrop-blur-md rounded-full p-2 dark:bg-neutral-100/50 dark:text-black">
                <XIcon className="size-5" />
              </motion.button>
              <div className="size-full border-2 border-white rounded-2xl overflow-hidden isolate z-[1] relative">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  className="size-full rounded-2xl"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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

export default ClusterInfo;
