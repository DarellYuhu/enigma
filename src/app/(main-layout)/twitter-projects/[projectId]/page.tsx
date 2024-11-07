import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Board from "./components/Board";
import HashtagNetGraph from "./components/HashtagNetGraph";

const TwitterProjectDetail = ({
  params,
}: {
  params: { projectId: string };
}) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Board</CardTitle>
        </CardHeader>
        <CardContent>
          <Board projectId={params.projectId} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hashtag Relation Network</CardTitle>
        </CardHeader>
        <CardContent>
          <HashtagNetGraph projectId={params.projectId} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TwitterProjectDetail;
