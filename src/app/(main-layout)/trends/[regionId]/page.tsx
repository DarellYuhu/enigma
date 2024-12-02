import { CardTitle } from "@/components/ui/card";
import Configuration from "../components/Configuration";
import Rank from "../components/Rank";
import PH_JSON from "@/data/geojson/ph.json";
import TimeSeries from "../components/TimeSeries";
import ActorNetwork from "../components/ActorNetwork";

const RegionPage = ({ params }: { params: { regionId: string } }) => {
  return (
    <div className="grid grid-cols-12 gap-3">
      <CardTitle className="col-span-full">
        {PH_JSON.features.find((f) => f.properties.regcode === params.regionId)
          ?.properties.regname ?? "Unkown Region"}
      </CardTitle>
      <div className="col-span-full">
        <Configuration details={params.regionId} />
      </div>

      <div className="col-span-8">
        <TimeSeries details={params.regionId} />
      </div>

      <div className="col-span-4">
        <Rank details={params.regionId} />
      </div>

      <div className="col-span-full">
        <ActorNetwork details={params.regionId} />
      </div>
    </div>
  );
};

export default RegionPage;
