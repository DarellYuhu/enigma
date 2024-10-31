"use client";

import BarChart2 from "@/components/BarChart2";
import ComposedBarLine from "@/components/ComposedBarLine";
import HorizontalBarChart from "@/components/HorizontalBarChart";
import useStatisticDateStore from "@/store/statistic-date-store";
import imageLoader from "@/utils/imageLoader";
import Image from "next/image";
import { useEffect, useState } from "react";
import normalizeChannelsStats from "./utils/normalizeChannelsStats";
import ChannelTopVideos from "./components/ChannelTopVideos";
import normalizeChannelVids from "./utils/normalizeChannelsVids";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import CategoryButton from "./components/CategoryButton";
import { useYoutubeTopVideos } from "@/hooks/useYoutubeTopVideos";
import { useYoutubeVideoStats } from "@/hooks/useYoutubeVideoStats";
import { useYoutubeTopChannels } from "@/hooks/useYoutubeTopChannels";
import { useYTChannelTopVids } from "@/hooks/useYTChannelTopVids";
import { useYoutubeAudienceNet } from "@/hooks/useYoutubeAudienceNet";
import Graph from "@/components/Graph";
import DateRangePicker from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProjectDetail = ({ params }: { params: { projectId: string } }) => {
  const [query, setQuery] = useState("");
  const [netCategory, setNetCategory] = useState<"vn" | "cn">("vn");
  const [category, setCategory] = useState<"view" | "like" | "comment">("view");
  const [selectedTopChannel, setSelectedTopChannel] = useState<string>();
  const { reset, from, to, setFrom, setTo } = useStatisticDateStore();
  const [selectedChannel, setSelectedChannel] = useState<
    YoutubeTopChannels["tc"]["0"] | null
  >(null);
  const [selectedVideo, setSelectedVideo] = useState<
    YoutubeProjectTopVideos["top"]["0"] | null
  >(null);

  const topVideos = useYoutubeTopVideos({ from, to, params, string: query });
  const videoStats = useYoutubeVideoStats({ from, to, params, selectedVideo });
  const topChannels = useYoutubeTopChannels({
    from,
    to,
    params,
    string: query,
  });
  const audienceNetwork = useYoutubeAudienceNet({
    params,
    from,
    to,
    string: query,
  });
  const channelTopVids = useYTChannelTopVids({
    from,
    to,
    params,
    selectedTopChannel,
    string: query,
  });

  useEffect(() => {
    if (!!topVideos.data) {
      setSelectedVideo(topVideos.data?.top[0]);
      setSelectedTopChannel(topVideos.data?.tc[0]?.channel_id);
    }
  }, [topVideos.data]);

  useEffect(() => {
    if (!!topChannels.data) {
      setSelectedChannel(topChannels.data?.tc[0]);
    }
  }, [topChannels.data]);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-2">
        <DateRangePicker
          date={{ from, to }}
          setDate={(value) => {
            setFrom(value?.from);
            setTo(value?.to);
          }}
          className="w-fit"
        />
        <Input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Filter"
        />
        <Button
          onClick={() => {
            topVideos.refetch();
            videoStats.refetch();
            audienceNetwork.refetch();
            channelTopVids.refetch();
          }}
        >
          Submit
        </Button>
      </div>

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
              <h3 className="line-clamp-3">{`${
                selectedVideo.channel_title
              } | ${new Date(
                selectedVideo.pub_date
              ).toLocaleDateString()}`}</h3>
              <Image
                className="aspect-[16/9] rounded-lg object-contain bg-slate-200"
                loader={imageLoader}
                src={selectedVideo.id}
                width={300}
                height={300}
                alt="profile_picture"
              />
              <h4 className="text-sm font-light text-center overflow-y-auto">
                {`${selectedVideo.title}`}
              </h4>
            </>
          )}
        </div>
        <div className="col-span-2 flex-col flex justify-between">
          <CategoryButton
            dataKey="view"
            selected={category}
            onClick={setCategory}
            value={selectedVideo?.view}
          />
          <CategoryButton
            dataKey="like"
            selected={category}
            onClick={setCategory}
            value={selectedVideo?.like}
          />
          <CategoryButton
            dataKey="comment"
            selected={category}
            onClick={setCategory}
            value={selectedVideo?.comment}
          />
        </div>
        <div className="flex flex-col card col-span-7 h-80">
          <h3>Stats Overtime</h3>
          <div className="flex flex-1">
            {videoStats.data && (
              <ComposedBarLine
                data={videoStats.data?.[category]}
                barDataKey="del"
                barLabel="Growth"
                lineDataKey="val"
                lineLabel="Metric"
                labelKey="date"
              />
            )}
          </div>
        </div>
        <div className="card flex flex-col col-span-4 h-96">
          <h2>Top Publication Channels</h2>
          <div className="flex flex-1">
            {topChannels.data && (
              <HorizontalBarChart
                data={topChannels.data.tc}
                dataKey="frac"
                labelKey="channel_name"
                label="Frequency"
                selectedId={selectedChannel?.channel_id}
                onBarSelect={setSelectedChannel}
              />
            )}
          </div>
        </div>
        <div className="card col-span-8 flex flex-col h-96">
          {selectedChannel && topChannels.data && (
            <>
              <h2>{selectedChannel.channel_name}</h2>
              <div className="flex flex-1">
                <BarChart2
                  data={normalizeChannelsStats(
                    selectedChannel.channel_id,
                    topChannels.data?.ts
                  )}
                  labelKey={"date"}
                  dataKey={"value"}
                  label={"Count"}
                  topLabel={false}
                  yAxis={false}
                />
              </div>
            </>
          )}
        </div>
        <div className="card col-span-5 space-y-4 pb-7 h-[500px]">
          <h2>Top Video Sources</h2>
          <div className="space-y-2">
            {topVideos.data && (
              <ToggleGroup
                type="single"
                value={selectedTopChannel}
                onValueChange={(value) => {
                  if (value) setSelectedTopChannel(value);
                }}
              >
                <div className="flex flex-row overflow-x-auto gap-2">
                  {topVideos.data.tc.map((value, index) => {
                    return (
                      <ToggleGroupItem
                        key={index}
                        value={value.channel_id}
                        className={` bg-slate-300 w-full p-1 text-sm rounded-md transition-all duration-300 hover:bg-red-500 hover:text-white text-nowrap`}
                      >
                        {value.channel_name}
                      </ToggleGroupItem>
                    );
                  })}
                </div>
              </ToggleGroup>
            )}
            <button
              className="bg-slate-300 py-1 px-4 text-xs flex justify-self-center rounded-md  transition-all duration-300 hover:bg-red-600 hover:text-white"
              onClick={() =>
                window.open(
                  `https://www.youtube.com/channel/${selectedTopChannel}`,
                  "_blank"
                )
              }
            >
              VIEW
            </button>
          </div>
          {channelTopVids.data && (
            <ChannelTopVideos
              data={normalizeChannelVids(
                channelTopVids.data.tv.like,
                channelTopVids.data.info
              )}
            />
          )}
        </div>
        <div className="card col-span-7 h-[500px] relative">
          {audienceNetwork.data && (
            <Graph data={audienceNetwork.data[netCategory] || []} />
          )}
          <ToggleGroup
            className="absolute top-2 right-2"
            type="single"
            value={netCategory}
            onValueChange={(value: "cn" | "vn") => setNetCategory(value)}
          >
            <ToggleGroupItem variant={"outline"} value="cn">
              Channel
            </ToggleGroupItem>
            <ToggleGroupItem variant={"outline"} value="vn">
              Video
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
