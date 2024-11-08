"use client";

import { TwitterBoardItem } from "@/api/twitterApi";
import Datatable from "@/components/Datatable";
import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
import useTwitterBoards from "@/hooks/useTwitterBoards";
import useStatisticDateStore from "@/store/statistic-date-store";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";

const Board = ({ projectId }: { projectId: string }) => {
  const [query, setQuery] = useState("");
  const { from, to } = useStatisticDateStore();
  const boards = useTwitterBoards({
    project: projectId,
    since: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    until: new Date(),
    string: "",
  });
  return (
    <div>
      <Datatable
        columns={column}
        data={boards.data?.top.bookmark_count || []}
      />
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
    accessorKey: "retweet_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Retweet Count" />
    ),
  },
  {
    accessorKey: "reply_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reply Count" />
    ),
  },
  {
    accessorKey: "favorite_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Favorite Count" />
    ),
  },
  {
    accessorKey: "bookmark_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bookmark Count" />
    ),
  },
];

export default Board;
