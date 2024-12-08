// import {
//   Frown,
//   Heart,
//   Meh,
//   MessageSquareMore,
//   MonitorPlay,
//   Share2,
//   Smile,
// } from "lucide-react";
// import { ReactNode, useState } from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import Link from "next/link";
// import TagInformation from "@/components/TagInformation";
// import useCategoryStore from "@/store/category-store";
// import abbreviateNumber from "@/utils/abbreviateNumber";
// import tagRelationExport from "@/utils/tagRelationExport";
// import useGraphDateStore from "@/store/graph-date-store";
// import HorizontalBarChart2 from "@/components/HorizontalBarChart2";
// import AreaChart2 from "@/components/charts/AreaChart2";
// import Graph, { CosmosLink, CosmosNode } from "@/components/Graph";
// import { CosmographData } from "@cosmograph/react";
// import BarChart2 from "@/components/charts/BarChart2";
// import ReavizPie from "@/components/ReavizPie";
// import * as Tabs from "@radix-ui/react-tabs";
// import {
//   DiscreteLegend,
//   DiscreteLegendEntry,
//   LinearGauge,
//   LinearGaugeSeries,
// } from "reaviz";
// import chroma from "chroma-js";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import ReactMarkdown from "react-markdown";
// import { Separator } from "@/components/ui/separator";
// import Datatable from "@/components/datatable/Datatable";
// import { ColumnDef } from "@tanstack/react-table";
// import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
// import { badgeVariants } from "@/components/ui/badge";
// import { GetTrendsReturn } from "@/hooks/useTiktokTrends";
// import { GetInterestGraphs } from "@/hooks/useTiktokInterestNet2";
// // import interestNetExport from "@/utils/interestNetExport";

// const colorScheme = chroma.scale(["#f87171", "#4ade80"]).colors(3);

// type Props = {
//   board?: React.ReactNode;
//   graphSettingsComponent: React.ReactNode;
//   statistics?: GetTrendsReturn;
//   interestNetwork?: CosmographData<CosmosNode, CosmosLink>;
//   interestNetwork2?: GetInterestGraphs;
//   tagRelationNetwork?: {
//     data: TagRelationNetwork;
//     normalized: CosmographData<CosmosNode, CosmosLink>;
//   };
//   hashtags?: { color: string; data: { hashtag: string; value: number }[] }[];
// };

// type categoryValue = "play" | "like" | "comment" | "share";

