"use client";

import { GetInterestGraphs } from "@/api/tiktokApi";
import Datatable from "@/components/Datatable";
import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
import { badgeVariants } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import useTiktokInterestNet2 from "@/hooks/useTiktokInterestNet2";
import abbreviateNumber from "@/utils/abbreviateNumber";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React from "react";

const TopCentrality = ({ projectId }: { projectId: string }) => {
  const { data } = useTiktokInterestNet2({
    projectId,
    window: 3,
  });
  if (!data) return null;
  return (
    <ScrollArea className="h-80">
      <Datatable
        data={data?.normalized.network.nodes
          .sort((a, b) => b.data.centrality - a.data.centrality)
          .slice(0, 10)
          .map((item) => ({
            ...item.data,
          }))}
        columns={columns}
        pagination={false}
        initialPageSize={10}
      />
    </ScrollArea>
  );
};

const columns: ColumnDef<
  GetInterestGraphs["normalized"]["network"]["nodes"][0]["data"]
>[] = [
  {
    accessorKey: "author_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account" />
    ),
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
    accessorKey: "play",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Views" />
    ),
    cell(props) {
      return abbreviateNumber(props.row.original.play);
    },
  },
];

export default TopCentrality;
