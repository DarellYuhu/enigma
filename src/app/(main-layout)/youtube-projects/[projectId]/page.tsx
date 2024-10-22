"use client";

import getChannelTopVideos from "@/api/youtube/getChannelTopVideos";
import getTopChannels from "@/api/youtube/getTopChannels";
import getTopVideos from "@/api/youtube/getTopVideos";
import getVideoStats from "@/api/youtube/getVideoStats";
import ComposedBarLine from "@/components/composed-barlinechart";
import CustomBarChart from "@/components/custom-barchart";
import HorizontalBarChart from "@/components/horizontalbarchart";
import VisGraph from "@/components/visgraph";
import interest from "@/data/interest";
import useStatisticDateStore from "@/store/statistic-date-store";
import abbreviateNumber from "@/utils/abbreviateNumber";
import imageLoader from "@/utils/imageLoader";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProjectDetail = ({ params }: { params: { projectId: string } }) => {
  const [selected, setSelected] = useState("a");
  const [selectedChannel, setSelectedChannel] = useState<
    YoutubeTopChannels["tc"]["0"] | null
  >(null);
  const [selectedVideo, setSelectedVideo] = useState<
    YoutubeProjectTopVideos["top"]["0"] | null
  >(null);
  const { reset, from, to } = useStatisticDateStore();

  const topVideos = useQuery({
    queryKey: ["youtube", "projects", params.projectId, "top-videos"],
    queryFn: () =>
      getTopVideos({
        projectId: params.projectId,
        since: from,
        until: to,
        string: "",
      }),
  });
  const videoStats = useQuery({
    queryKey: [
      "youtube",
      "projects",
      params.projectId,
      "statistics",
      selectedVideo?.id,
    ],
    enabled: !!selectedVideo,
    queryFn: () =>
      getVideoStats({
        projectId: params.projectId,
        since: from,
        until: to,
        details: selectedVideo?.id,
      }),
  });
  const topChannels = useQuery({
    queryKey: ["youtube", "projects", params.projectId, "top-channels"],
    queryFn: () =>
      getTopChannels({
        projectId: params.projectId,
        since: from,
        until: to,
        string: "",
      }),
  });
  const channelTopVids = useQuery({
    queryKey: [
      "youtube",
      "projects",
      params.projectId,
      "top-channels",
      selectedChannel?.channel_id,
    ],
    enabled: !!selectedChannel,
    queryFn: () =>
      getChannelTopVideos({
        projectId: params.projectId,
        since: from,
        until: to,
        details: selectedChannel?.channel_id,
        string: "",
      }),
  });

  useEffect(() => {
    if (!!topVideos.data) {
      setSelectedVideo(topVideos.data?.top[0]);
    }
  }, [topVideos.data]);

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    console.log(selectedChannel);
  }, [selectedChannel]);

  return (
    <>
      <div>{params.projectId}</div>
      <div className="grid grid-cols-12 gap-3">
        <div className="card col-span-full flex flex-row flex-nowrap gap-2 overflow-x-auto">
          {topVideos.data?.top.map((item, index) => (
            <Image
              key={index}
              loader={imageLoader}
              src={item.id}
              alt="profile_picture"
              className="aspect-[16/9] rounded-lg object-contain bg-slate-200"
              width={300}
              height={300}
              onClick={() => setSelectedVideo(item)}
            />
          ))}
        </div>
        <div className="card col-span-3 space-y-3 bg-gray-600 text-white">
          {selectedVideo && (
            <>
              <h3 className="line-clamp-3">{selectedVideo.title}</h3>
              <Image
                className="aspect-[16/9] rounded-lg object-contain bg-slate-200"
                loader={imageLoader}
                src={selectedVideo.id}
                width={300}
                height={300}
                alt="profile_picture"
              />
              <h4 className="text-sm font-light text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h4>
            </>
          )}
        </div>
        <div className="col-span-2 space-y-3">
          <div className="card text-center space-y-2">
            <h3 className="text-3xl font-semibold">
              {abbreviateNumber(selectedVideo?.like ?? 0)}
            </h3>
            <p>Likes</p>
          </div>
          <div className="card text-center space-y-2">
            <h3 className="text-3xl font-semibold">
              {abbreviateNumber(selectedVideo?.view ?? 0)}
            </h3>
            <p>Views</p>
          </div>
          <div className="card text-center space-y-2">
            <h3 className="text-3xl font-semibold">
              {abbreviateNumber(selectedVideo?.comment ?? 0)}
            </h3>
            <p>Comments</p>
          </div>
        </div>
        <div className="card col-span-7">
          <h3>Stats Overtime</h3>
          {videoStats.data && (
            <ComposedBarLine
              data={videoStats.data?.comment}
              barDataKey="del"
              barLabel="Deletion"
              lineDataKey="val"
              lineLabel="Value"
              labelKey="date"
            />
          )}
        </div>
        <div className="card flex flex-col col-span-4">
          <h2>Top Publication Channels</h2>
          <div className="flex flex-1">
            {topChannels.data && (
              <HorizontalBarChart
                data={topChannels.data?.tc}
                dataKey="frac"
                labelKey="channel_name"
                label="Frequency"
                selectedId={selectedChannel?.channel_id}
                onBarSelect={setSelectedChannel}
              />
            )}
          </div>
        </div>
        <div className="card col-span-8">
          <h2>ANC 24/7</h2>
          <CustomBarChart data={dummyData} dataKey="date" labelKey="value" />
        </div>
        <div className="card col-span-4">
          <h2>Top Video Sources</h2>
          <div className="space-y-2">
            <ToggleGroup
              type="single"
              value={selected}
              onValueChange={(value) => {
                if (value) setSelected(value);
              }}
              className="flex flex-col flex-nowrap items-center gap-2"
            >
              {["a", "b", "c"].map((value, index) => {
                return (
                  <ToggleGroupItem
                    key={index}
                    value={value}
                    className={` bg-slate-300 w-full p-1 text-sm rounded-md transition-all duration-300 ${
                      selected === value ? "bg-red-700 text-white" : ""
                    }`}
                  >
                    {value}
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
            <button className="bg-slate-300 py-1 px-4 text-xs flex justify-self-center rounded-md  transition-all duration-300 hover:bg-red-600 hover:text-white">
              VIEW
            </button>
            <div className="flex flex-row flex-nowrap gap-2 overflow-x-auto">
              {Array.from({ length: 15 }).map((_, index) => (
                <Image
                  key={index}
                  src={"/avatars/me.jpg"}
                  alt="profile_picture"
                  className="aspect-[16/9] rounded-lg object-contain bg-slate-200"
                  width={200}
                  height={200}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="card col-span-8">
          {/* <VisGraph data={interest.network} /> */}
        </div>
        {/* <div className="card col-span-4">1items</div>
        <div className="card col-span-8">items</div>
        <div className="card col-span-4">items</div>
        <div className="card col-span-8">items</div>
        <div className="card col-span-full">items</div> */}
      </div>
    </>
  );
};

const dummyData: { value: number; date: string }[] = [
  { value: 100, date: new Date("2022-01-01").toLocaleDateString() },
  { value: 200, date: new Date("2022-01-02").toLocaleDateString() },
  { value: 300, date: new Date("2022-01-03").toLocaleDateString() },
  { value: 400, date: new Date("2022-01-04").toLocaleDateString() },
  { value: 500, date: new Date("2022-01-05").toLocaleDateString() },
  { value: 600, date: new Date("2022-01-06").toLocaleDateString() },
  { value: 700, date: new Date("2022-01-07").toLocaleDateString() },
  { value: 800, date: new Date("2022-01-08").toLocaleDateString() },
  { value: 900, date: new Date("2022-01-09").toLocaleDateString() },
  { value: 1000, date: new Date("2022-01-10").toLocaleDateString() },
  { value: 1100, date: new Date("2022-01-11").toLocaleDateString() },
  { value: 1200, date: new Date("2022-01-12").toLocaleDateString() },
  { value: 1300, date: new Date("2022-01-13").toLocaleDateString() },
];

export default ProjectDetail;