// const Dashboard = ({
//   board,
//   graphSettingsComponent,
//   statistics,
//   interestNetwork,
//   tagRelationNetwork,
//   interestNetwork2,
//   hashtags,
// }: Props) => {
//   const { category, setCategory } = useCategoryStore();
//   const [node, setNode] = useState<any>(null);
//   const graphDate = useGraphDateStore();
//   const [tagNode, setTagNode] = useState<any>(null);
//   const handleCategory = (value: categoryValue) => {
//     setCategory(value);
//   };
//   return (
//     <div className="grid grid-cols-4 gap-3 text-slate-800 dark:text-slate-300">
//       <div className="col-span-full md:col-span-2 grid grid-cols-2 gap-3">
//         <CategoryButton
//           categoryState={category}
//           label="Play"
//           value={statistics?.count.play || 0}
//           icon={<MonitorPlay width={20} height={20} />}
//           category={"play"}
//           handleCategory={handleCategory}
//         />
//         <CategoryButton
//           categoryState={category}
//           label="Like"
//           value={statistics?.count.like || 0}
//           icon={<Heart width={20} height={20} />}
//           category={"like"}
//           handleCategory={handleCategory}
//         />
//         <CategoryButton
//           categoryState={category}
//           label="Comment"
//           value={statistics?.count.comment || 0}
//           icon={<MessageSquareMore width={20} height={20} />}
//           category={"comment"}
//           handleCategory={handleCategory}
//         />
//         <CategoryButton
//           categoryState={category}
//           label="Share"
//           value={statistics?.count.share || 0}
//           icon={<Share2 width={20} height={20} />}
//           category={"share"}
//           handleCategory={handleCategory}
//         />
//       </div>
//       <div className="card col-span-2 md:col-span-1 p-0 block">
//         <span className="h-32">
//           <h5 className="p-2">Weekly</h5>
//           <AreaChart2
//             data={statistics?.weekly || []}
//             dataKey={category}
//             label="Comments"
//             labelKey="date"
//           />
//         </span>
//       </div>
//       <div className="card col-span-2 md:col-span-1 p-0 block">
//         <h5 className="p-2">Monthly</h5>
//         <span className="h-32">
//           <AreaChart2
//             data={statistics?.monthly || []}
//             dataKey={category}
//             label="Comments"
//             labelKey="date"
//           />
//         </span>
//       </div>
//       <div className="col-span-full grid col grid-cols-8 gap-3">
//         <div className="card flex flex-col col-span-full md:col-span-3">
//           <h5>Top Creators</h5>
//           <div className="flex flex-1">
//             {/* <CustomPieChart
//               data={statistics?.topUsers[category] || []}
//               dataKey="value"
//               labelKey="user"
//             /> */}
//             <ReavizPie
//               data={
//                 statistics?.topUsers[category].map((item) => ({
//                   key: item.user,
//                   data: item.value,
//                 })) || []
//               }
//             />
//           </div>
//         </div>
//         <div className="card flex flex-col col-span-full md:col-span-5 h-[340px]">
//           <h5>Daily</h5>
//           <div className="flex flex-1">
//             {/* <CustomBarChart
//               data={statistics?.daily || []}
//               labelKey={category}
//               dataKey="date"
//             /> */}
//             <BarChart2
//               data={statistics?.daily || []}
//               labelKey={"date"}
//               dataKey={category}
//               label={category}
//               topLabel={false}
//               brush
//               fill="rgba(16,185,129,1)"
//             />
//           </div>
//         </div>
//       </div>
//       {board ? <div className="col-span-full card">{board}</div> : null}
//       <div className="card flex flex-col col-span-full h-80 relative">
//         <h5 className="absolute top-2 left-2 bg-white z-10">Hashtag Map</h5>
//         {tagRelationNetwork ? (
//           <>
//             {/* <VisGraph
//               type="tagRelation"
//               data={tagRelationNetwork}
//               events={{
//                 click: (event) => {
//                   const nodes = new DataSet(tagRelationNetwork.nodes as any);
//                   const node = nodes.get(event.nodes[0]);
//                   if (node && !Array.isArray(node)) {
//                     setTagNode(node);
//                   } else {
//                     setTagNode(null);
//                   }
//                 },
//               }}
//             /> */}
//             <Graph
//               linkVisibilityDistanceRange={[50, 150]}
//               simulationGravity={0.0}
//               simulationRepulsion={1}
//               simulationLinkSpring={0.4}
//               data={tagRelationNetwork.normalized}
//               onClick={(node) => {
//                 if (node) {
//                   setTagNode(node.data);
//                 } else {
//                   setTagNode(null);
//                 }
//               }}
//             />
//             <button
//               onClick={() =>
//                 tagRelationExport(
//                   graphDate.from!,
//                   graphDate.to!,
//                   tagRelationNetwork.data.relation
//                 )
//               }
//               className="absolute top-2 right-2 border border-slate-200 hover:border-slate-200 text-sm bg-white"
//             >
//               Export (.gdf)
//             </button>
//           </>
//         ) : null}
//         {tagNode ? (
//           <div className="absolute p-2 h-4/5 w-fit backdrop-blur-md border rounded-md shadow-md bottom-0 left-0 m-2">
//             <TagInformation tagNode={tagNode} />
//           </div>
//         ) : null}
//       </div>
//       <div className="col-span-full">{graphSettingsComponent}</div>
//       <div
//         className={`card flex flex-row col-span-3 gap-3 relative flex-wrap md:flex-nowrap`}
//       >
//         <div className="relative w-full flex-1 h-80">
//           <h5 className="absolute top-0 left-0 z-10 bg-white">
//             Interest Network
//           </h5>
//           {interestNetwork2 || interestNetwork ? (
//             <>
//               <Graph
//                 data={
//                   interestNetwork2?.normalized.network ||
//                   interestNetwork ||
//                   ([] as any)
//                 }
//                 onClick={(node) => {
//                   if (node) {
//                     setNode(node.data);
//                   } else {
//                     setNode(null);
//                   }
//                 }}
//               />
//               {/* <button
//               onClick={() =>
//                 interestNetExport(
//                   graphDate.from!,
//                   graphDate.to!,
//                   interestNetwork2?.data.network
//                 )
//               }
//               className="absolute top-2 right-2 border border-slate-200 hover:border-slate-200 text-sm bg-white"
//             >
//               Export (.gdf)
//             </button> */}
//             </>
//           ) : null}
//           {node ? (
//             <div className="absolute bottom-0 left-0 h-3/5 w-64 flex flex-col gap-2 border rounded-md p-2 shadow-lg backdrop-blur-md">
//               <h6 className="text-wrap">{node.author_name}</h6>
//               <Link
//                 target="_blank"
//                 href={`https://www.tiktok.com/@${node.author_name}/video/${node.id}`}
//                 className="bg-green-300 hover:bg-green-400 rounded-md p-1.5 text-sm text-center justify-center items-center"
//               >
//                 View Video
//               </Link>
//               <span className="text-xs overflow-y-auto">{node.desc}</span>
//             </div>
//           ) : null}
//         </div>
//       </div>

