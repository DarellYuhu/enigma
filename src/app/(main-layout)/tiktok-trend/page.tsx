import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HashtagGraph from "./components/HashtagGraph";
import InterestGraph from "./components/InterestGraph";
import { GraphFilter } from "./components/Filter";

const Trend = () => {
  return (
    <div className="grid grid-cols-12 gap-3">
      <Card className="col-span-full flex flex-col">
        <CardHeader>
          <CardTitle>Interest Network</CardTitle>
        </CardHeader>
        <CardContent className="relative p-0">
          <InterestGraph />
        </CardContent>
      </Card>

      <div className="col-span-full">
        <GraphFilter projectId="0" />
      </div>

      <Card className="col-span-full flex flex-col">
        <CardHeader>
          <CardTitle>Hashtag Map</CardTitle>
        </CardHeader>
        <CardContent className="relative p-0 h-80">
          <HashtagGraph projectId="0" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Trend;
