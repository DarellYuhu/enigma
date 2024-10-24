import { Heart, MessageSquareMore, MonitorPlay, Share2 } from "lucide-react";
import CustomBarChart from "@/components/CustomBarChart";
import CustomPieChart from "@/components/CustomPieChart";
import { ReactNode, useState } from "react";
import { GetTrendsReturn } from "@/api/tiktok/getTrends";
import VisGraph from "@/components/VisGraph";
import { Edge, Node } from "vis-network/peer/esm/vis-network";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DataSet } from "vis-data";
import Link from "next/link";
import TagInformation from "@/components/TagInformation";
import useCategoryStore from "@/store/category-store";
import abbreviateNumber from "@/utils/abbreviateNumber";
import tagRelationExport from "@/utils/tagRelationExport";
import useGraphDateStore from "@/store/graph-date-store";
import interestNetExport from "@/utils/interestNetExport";
import HorizontalBarChart2 from "@/components/HorizontalBarChart2";
import AreaChart2 from "@/components/AreaChart2";

type Props = {
  board?: React.ReactNode;
  graphSettingsComponent: React.ReactNode;
  statistics?: GetTrendsReturn;
  interestNetwork?: {
    nodes: Node[];
    edges: Edge[];
  };
  tagRelationNetwork?: {
    nodes: Node[];
    edges: Edge[];
  };
  hashtags?: { color: string; data: { hashtag: string; value: number }[] }[];
};

type categoryValue = "play" | "like" | "comment" | "share";

const Dashboard = ({
  board,
  graphSettingsComponent,
  statistics,
  interestNetwork,
  tagRelationNetwork,
  hashtags,
}: Props) => {
  const { category, setCategory } = useCategoryStore();
  const [node, setNode] = useState<any>(null);
  const graphDate = useGraphDateStore();
  const [tagNode, setTagNode] = useState<any>(null);
  const handleCategory = (value: categoryValue) => {
    setCategory(value);
  };
  return (
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
          value={statistics?.count.like || 0}
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
          <AreaChart2
            data={statistics?.weekly || []}
            dataKey={category}
            label="Comments"
            labelKey="date"
          />
        </span>
      </div>
      <div className="card p-0 block">
        <h5 className="p-2">Monthly</h5>
        <span className="h-32">
          <AreaChart2
            data={statistics?.monthly || []}
            dataKey={category}
            label="Comments"
            labelKey="date"
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
      {board ? <div className="col-span-full">{board}</div> : null}
      <div className="col-span-full">{graphSettingsComponent}</div>
      <div className="card flex flex-col col-span-full gap-3 relative">
        <div className="flex flex-row">
          <div className="relative   w-full h-80">
            <h5 className="absolute top-0 left-0">Interest Network</h5>
            {interestNetwork ? (
              <>
                <VisGraph
                  data={interestNetwork}
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
                <button
                  onClick={() =>
                    interestNetExport(
                      graphDate.from!,
                      graphDate.to!,
                      interestNetwork as any
                    )
                  }
                  className="absolute top-2 right-2 border border-slate-200 hover:border-slate-200 text-sm"
                >
                  Export (.gdf)
                </button>
              </>
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
                      <HorizontalBarChart2
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
      <div className="card flex flex-col col-span-full h-80 relative">
        <h5 className="absolute top-2 left-2 bg-white">Hashtag Map</h5>
        {tagRelationNetwork ? (
          <>
            <VisGraph
              type="tagRelation"
              data={tagRelationNetwork}
              events={{
                click: (event) => {
                  const nodes = new DataSet(tagRelationNetwork.nodes as any);
                  const node = nodes.get(event.nodes[0]);
                  if (node && !Array.isArray(node)) {
                    setTagNode(node);
                  } else {
                    setTagNode(null);
                  }
                },
              }}
            />
            <button
              onClick={() =>
                tagRelationExport(
                  graphDate.from!,
                  graphDate.to!,
                  interestNetwork as any
                )
              }
              className="absolute top-2 right-2 border border-slate-200 hover:border-slate-200 text-sm"
            >
              Export (.gdf)
            </button>
          </>
        ) : null}
        {tagNode ? (
          <div className="absolute p-2 h-4/5 w-fit backdrop-blur-md border rounded-md shadow-md bottom-0 left-0 m-2">
            <TagInformation tagNode={tagNode} />
          </div>
        ) : null}
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
      <span className="text-lg font-semibold">{abbreviateNumber(value)}</span>
    </button>
  );
};

export default Dashboard;
