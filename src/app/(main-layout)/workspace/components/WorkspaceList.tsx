"use client";
import { ColumnDef } from "@tanstack/react-table";
import Datatable from "@/components/datatable/Datatable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useWorkspaces, {
  TWorkspace,
} from "@/hooks/features/workspace/useWorkspaces";
import dateFormatter from "@/utils/dateFormatter";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const WorkspaceList = () => {
  const { data } = useWorkspaces();
  return (
    <div>
      <Accordion type="single" collapsible>
        {data?.map((workspace) => (
          <AccordionItem value={workspace.id} key={workspace.id}>
            <AccordionTrigger>{workspace.name}</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="flex flex-row justify-between gap-4">
                <h3>{workspace.description}</h3>
                <Link
                  href={`/workspace/${workspace.id}`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Open
                </Link>
              </div>
              <Datatable columns={columns} data={workspace.users} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

const columns: ColumnDef<TWorkspace["0"]["users"]["0"]>[] = [
  {
    accessorKey: "displayName",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Added Date",
    cell(props) {
      return dateFormatter("DMY", new Date(props.row.original.createdAt));
    },
  },
];

export default WorkspaceList;
