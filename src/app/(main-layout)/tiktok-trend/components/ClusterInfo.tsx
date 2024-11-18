import Datatable from "@/components/Datatable";
import HorizontalBarChart from "@/components/HorizontalBarChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useTiktokClusterInfo, {
  ClusterInfoData,
} from "@/hooks/useTiktokClusterInfo";
import { ClusterTrends } from "@/hooks/useTiktokGlobalClusters";
import abbreviateNumber from "@/utils/abbreviateNumber";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

const ClusterInfo = ({
  date,
  node,
}: {
  date?: string;
  node: ClusterTrends["network"]["nodes"]["0"] | null;
}) => {
  const { data } = useTiktokClusterInfo({
    cluster: node?.class,
    date: new Date(date || ""),
    window: 7,
  });
  return (
    <div className="grid grid-cols-12 gap-3 p-4">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Hashtags</CardTitle>
        </CardHeader>
        <ScrollArea className="h-80 ">
          <CardContent>
            <div className="h-[800px] ">
              {data && (
                <HorizontalBarChart
                  data={data.chart}
                  dataKey="value"
                  labelKey="tag"
                  label="Hashtag"
                  hidelabel={false}
                />
              )}
            </div>
          </CardContent>
        </ScrollArea>
      </Card>

      <Card className="col-span-8">
        <CardHeader>
          <CardTitle>Content Boards</CardTitle>
        </CardHeader>
        <ScrollArea className="h-80 ">
          <CardContent>
            <Datatable columns={columns} data={data?.data.videos || []} />
          </CardContent>
        </ScrollArea>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          {node && (
            <div className="flex flex-row justify-evenly">
              <div className="flex flex-col items-center">
                {abbreviateNumber(node.total_views)}
                <p className="text-sm">Views</p>
              </div>
              <Separator orientation="vertical" className="h-11" />
              <div className="flex flex-col items-center">
                {abbreviateNumber(node.total_likes)}
                <p className="text-sm">Likes</p>
              </div>
              <Separator orientation="vertical" className="h-11" />
              <div className="flex flex-col items-center">
                {abbreviateNumber(node.total_comments)}
                <p className="text-sm">Comments</p>
              </div>
              <Separator orientation="vertical" className="h-11" />
              <div className="flex flex-col items-center">
                {abbreviateNumber(node.total_shares)}
                <p className="text-sm">Shares</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const columns: ColumnDef<ClusterInfoData["videos"]["0"]>[] = [
  {
    accessorKey: "author_name",
    header: "Author",
  },
  {
    accessorKey: "desc",
    header: "Description",
  },
  {
    accessorKey: "view",
    header: "Views",
    cell: ({ row }) => abbreviateNumber(row.original.view),
  },
  {
    accessorKey: "like",
    header: "Likes",
    cell: ({ row }) => abbreviateNumber(row.original.like),
  },
  {
    accessorKey: "comment",
    header: "Comments",
    cell: ({ row }) => abbreviateNumber(row.original.comment),
  },
  {
    accessorKey: "share",
    header: "Shares",
    cell: ({ row }) => abbreviateNumber(row.original.share),
  },
];

export default ClusterInfo;
