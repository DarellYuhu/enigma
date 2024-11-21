import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChannelNetGraph from "./components/ChannelNetGraph";
import VideoNetGraph from "./components/VideoNetGraph";
import TopCentrality from "./components/TopCentrality";
import ClusterInfo from "./components/ClusterInfo";
import ContributionVideos from "./components/ContributionVideos";

const ProjectDetail = ({ params }: { params: { projectId: string } }) => {
  // const [query, setQuery] = useState("");
  // const [selectedTopChannel, setSelectedTopChannel] = useState<string>();
  // const { reset, from, to, setFrom, setTo } = useStatisticDateStore();
  // const [selectedChannel, setSelectedChannel] = useState<
  //   YoutubeTopChannels["tc"]["0"] | null
  // >(null);
  // const [selectedVideo, setSelectedVideo] = useState<
  //   YoutubeProjectTopVideos["top"]["0"] | null
  // >(null);

  // const topVideos = useYoutubeTopVideos({ from, to, params, string: query });
  // const videoStats = useYoutubeVideoStats({ from, to, params, selectedVideo });
  // const topChannels = useYoutubeTopChannels({
  //   from,
  //   to,
  //   params,
  //   string: query,
  // });
  // const audienceNetwork = useYoutubeAudienceNet({
  //   params,
  //   from,
  //   to,
  //   string: query,
  // });
  // const channelTopVids = useYTChannelTopVids({
  //   from,
  //   to,
  //   params,
  //   selectedTopChannel,
  //   string: query,
  // });

  // useEffect(() => {
  //   if (!!topVideos.data) {
  //     setSelectedVideo(topVideos.data?.top[0]);
  //     setSelectedTopChannel(topVideos.data?.tc[0]?.channel_id);
  //   }
  // }, [topVideos.data]);

  // useEffect(() => {
  //   if (!!topChannels.data) {
  //     setSelectedChannel(topChannels.data?.tc[0]);
  //   }
  // }, [topChannels.data]);

  // useEffect(() => {
  //   reset();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-3">
        <Card className="col-span-7">
          <CardHeader>
            <CardTitle>Video Network</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <VideoNetGraph projectId={params.projectId} />
          </CardContent>
        </Card>

        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Top Centrality</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <TopCentrality projectId={params.projectId} />
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Cluster Info</CardTitle>
          </CardHeader>
          <CardContent>
            <ClusterInfo projectId={params.projectId} />
          </CardContent>
        </Card>

        {/* <div className="card flex flex-col col-span-4 h-96">
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
        </div> */}

        {/* <div className="card col-span-8 flex flex-col h-96">
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
        </div> */}

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Channel Network</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ChannelNetGraph projectId={params.projectId} />
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Top Contribution Videos for Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <ContributionVideos projectId={params.projectId} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetail;
