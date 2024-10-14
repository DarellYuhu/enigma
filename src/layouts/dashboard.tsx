import CustomLineChart from "@/components/custom-linechart";
import { Heart, MessageSquareMore, MonitorPlay, Share2 } from "lucide-react";
import CustomBarChart from "@/components/custom-barchart";
import CustomPieChart from "@/components/custom-piechart";
import { ReactNode, useState } from "react";
import { GetTrendsReturn } from "@/api/getTrends";
import VisGraph from "@/components/visgraph";
import { Data as GraphData } from "vis-network/peer/esm/vis-network";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import VerticalBarChart from "@/components/custom-verticalbarchart";
import { DataSet } from "vis-data";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  statistics?: GetTrendsReturn;
  interestNetwork?: GraphData;
  hashtags?: { color: string; data: { hashtag: string; value: number }[] }[];
};

type categoryValue = "play" | "like" | "comment" | "share";

const Dashboard = ({
  children,
  statistics,
  interestNetwork,
  hashtags,
}: Props) => {
  const [category, setCategory] = useState<categoryValue>("play");
  const [node, setNode] = useState<any>(null);
  const handleCategory = (value: categoryValue) => {
    setCategory(value);
  };
  return (
    <div>
      <div className="grid grid-cols-4 gap-3 text-slate-800 dark:text-slate-300">
        <div className="col-span-2 grid grid-cols-2 gap-3">
          <CategoryButton
            categoryState={category}
            label="Play"
            value={statistics?.count.play || 0}
            icon={<MonitorPlay width={20} height={20} />}
            category={"play"}
            handleCategory={handleCategory}
          />
          <CategoryButton
            categoryState={category}
            label="Like"
            value={statistics?.count.play || 0}
            icon={<Heart width={20} height={20} />}
            category={"like"}
            handleCategory={handleCategory}
          />
          <CategoryButton
            categoryState={category}
            label="Comment"
            value={statistics?.count.comment || 0}
            icon={<MessageSquareMore width={20} height={20} />}
            category={"comment"}
            handleCategory={handleCategory}
          />
          <CategoryButton
            categoryState={category}
            label="Share"
            value={statistics?.count.share || 0}
            icon={<Share2 width={20} height={20} />}
            category={"share"}
            handleCategory={handleCategory}
          />
        </div>
        <div className="card p-0 block">
          <span className="h-32">
            <h5 className="p-2">Weekly</h5>
            <CustomLineChart
              data={statistics?.weekly || []}
              labelKey="date"
              dataKey={category}
            />
          </span>
        </div>
        <div className="card p-0 block">
          <h5 className="p-2">Monthly</h5>
          <span className="h-32">
            <CustomLineChart
              data={statistics?.monthly || []}
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
                data={statistics?.topUsers[category] || []}
                dataKey="value"
                labelKey="user"
              />
            </div>
          </div>
          <div className="card flex flex-col col-span-5 h-[340px]">
            <h5>Daily</h5>
            <div className="flex flex-1">
              <CustomBarChart
                data={statistics?.daily || []}
                labelKey={category}
                dataKey="date"
              />
            </div>
          </div>
        </div>
        <div className="card flex flex-col col-span-full gap-3 relative">
          <div className="flex flex-row">
            <div className="relative   w-full h-80">
              <h5 className="absolute top-0 left-0">Interest Network</h5>
              {interestNetwork ? (
                <VisGraph
                  data={interestNetwork as any}
                  events={{
                    click: (event) => {
                      const nodes = new DataSet(interestNetwork.nodes as any);
                      const node = nodes.get(event.nodes[0]);
                      if (node && !Array.isArray(node)) {
                        setNode(node);
                      } else {
                        setNode(null);
                      }
                    },
                  }}
                />
              ) : null}
              {node ? (
                <div className="absolute bottom-0 left-0 h-3/5 w-64 flex flex-col gap-2 border rounded-md p-2 shadow-lg backdrop-blur-md">
                  <h6 className="text-wrap">{node.author_name}</h6>
                  <Link
                    target="_blank"
                    href={`https://www.tiktok.com/@${node.author_name}/video/${node.id}`}
                    className="bg-green-300 hover:bg-green-400 rounded-md p-1.5 text-sm text-center justify-center items-center"
                  >
                    View Video
                  </Link>
                  <span className="text-xs overflow-y-auto">{node.desc}</span>
                </div>
              ) : null}
            </div>
            <div className="w-56 bg-slate-100 rounded-md">
              <Carousel>
                <CarouselContent>
                  {hashtags?.map((item, index) => (
                    <CarouselItem key={index}>
                      <div className="h-80 w-full px-7">
                        <VerticalBarChart
                          data={item.data}
                          labelKey="hashtag"
                          dataKey="value"
                          color={item.color}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0" />
                <CarouselNext className="absolute right-0" />
              </Carousel>
            </div>
          </div>
        </div>
        {/* <div className="col-span-full grid grid-cols-6">
          <div className="card flex flex-col col-span-2">
            <h5>Hashtags</h5>
            
          </div>
        </div> */}
        <div className="card col-span-2">heshtag network</div>
        <div className="card">hashtag info</div>
        <>{children}</>
      </div>
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
        category === categoryState
          ? "border-sky-500"
          : "border-white dark:border-slate-800"
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
