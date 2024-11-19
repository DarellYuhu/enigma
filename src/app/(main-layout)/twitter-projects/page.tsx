"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import CreateNewDialog from "./components/CreateNewDialog";
import useTwitterProjects, {
  TTwitterProjects,
} from "@/hooks/useTwitterProjects";
import EditDialog from "./components/EditDialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Datatable from "@/components/Datatable";
import { badgeVariants } from "@/components/ui/badge";
import Link from "next/link";
import { useState } from "react";

const TwitterProjects = () => {
  const [selected, setSelected] = useState<
    TTwitterProjects["projects"][0] | undefined
  >();
  const { data: session } = useSession();
  const projects = useTwitterProjects();
  return (
    <div className="flex flex-col gap-3">
      <Dialog>
        <DialogTrigger
          disabled={session?.user.role === "USER"}
          className={cn(buttonVariants(), "self-end")}
        >
          Create New
        </DialogTrigger>
        <CreateNewDialog />
      </Dialog>
      <div className="card dark:bg-slate-600 rounded-md shadow-md">
        <Dialog onOpenChange={(open) => !open && setSelected(undefined)}>
          <Datatable
            columns={columns(session?.user.role === "USER", setSelected)}
            data={projects.data?.projects || []}
          />
          <EditDialog projectId={selected?.projectId} />
        </Dialog>
      </div>
    </div>
  );
};

type ColumnProps = (
  isDisabled: boolean,
  setSelected: React.Dispatch<
    React.SetStateAction<TTwitterProjects["projects"][0] | undefined>
  >
) => ColumnDef<TTwitterProjects["projects"][0]>[];

const columns: ColumnProps = (isDisabled, setSelected) => {
  return [
    {
      accessorKey: "projectName",
      header: "Project Name",
      cell(props) {
        return (
          <Link
            className={badgeVariants({ variant: "default" })}
            href={`/twitter-projects/${props.row.original.projectId}`}
          >
            {props.row.original.projectName}
          </Link>
        );
      },
    },
    {
      accessorKey: "numTweets",
      header: "Number of Tweets",
    },
    {
      accessorKey: "created",
      header: "Created At",
      cell({ row }) {
        return (
          <span>{new Date(row.original.created).toLocaleDateString()}</span>
        );
      },
    },
    {
      accessorKey: "lastUpdate",
      header: "Updated At",
      cell({ row }) {
        return (
          <span>{new Date(row.original.lastUpdate).toLocaleDateString()}</span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <DialogTrigger
            className={buttonVariants({ size: "sm", variant: "outline" })}
            onClick={(event) => {
              setSelected(row.original);
              event.stopPropagation();
            }}
            disabled={isDisabled}
          >
            Edit
          </DialogTrigger>
        );
      },
    },
  ];
};

export default TwitterProjects;
