import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChannelNetGraph from "./components/ChannelNetGraph";
import VideoNetGraph from "./components/VideoNetGraph";
import TopCentrality from "./components/TopCentrality";
import ClusterInfo from "./components/ClusterInfo";
import ContributionVideos from "./components/ContributionVideos";
import Configuration from "./components/Configuration";

const ProjectDetail = ({ params }: { params: { projectId: string } }) => {
  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-full flex justify-self-end">
        <Configuration />
      </div>

      <Card className="col-span-8">
        <CardHeader>
          <CardTitle>Video Network</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <VideoNetGraph projectId={params.projectId} />
        </CardContent>
      </Card>

      <Card className="col-span-4 relative">
        <CardHeader>
          <CardTitle>Top Centrality</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <TopCentrality projectId={params.projectId} />
        </CardContent>
      </Card>

      <div className="col-span-full">
        <ClusterInfo projectId={params.projectId} />
      </div>

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

      <Card className="col-span-8">
        <CardHeader>
          <CardTitle>Channel Network</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ChannelNetGraph projectId={params.projectId} />
        </CardContent>
      </Card>

      <Card className="col-span-4 relative">
        <CardHeader>
          <CardTitle>Top Videos from Channel</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ContributionVideos projectId={params.projectId} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetail;
