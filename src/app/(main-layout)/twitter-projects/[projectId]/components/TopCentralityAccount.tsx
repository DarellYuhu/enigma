"use client";

import Datatable from "@/components/Datatable";
import { ScrollArea } from "@/components/ui/scroll-area";
import useTwitterAccountNet, {
  AccountNetwork,
} from "@/hooks/useTwitterAccountNet";
import { ColumnDef } from "@tanstack/react-table";
import abbreviateNumber from "@/utils/abbreviateNumber";
import SingleSelect from "@/components/SingleSelect";
import { useState } from "react";
import useAccountStore from "../store/account-config-store";
import dateFormatter from "@/utils/dateFormatter";

const TopCentralityAccount = ({ projectId }: { projectId: string }) => {
  const [type, setType] =
    useState<
      keyof Pick<
        AccountNetwork["network"]["nodes"][0],
        "centrality_bw" | "centrality_dg" | "centrality_pr"
      >
    >("centrality_pr");
  const { date } = useAccountStore();
  const { data } = useTwitterAccountNet({
    projectId,
    Window: 1,
    date: date ? dateFormatter("ISO", date) : "",
  });

  return (
    <>
      <ScrollArea className="h-[400px]">
        <Datatable
          data={
            data?.normalized.network.nodes
              .sort((a, b) => b.data[type] - a.data[type])
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
      <div className="absolute top-4 right-4">
        <SingleSelect
          selections={selections}
          value={type}
          setValue={(value) => setType(value as typeof type)}
          placeholder="Select a type"
        />
      </div>
    </>
  );
};

const selections = [
  {
    label: "PageRank",
    value: "centrality_pr",
  },
  {
    label: "Betweenness",
    value: "centrality_bw",
  },
  {
    label: "Degree",
    value: "centrality_dg",
  },
];

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
