import CustomLineChart from "@/componenets/CustomLineChart";
import { Heart, MessageSquareMore, MonitorPlay, Share2 } from "lucide-react";
import { statistics } from "@/datas/statistics";
import CustomBarChart from "@/componenets/CustomBarChart";
import CustomPieChart from "@/componenets/CustomPieChart";
import NetworkGraph from "@/componenets/NetworkGraph";
import VisNetworkGraph from "@/componenets/VisNetworkGraph";
import { ReactNode, useState } from "react";

type Props = { children: React.ReactNode; relation?: TNetRelation };

type categoryValue = "play" | "like" | "comment" | "share";

const Dashboard = ({ children }: Props) => {
  const [category, setCategory] = useState<categoryValue>("play");
  const handleCategory = (value: categoryValue) => {
    setCategory(value);
  };
  return (
    <div className="grid grid-cols-4 gap-3 text-slate-300">
      <div className="col-span-2 grid grid-cols-2 gap-3">
        <CategoryButton
          categoryState={category}
          label="Play"
          value={statistics.count.play}
          icon={<MonitorPlay width={20} height={20} />}
          category={"play"}
          handleCategory={handleCategory}
        />
        <CategoryButton
          categoryState={category}
          label="Like"
          value={statistics.count.like}
          icon={<Heart width={20} height={20} />}
          category={"like"}
          handleCategory={handleCategory}
        />
        <CategoryButton
          categoryState={category}
          label="Comment"
          value={statistics.count.comment}
          icon={<MessageSquareMore width={20} height={20} />}
          category={"comment"}
          handleCategory={handleCategory}
        />
        <CategoryButton
          categoryState={category}
          label="Share"
          value={statistics.count.share}
          icon={<Share2 width={20} height={20} />}
          category={"share"}
          handleCategory={handleCategory}
        />
        {/* <button
          className={`card border-[1px] border-slate-800 flex flex-col items-start gap-4 ${
            category === "like" && "border-sky-500"
          }`}
          onClick={() => handleCategory("like")}
        >
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
        <button
          className={`card border-[1px] border-slate-800 flex flex-col items-start gap-4 ${
            category === "comment" && "border-sky-500"
          }`}
          onClick={() => handleCategory("comment")}
        >
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
        <button
          className={`card border-[1px] border-slate-800 flex flex-col items-start gap-4 ${
            category === "share" && "border-sky-500"
          }`}
          onClick={() => handleCategory("share")}
        >
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
        </button> */}
      </div>
      <div className="card p-0 block">
        <span className="h-32">
          <h5 className="p-2">Weekly</h5>
          <CustomLineChart
            data={statistics.weekly}
            labelKey="date"
            dataKey={category}
          />
        </span>
      </div>
      <div className="card p-0 block">
        <h5 className="p-2">Monthly</h5>
        <span className="h-32">
          <CustomLineChart
            data={statistics.monthly}
            labelKey="date"
            dataKey={category}
          />
        </span>
      </div>
      <div className="col-span-full grid col grid-cols-8 gap-3">
        <div className="card flex flex-col col-span-3">
          <h5>Top Creators</h5>
          <div className="flex flex-1">
            <CustomPieChart
              data={statistics.topUsers[category]}
              dataKey="value"
              labelKey="user"
            />
          </div>
        </div>
        <div className="card flex flex-col col-span-5 h-[340px]">
          <h5>Daily</h5>
          <div className="flex flex-1">
            <CustomBarChart
              data={statistics.daily}
              labelKey={category}
              dataKey="date"
            />
          </div>
        </div>
      </div>
      <div className="card col-span-2">
        <VisNetworkGraph
          data={statistics.relation}
          style={{ height: "330px", width: "100%" }}
        />
      </div>
      <div className="card col-span-2">interest network</div>
      <div className="card col-span-2">heshtag network</div>
      <div className="card">hashtag info</div>
      <>{children}</>
    </div>
  );
};

const CategoryButton = ({
  category,
  categoryState,
  handleCategory,
  label,
  value,
  icon,
}: {
  categoryState: categoryValue;
  category: categoryValue;
  handleCategory: (value: categoryValue) => void;
  label: string;
  value: number;
  icon: ReactNode;
}) => {
  return (
    <button
      className={`card border-[1px] flex flex-col items-start gap-4 transition-all duration-500 ease-in-out ${
        category === categoryState ? "border-sky-500" : "border-slate-800"
      }`}
      onClick={() => handleCategory(category)}
    >
      <h5 className="flex flex-row gap-2 items-center">
        {icon} {label}
      </h5>
      <span className="text-lg font-semibold">
        {Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(value)}
      </span>
    </button>
  );
};

export default Dashboard;
