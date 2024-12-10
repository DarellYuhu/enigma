"use client";

import Datatable from "@/components/datatable/Datatable";
import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
import useTwitterBoards, {
  TwitterBoardItem,
} from "@/hooks/features/twitter/useTwitterBoards";
import abbreviateNumber from "@/utils/abbreviateNumber";
import { ColumnDef } from "@tanstack/react-table";
import useBoardConfigStore from "../store/board-config-store";
import dateFormatter from "@/utils/dateFormatter";
import { Skeleton } from "@/components/ui/skeleton";

const Board = ({ projectId }: { projectId: string }) => {
  const { from, to, string } = useBoardConfigStore();
  const { data, isPending } = useTwitterBoards({
    project: projectId,
    since: from && dateFormatter("ISO", from),
    until: to && dateFormatter("ISO", to),
    string,
  });

  if (isPending)
    return (
      <div className="grid grid-cols-12 gap-3">
        {Array.from({ length: 24 }).map((_, index) => (
          <Skeleton className="w-full h-8 col-span-3" key={index} />
        ))}
      </div>
    );

  return (
    <div>
      <Datatable columns={column} data={data?.top.bookmark_count || []} />
    </div>
  );
};

const column: ColumnDef<TwitterBoardItem>[] = [
  {
    accessorKey: "user_screen_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Screen name" />
    ),
  },
  {
    accessorKey: "full_text",
    header: "Tweets",
  },
  {
    accessorKey: "view_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="View" />
    ),
    cell: ({ row }) => abbreviateNumber(row.original.view_count),
  },
  {
    accessorKey: "retweet_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Retweet" />
    ),
    cell: ({ row }) => abbreviateNumber(row.original.retweet_count),
  },
  {
    accessorKey: "reply_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reply" />
    ),
    cell: ({ row }) => abbreviateNumber(row.original.reply_count),
  },
  {
    accessorKey: "favorite_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Favorite" />
    ),
    cell: ({ row }) => abbreviateNumber(row.original.favorite_count),
  },
  {
    accessorKey: "bookmark_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bookmark" />
    ),
    cell: ({ row }) => abbreviateNumber(row.original.bookmark_count),
  },
];

export default Board;