//       {interestNetwork2 ? (
//         <div className="card col-span-1">
//           <ScrollArea className="h-80">
//             <Card className="col-span-full">
//               <CardHeader className="p-2">
//                 <CardTitle className="text-base">
//                   Top Central Contents
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-0">
//                 <Datatable
//                   data={interestNetwork2.normalized.network.nodes
//                     .sort((a, b) => b.data.centrality - a.data.centrality)
//                     .slice(0, 10)
//                     .map((item) => ({
//                       ...item.data,
//                     }))}
//                   columns={columns}
//                 />
//               </CardContent>
//             </Card>
//           </ScrollArea>
//         </div>
//       ) : (
//         <div className="card col-span-1 w-full bg-slate-100 rounded-md">
//           <Carousel>
//             <CarouselContent>
//               {hashtags?.map((item, index) => (
//                 <CarouselItem key={index}>
//                   <div className="h-80 w-full px-7">
//                     <HorizontalBarChart2
//                       data={item.data}
//                       labelKey="hashtag"
//                       dataKey="value"
//                       color={item.color}
//                     />
//                   </div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="absolute left-0" />
//             <CarouselNext className="absolute right-0" />
//           </Carousel>
//         </div>
//       )}

//       <div className="card col-span-full">
//         <Tabs.Root className="space-y-4" defaultValue="0">
//           <ScrollArea className="w-full overflow-x-auto ">
//             <Tabs.TabsList className="flex flex-row w-full bg-gray-300 rounded-md p-2 gap-2">
//               {interestNetwork2?.normalized.hashtags.map((item, index) => (
//                 <Tabs.TabsTrigger
//                   key={index}
//                   value={index.toString()}
//                   className={
//                     "p-2 w-10 h-10w-10 rounded-md data-[state=active]:opacity-35 data-[state=active]:shadow-md transition-all duration-300"
//                   }
//                   style={{
//                     backgroundColor: item.color,
//                   }}
//                 />
//               ))}
//             </Tabs.TabsList>
//             <ScrollBar orientation="horizontal" />
//           </ScrollArea>
//           {interestNetwork2?.normalized.hashtags.map((item, index) => (
//             <Tabs.TabsContent
//               key={index}
//               value={index.toString()}
//               className="w-full grid grid-cols-12 gap-4"
//             >
//               <div className="grid grid-cols-12 gap-4 col-span-8">
//                 <Card className="col-span-4">
//                   <CardHeader className="p-4">
//                     <CardTitle className="text-base">Representation</CardTitle>
//                     <CardDescription>{item.representation}</CardDescription>
//                   </CardHeader>
//                 </Card>
//                 <Card className="col-span-8">
//                   <CardHeader className="p-4">
//                     <CardTitle className="text-base">Summary</CardTitle>
//                     <CardDescription>{item.summary}</CardDescription>
//                   </CardHeader>
//                 </Card>
//                 <Card className="col-span-full">
//                   <CardHeader className="p-4">
//                     <CardTitle className="text-base">Topics</CardTitle>
//                     <CardDescription>
//                       <ReactMarkdown>{item.topics}</ReactMarkdown>
//                     </CardDescription>
//                   </CardHeader>
//                 </Card>
//               </div>
//               <div className="col-span-4 grid grid-cols-12 gap-4">
//                 <Card className="col-span-full">
//                   <CardHeader className="p-4">
//                     <CardTitle className="text-base">Metrics</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex flex-row justify-evenly">
//                       <div className="flex flex-col items-center">
//                         {abbreviateNumber(item.total_views)}
//                         <p className="text-sm">Views</p>
//                       </div>
//                       <Separator orientation="vertical" className="h-11" />
//                       <div className="flex flex-col items-center">
//                         {abbreviateNumber(item.total_likes)}
//                         <p className="text-sm">Likes</p>
//                       </div>
//                       <Separator orientation="vertical" className="h-11" />
//                       <div className="flex flex-col items-center">
//                         {abbreviateNumber(item.total_comments)}
//                         <p className="text-sm">Comments</p>
//                       </div>
//                       <Separator orientation="vertical" className="h-11" />
//                       <div className="flex flex-col items-center">
//                         {abbreviateNumber(item.total_shares)}
//                         <p className="text-sm">Shares</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <Card className="col-span-full">
//                   <CardHeader className="p-4">
//                     <CardTitle className="text-base">Tone</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="col-span-full">
//                       <LinearGauge
//                         series={<LinearGaugeSeries colorScheme={colorScheme} />}
//                         data={[
//                           { key: "Negative", data: item.tone_negative * 100 },
//                           { key: "Neutral", data: item.tone_neutral * 100 },
//                           { key: "Positive", data: item.tone_positive * 100 },
//                         ]}
//                         width={300}
//                         height={30}
//                       />
//                       <DiscreteLegend
//                         orientation="horizontal"
//                         entries={scale.map((v, i) => (
//                           <DiscreteLegendEntry
//                             key={index}
//                             style={{
//                               padding: "0 3px",
//                             }}
//                             symbol={v.icon}
//                             label={`${v.type}`}
//                             color={colorScheme[i]}
//                             orientation="horizontal"
//                           />
//                         ))}
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <div className="col-span-full h-96">
//                   {
//                     <HorizontalBarChart2
//                       data={item.hashtags!}
//                       labelKey="hashtag"
//                       dataKey="value"
//                       color={item.color}
//                     />
//                   }
//                 </div>
//               </div>
//             </Tabs.TabsContent>
//           ))}
//         </Tabs.Root>
//       </div>
//     </div>
//   );
// };

