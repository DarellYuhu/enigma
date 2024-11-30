import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InterestGraph from "./components/InterestGraph";
import TypeSelection from "./components/TypeSelection";
import Evolution from "./components/Evolution";
import Configuration from "./components/Configuration";

const Trend = () => {
  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-full flex justify-end">
        <Configuration />
      </div>

      <Card className="col-span-full flex flex-col">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Interest Network</CardTitle>
          <TypeSelection />
        </CardHeader>
        <CardContent className="relative p-0">
          <InterestGraph />
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Topics Evolution</CardTitle>
        </CardHeader>
        <CardContent className="h-[450px]">
          <Evolution />
        </CardContent>
      </Card>

      {/* <div className="col-span-full">
        <GraphFilter projectId="0" />
      </div>

      <Card className="col-span-full flex flex-col">
        <CardHeader>
          <CardTitle>Hashtag Map</CardTitle>
        </CardHeader>
        <CardContent className="relative p-0 h-80">
          <HashtagGraph projectId="0" />
        </CardContent>
      </Card> */}
    </div>
  );
};

export default Trend;
