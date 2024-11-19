"use client";

import Datatable from "@/components/Datatable";
import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import useTwitterAccountNetwork, {
  AccountNetwork,
} from "@/hooks/useTwitterAccountNetwork";
import abbreviateNumber from "@/utils/abbreviateNumber";
import { ColumnDef } from "@tanstack/react-table";

const TopAccount = ({ projectId }: { projectId: string }) => {
  const { data } = useTwitterAccountNetwork({
    project: projectId,
    window: "1",
  });
  return (
    <ScrollArea className="w-full h-[500px]">
      {data && (
        <Datatable
          columns={columns}
          data={data.data.network.nodes
            .sort((a, b) => b.centrality - a.centrality)
            .slice(0, 20)}
        />
      )}
    </ScrollArea>
  );
};

const columns: ColumnDef<AccountNetwork["network"]["nodes"][0]>[] = [
  {
    accessorKey: "user_screen_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account" />
    ),
  },
  {
    accessorKey: "user_description",
    header: "Description",
  },
  {
    accessorKey: "num_followers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Followers" />
    ),
    cell: ({ row }) => abbreviateNumber(row.original.num_followers),
  },
];

export default TopAccount;
