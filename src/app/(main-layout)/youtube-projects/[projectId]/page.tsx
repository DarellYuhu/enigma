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
        <CardContent className="h-80 relative">
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

      <Card className="col-span-8">
        <CardHeader>
          <CardTitle>Channel Network</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ChannelNetGraph projectId={params.projectId} />
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <ContributionVideos projectId={params.projectId} />
      </Card>
    </div>
  );
};

export default ProjectDetail;
