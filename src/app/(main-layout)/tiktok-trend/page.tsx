import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Category from "./components/Category";
import Weekly from "./components/Weekly";
import Monthly from "./components/Monthly";
import Creators from "./components/Creators";
import Daily from "./components/Daily";
import HashtagGraph from "./components/HashtagGraph";
import InterestGraph from "./components/InterestGraph";
import { GraphFilter, StatisticsFilter } from "./components/Filter";

const Trend = () => {
  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-full">
        <StatisticsFilter projectId="0" />
      </div>

      <div className="col-span-full md:col-span-6 flex">
        <Category projectId="0" />
      </div>

      <Card className="col-span-6 md:col-span-3 flex flex-col">
        <CardHeader>
          <CardTitle>Weekly</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-full">
          <Weekly projectId="0" />
        </CardContent>
      </Card>

      <Card className="col-span-6 md:col-span-3 flex flex-col">
        <CardHeader>
          <CardTitle>Monthly</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-full">
          <Monthly projectId="0" />
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-5">
        <CardHeader>
          <CardTitle>Top Creators</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-80">
          <Creators projectId="0" />
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-7 flex flex-col">
        <CardHeader>
          <CardTitle>Daily</CardTitle>
        </CardHeader>
        <CardContent className="pb-4 pt-0 pl-0 pr-4 h-80">
          <Daily projectId="0" />
        </CardContent>
      </Card>

      <Card className="col-span-full flex flex-col">
        <CardHeader>
          <CardTitle>Hashtag Map</CardTitle>
        </CardHeader>
        <CardContent className="relative p-0 h-80">
          <HashtagGraph projectId="0" />
        </CardContent>
      </Card>

      <div className="col-span-full">
        <GraphFilter projectId="0" />
      </div>

      <Card className="col-span-full flex flex-col">
        <CardHeader>
          <CardTitle>Interest Network</CardTitle>
        </CardHeader>
        <CardContent className="relative p-0">
          <InterestGraph projectId="0" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Trend;