// const CategoryButton = ({
//   category,
//   categoryState,
//   handleCategory,
//   label,
//   value,
//   icon,
// }: {
//   categoryState: categoryValue;
//   category: categoryValue;
//   handleCategory: (value: categoryValue) => void;
//   label: string;
//   value: number;
//   icon: ReactNode;
// }) => {
//   return (
//     <button
//       className={`card border-[1px] flex flex-col items-start gap-4 transition-all duration-500 ease-in-out ${
//         category === categoryState
//           ? "border-sky-500"
//           : "border-white dark:border-slate-800"
//       }`}
//       onClick={() => handleCategory(category)}
//     >
//       <h5 className="flex flex-row gap-2 items-center">
//         {icon} {label}
//       </h5>
//       <span className="text-lg font-semibold">{abbreviateNumber(value)}</span>
//     </button>
//   );
// };

// const columns: ColumnDef<
//   GetInterestGraphs["normalized"]["network"]["nodes"][0]["data"]
// >[] = [
//   {
//     accessorKey: "author_name",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Account" />
//     ),
//     cell(props) {
//       return (
//         <Link
//           className={badgeVariants({ variant: "outline" })}
//           href={`https://www.tiktok.com/@${props.row.original.author_name}/video/${props.row.original.id}`}
//           target="_blank"
//         >
//           {props.row.original.author_name}
//         </Link>
//       );
//     },
//   },
//   {
//     accessorKey: "play",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Views" />
//     ),
//     cell(props) {
//       return abbreviateNumber(props.row.original.play);
//     },
//   },
// ];

// const scale = [
//   {
//     type: "Negative",
//     icon: <Frown />,
//   },
//   {
//     type: "Neutral",
//     icon: <Meh />,
//   },
//   {
//     type: "Positive",
//     icon: <Smile />,
//   },
// ];

// export default Dashboard;
