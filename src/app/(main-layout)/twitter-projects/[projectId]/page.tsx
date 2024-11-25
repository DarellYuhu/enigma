import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Board from "./components/Board";
import HashtagNetGraph from "./components/HashtagNetGraph";
import HashtagEvoSankey from "./components/HashtagEvoSankey";
import BoardConfig from "./components/BoardConfig";
import TimeSeries from "./components/TimeSeries";
import ClusterStatistics from "./components/ClusterStatistics";
import HashtagClusters from "./components/HashtagClusters";
import AccountNetGraph from "./components/AccountNetGraph";
import AccountCluster from "./components/AccountCluster";
import TopCentralityAccount from "./components/TopCentralityAccount";

const TwitterProjectDetail = ({
  params,
}: {
  params: { projectId: string };
}) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Time Series</CardTitle>
        </CardHeader>
        <CardContent>
          <TimeSeries projectId={params.projectId} />
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Cluster Statistics</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ClusterStatistics projectId={params.projectId} />
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Board</CardTitle>
          <BoardConfig projectId={params.projectId} />
        </CardHeader>
        <CardContent>
          <Board projectId={params.projectId} />
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Hashtag Evolution</CardTitle>
        </CardHeader>
        <CardContent>
          <HashtagEvoSankey projectId={params.projectId} />
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Hashtag Network</CardTitle>
        </CardHeader>
        <CardContent>
          <HashtagNetGraph projectId={params.projectId} />
        </CardContent>
      </Card>

      <div className="col-span-full">
        <HashtagClusters projectId={params.projectId} />
      </div>

      {/* <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <ScatterTopics projectId={params.projectId} />
        </CardContent>
      </Card> */}

      <Card className="col-span-8">
        <CardHeader>
          <CardTitle>Actor Network</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountNetGraph projectId={params.projectId} />
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Top Viewed Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <TopCentralityAccount projectId={params.projectId} />
        </CardContent>
      </Card>

      <div className="col-span-full">
        <AccountCluster projectId={params.projectId} />
      </div>

      {/* <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Top Central Actors</CardTitle>
        </CardHeader>
        <CardContent>
          <TopAccount projectId={params.projectId} />
        </CardContent>
      </Card> */}
    </div>
  );
};

export default TwitterProjectDetail;
