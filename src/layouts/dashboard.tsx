import CustomLineChart from "@/componenets/CustomLineChart";
import { Heart, MessageSquareMore, MonitorPlay, Share2 } from "lucide-react";
import { statistics } from "@/datas/statistics";
import CustomBarChart from "@/componenets/CustomBarChart";
import CustomPieChart from "@/componenets/CustomPieChart";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-4 gap-3 text-slate-300">
      <div className="col-span-2 grid grid-cols-2 gap-3">
        <button className="card flex flex-col items-start gap-4">
          <h5 className="flex flex-row gap-2 items-center">
            <MonitorPlay width={20} height={20} />
            Play
          </h5>
          <span className="text-lg font-semibold">
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(32115000)}
          </span>
        </button>
        <button className="card flex flex-col items-start gap-4">
          <h5 className="flex flex-row gap-2 items-center">
            <Heart width={20} height={20} />
            Like
          </h5>
          <span className="text-lg font-semibold">
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(4413095)}
          </span>
        </button>
        <button className="card flex flex-col items-start gap-4">
          <h5 className="flex flex-row gap-2 items-center">
            <MessageSquareMore width={20} height={20} />
            Comment
          </h5>
          <span className="text-lg font-semibold">
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(27260)}
          </span>
        </button>
        <button className="card flex flex-col items-start gap-4">
          <h5 className="flex flex-row gap-2 items-center">
            <Share2 width={20} height={20} />
            Share
          </h5>
          <span className="text-lg font-semibold">
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(736470)}
          </span>
        </button>
      </div>
      <div className="card p-0 block">
        <span className="h-32">
          <h5 className="p-2">Weekly</h5>
          <CustomLineChart
            data={statistics.weekly}
            labelKey="date"
            dataKey="play"
          />
        </span>
      </div>
      <div className="card p-0 block">
        <h5 className="p-2">Monthly</h5>
        <span className="h-32">
          <CustomLineChart
            data={statistics.monthly}
            labelKey="date"
            dataKey="play"
          />
        </span>
      </div>
      <div className="col-span-full grid grid-cols-8 gap-3">
        <div className="card flex flex-col col-span-3">
          <h5>Top Creators</h5>
          <div className="flex flex-1">
            <CustomPieChart
              data={statistics.topUsers.play}
              dataKey="value"
              labelKey="user"
            />
          </div>
        </div>
        <div className="card flex flex-col col-span-5">
          <h5>Daily</h5>
          <div className="flex flex-1">
            <CustomBarChart
              data={statistics.daily}
              labelKey="play"
              dataKey="date"
            />
          </div>
        </div>
      </div>
      <div className="card col-span-2">hashtag by segment audiens</div>
      <div className="card col-span-2">interest network</div>
      <div className="card col-span-2">heshtag network</div>
      <div className="card">hashtag info</div>
      <>{children}</>
    </div>
  );
};

export default Dashboard;
