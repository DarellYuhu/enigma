import Configuration from "./components/Configuration";
import TimeSeries from "./components/TimeSeries";
import Rank from "./components/Rank";
import Maps from "./components/Maps";
import ActorNetwork from "./components/ActorNetwork";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TopCentrality from "./components/TopCentrality";
import { ScrollArea } from "@/components/ui/scroll-area";

const TrendsPage = () => {
  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-full">
        <Configuration details="PH" />
      </div>

      <div className="col-span-full">
        <TimeSeries details="PH" />
      </div>

      <div className="col-span-full">
        <Rank details="PH" />
      </div>

      <div className="col-span-full">
        <Maps details="PH" />
      </div>

      <div className="col-span-8">
        <ActorNetwork details="PH" />
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Top Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80">
            <TopCentrality details="PH" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendsPage;
