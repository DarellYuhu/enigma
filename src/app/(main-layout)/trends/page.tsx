import Configuration from "./components/Configuration";
import TimeSeries from "./components/TimeSeries";
import Rank from "./components/Rank";
import Maps from "./components/Maps";
import ActorNetwork from "./components/ActorNetwork";

const TrendsPage = () => {
  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-full">
        <Configuration details="PH" />
      </div>

      <div className="col-span-8">
        <TimeSeries details="PH" />
      </div>

      <div className="col-span-4">
        <Rank details="PH" />
      </div>

      <div className="col-span-full">
        <Maps details="PH" />
      </div>

      <div className="col-span-full">
        <ActorNetwork details="PH" />
      </div>
    </div>
  );
};

export default TrendsPage;
