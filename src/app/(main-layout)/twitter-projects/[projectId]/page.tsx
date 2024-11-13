import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Board from "./components/Board";
import HashtagNetGraph from "./components/HashtagNetGraph";
import AccountNetGraph from "./components/AccountNetGraph";
import HashtagEvoSankey from "./components/HashtagEvoSankey";
import ScatterTopics from "./components/ScatterTopics";
import TopAccount from "./components/TopAccount";

const TwitterProjectDetail = ({
  params,
}: {
  params: { projectId: string };
}) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Board</CardTitle>
        </CardHeader>
        <CardContent>
          <Board projectId={params.projectId} />
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
          <CardTitle>Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <ScatterTopics projectId={params.projectId} />
        </CardContent>
      </Card>

      <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Actor Network</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountNetGraph projectId={params.projectId} />
        </CardContent>
      </Card>

      <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Top Central Actors</CardTitle>
        </CardHeader>
        <CardContent>
          <TopAccount projectId={params.projectId} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TwitterProjectDetail;
