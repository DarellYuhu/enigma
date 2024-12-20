"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import CreateNewDialog from "./components/CreateNewDialog";
import useTwitterProjects, {
  TTwitterProjects,
} from "@/hooks/features/twitter/useTwitterProjects";
import EditDialog from "./components/EditDialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Datatable from "@/components/datatable/Datatable";
import { badgeVariants } from "@/components/ui/badge";
import Link from "next/link";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TwitterProjects = () => {
  const [selected, setSelected] = useState<
    TTwitterProjects["projects"][0] | undefined
  >();
  const { data: session } = useSession();
  const { data, isPending } = useTwitterProjects();

  if (isPending)
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 w-40 place-self-end" />
        <div className="grid grid-cols-12 gap-3">
          {Array.from({ length: 24 }).map((_, index) => (
            <Skeleton className="h-6 w-full col-span-3" key={index} />
          ))}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-3">
      <Dialog>
        <DialogTrigger
          disabled={session?.user.role === "VIEWER"}
          className={cn(buttonVariants(), "self-end")}
        >
          Create New
        </DialogTrigger>
        <CreateNewDialog />
      </Dialog>
      <div className="card dark:bg-slate-600 rounded-md shadow-md">
        <Dialog onOpenChange={(open) => !open && setSelected(undefined)}>
          <Datatable
            columns={columns(session?.user.role === "VIEWER", setSelected)}
            data={data?.projects || []}
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
      header: "Number of Posts",
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
