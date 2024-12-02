"use client";
import Datatable from "@/components/Datatable";
import useActorNetwork, {
  ActorNetwork,
} from "@/hooks/features/trends/useActorNetwork";
import useConfigStore from "../store/config-store";
import { ColumnDef } from "@tanstack/react-table";

const TopCentrality = ({ details }: { details: string }) => {
  const { category } = useConfigStore();
  const { data } = useActorNetwork({
    category,
    date: "",
    rid: details,
    window: 60,
  });
  if (!data) return null;
  return (
    <Datatable
      data={data.centrality}
      columns={columns}
      pagination={false}
      initialPageSize={10}
    />
  );
};

const columns: ColumnDef<ActorNetwork["network"]["nodes"][0]>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "centrality",
    header: "Centrality",
    cell(props) {
      return props.row.original.centrality.toFixed(3);
    },
  },
];

export default TopCentrality;
