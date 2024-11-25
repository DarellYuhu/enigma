"use client";

import Datatable from "@/components/Datatable";
import { ScrollArea } from "@/components/ui/scroll-area";
import useTwitterAccountNet, {
  AccountNetwork,
} from "@/hooks/useTwitterAccountNet";
import { ColumnDef } from "@tanstack/react-table";
import useBoardConfigStore from "../store/board-config-store";
import abbreviateNumber from "@/utils/abbreviateNumber";

const TopCentralityAccount = ({ projectId }: { projectId: string }) => {
  const { to } = useBoardConfigStore();
  const { data } = useTwitterAccountNet({
    projectId,
    Window: 3,
    date: to,
  });

  return (
    <ScrollArea className="h-[400px]">
      <Datatable
        data={
          data?.normalized.network.nodes
            .sort((a, b) => b.data.centrality_pr - a.data.centrality_pr)
            .slice(0, 10)
            .map((item) => ({
              ...item.data,
            })) || []
        }
        columns={columns}
        pagination={false}
        initialPageSize={10}
      />
    </ScrollArea>
  );
};

const columns: ColumnDef<AccountNetwork["network"]["nodes"][0]>[] = [
  {
    accessorKey: "user_screen_name",
    header: "Name",
  },
  {
    accessorKey: "num_followers",
    header: "Followers",
    cell(props) {
      return abbreviateNumber(props.row.original.num_followers);
    },
  },
];

export default TopCentralityAccount;
