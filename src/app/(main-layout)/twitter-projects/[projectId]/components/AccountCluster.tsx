"use client";

import useClusterStore from "../store/cluster-store";
import * as Tabs from "@radix-ui/react-tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import abbreviateNumber from "@/utils/abbreviateNumber";
import { Separator } from "@/components/ui/separator";
import {
  DiscreteLegend,
  DiscreteLegendEntry,
  LinearGauge,
  LinearGaugeSeries,
} from "reaviz";
import chroma from "chroma-js";
import { Frown, Meh, Smile } from "lucide-react";
import ReactMarkdown from "react-markdown";
import useTwitterAccountNet from "@/hooks/useTwitterAccountNet";
import useTwitterAccountClusterInfo, {
  ClusterInfo,
} from "@/hooks/useTwitterAccountClusterInfo";
import Datatable from "@/components/Datatable";
import { ColumnDef } from "@tanstack/react-table";
import HorizontalBarChart from "@/components/HorizontalBarChart";
import useAccountStore from "../store/account-config-store";

const colorScheme = chroma.scale(["#f87171", "#4ade80"]).colors(3);
const scale = [
  {
    type: "Negative",
    icon: <Frown />,
  },
  {
    type: "Neutral",
    icon: <Meh />,
  },
  {
    type: "Positive",
    icon: <Smile />,
  },
];

const AccountCluster = ({ projectId }: { projectId: string }) => {
  const { account, setAccount } = useClusterStore();
  const { date } = useAccountStore();
  const { data } = useTwitterAccountNet({
    projectId,
    Window: 3,
    date,
  });
  const clusterInfo = useTwitterAccountClusterInfo({
    cluster: account,
    date,
    projectId,
    window: 3,
  });

  return (
    <Tabs.Root className="space-y-4" value={account} onValueChange={setAccount}>
      <ScrollArea className="w-full overflow-x-auto ">
        <Tabs.TabsList className="flex flex-row w-full bg-gray-300 rounded-md p-2 gap-2">
          {data?.normalized.classes
            .filter((item) => !!item.representation)
            .map((item, index) => (
              <Tabs.TabsTrigger
                key={index}
                value={item.id}
                className={
                  "p-2 w-10 h-10w-10 rounded-md data-[state=active]:opacity-35 data-[state=active]:shadow-md transition-all duration-300"
                }
                style={{
                  backgroundColor: item.color,
                }}
              />
            ))}
        </Tabs.TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {data?.normalized.classes.map((item, index) => (
        <Tabs.TabsContent
          key={index}
          value={item.id}
          className="w-full grid grid-cols-12 gap-4"
        >
          <div className="grid grid-cols-12 gap-4 col-span-full lg:col-span-8">
            <Card className="col-span-6">
              <CardHeader className="p-4">
                <CardTitle className="text-base">Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row justify-evenly">
                  <div className="flex flex-col items-center">
                    {abbreviateNumber(item.total_views)}
                    <p className="text-sm">Views</p>
                  </div>
                  <Separator orientation="vertical" className="h-11" />
                  <div className="flex flex-col items-center">
                    {abbreviateNumber(item.total_favorites)}
                    <p className="text-sm">Likes</p>
                  </div>
                  <Separator orientation="vertical" className="h-11" />
                  <div className="flex flex-col items-center">
                    {abbreviateNumber(item.total_retweets)}
                    <p className="text-sm">Retweets</p>
                  </div>
                  <Separator orientation="vertical" className="h-11" />
                  <div className="flex flex-col items-center">
                    {abbreviateNumber(item.total_replies)}
                    <p className="text-sm">Replies</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-6">
              <CardHeader className="p-4">
                <CardTitle className="text-base">Tone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="col-span-full">
                  <LinearGauge
                    series={<LinearGaugeSeries colorScheme={colorScheme} />}
                    data={[
                      { key: "Negative", data: item.tone_negative * 100 },
                      { key: "Neutral", data: item.tone_neutral * 100 },
                      { key: "Positive", data: item.tone_positive * 100 },
                    ]}
                    height={30}
                    className="w-full"
                  />
                  <DiscreteLegend
                    orientation="horizontal"
                    entries={scale.map((v, i) => (
                      <DiscreteLegendEntry
                        key={index}
                        style={{
                          padding: "0 3px",
                        }}
                        symbol={v.icon}
                        label={`${v.type}`}
                        color={colorScheme[i]}
                        orientation="horizontal"
                      />
                    ))}
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-6 lg:col-span-4">
              <CardHeader className="p-4">
                <CardTitle className="text-base">Representation</CardTitle>
                <CardDescription>{item.representation}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="col-span-6 lg:col-span-8">
              <CardHeader className="p-4">
                <CardTitle className="text-base">Summary</CardTitle>
                <CardDescription>{item.summary}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="col-span-full">
              <CardHeader className="p-4">
                <CardTitle className="text-base">Topics</CardTitle>
                <CardDescription>
                  <ReactMarkdown>{item.topics}</ReactMarkdown>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="col-span-full lg:col-span-4 grid grid-cols-12 gap-4">
            <Card className="col-span-full">
              <CardHeader className="p-4">
                <CardTitle className="text-base">
                  Top Replied Accounts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <Datatable
                    pagination={false}
                    columns={columns}
                    data={clusterInfo.data?.data.authors || []}
                    initialPageSize={10}
                  />
                </ScrollArea>
              </CardContent>
            </Card>
            <div className="col-span-full h-96">
              <HorizontalBarChart
                data={clusterInfo.data?.normalized || []}
                dataKey="value"
                labelKey="hashtag"
                label="Value"
                hidelabel={false}
              />
            </div>
          </div>
        </Tabs.TabsContent>
      ))}
    </Tabs.Root>
  );
};

const columns: ColumnDef<ClusterInfo["authors"][0]>[] = [
  {
    accessorKey: "user_screen_name",
    header: "Author",
  },
  {
    accessorKey: "reply_count",
    header: "Replies",
    cell(props) {
      return abbreviateNumber(props.row.original.reply_count);
    },
  },
];

export default AccountCluster;
