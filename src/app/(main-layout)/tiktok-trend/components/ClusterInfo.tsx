import Datatable from "@/components/datatable/Datatable";
import HorizontalBarChart from "@/components/charts/HorizontalBarChart";
import { badgeVariants } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useTiktokClusterInfo, {
  ClusterInfoData,
} from "@/hooks/features/tiktok/useTiktokClusterInfo";
import { ClusterTrends } from "@/hooks/features/tiktok/useTiktokGlobalClusters";
import { cn } from "@/lib/utils";
import abbreviateNumber from "@/utils/abbreviateNumber";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import dateFormatter from "@/utils/dateFormatter";
import { Skeleton } from "@/components/ui/skeleton";

const ClusterInfo = ({
  date,
  node,
}: {
  date?: string;
  node: ClusterTrends["network"]["nodes"]["0"] | null;
}) => {
  const { data, isPending } = useTiktokClusterInfo({
    cluster: node?.id,
    date: date && dateFormatter("ISO", new Date(date)),
    window: 7,
  });

  if (isPending)
    return (
      <div className="p-7 space-y-3">
        <Skeleton className="w-full h-40" />
        <div className="grid grid-cols-12 gap-3">
          <Skeleton className="col-span-4 h-80 w-full" />
          <Skeleton className="col-span-8 h-full w-full" />
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-12 gap-3 p-4">
      <Card className="col-span-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Metrics</CardTitle>
          <CardDescription
            className={cn(badgeVariants({ variant: "outline" }))}
          >
            {node?.label}
          </CardDescription>
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

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Hashtags</CardTitle>
        </CardHeader>
        <ScrollArea className="h-80 w-full">
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
        <ScrollArea className="h-80 w-full">
          <CardContent>
            <Datatable columns={columns} data={data?.data.videos || []} />
          </CardContent>
          <Scrollbar orientation="horizontal" />
          <Scrollbar orientation="vertical" />
        </ScrollArea>
      </Card>
    </div>
  );
};

const columns: ColumnDef<ClusterInfoData["videos"]["0"]>[] = [
  {
    accessorKey: "author_name",
    header: "Author",
    cell(props) {
      return (
        <Link
          className={badgeVariants({ variant: "outline" })}
          href={`https://www.tiktok.com/@${props.row.original.author_name}/video/${props.row.original.id}`}
          target="_blank"
        >
          {props.row.original.author_name}
        </Link>
      );
    },
  },
  {
    accessorKey: "desc",
    header: "Description",
    cell(props) {
      return (
        <span className="text-wrap break-all transition-all">
          {props.row.original.desc}
        </span>
      );
    },
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
