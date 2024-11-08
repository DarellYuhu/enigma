"use client";

import { AccountNetwork } from "@/api/twitterApi";
import Datatable from "@/components/Datatable";
import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
import useTwitterAccountNetwork from "@/hooks/useTwitterAccountNetwork";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

const TopAccount = ({ projectId }: { projectId: string }) => {
  const { data } = useTwitterAccountNetwork({
    project: projectId,
    window: "1",
  });
  return (
    <div className="w-full h-80 overflow-auto">
      {data && (
        <Datatable
          columns={columns}
          data={data.data.network.nodes
            .sort((a, b) => b.centrality - a.centrality)
            .slice(0, 10)}
        />
      )}
    </div>
  );
};

const columns: ColumnDef<AccountNetwork["network"]["nodes"][0]>[] = [
  {
    accessorKey: "user_screen_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Screen Name" />
    ),
  },
  {
    accessorKey: "user_description",
    header: "Description",
  },
  {
    accessorKey: "centrality",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Centrality" />
    ),
  },
  {
    accessorKey: "num_followers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number of Folowers" />
    ),
  },
];

export default TopAccount;
