"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import CreateDialog from "./components/createdialog";
import EditDialog from "./components/editdialog";
import { useYoutubeProjects } from "@/hooks/useYoutubeProjects";
import { useSession } from "next-auth/react";
import Datatable from "@/components/Datatable";
import { useState } from "react";
import Link from "next/link";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const YoutubeProjects = () => {
  const [selected, setSelected] = useState<YoutubeProject | undefined>();
  const { data: session } = useSession();
  const projects = useYoutubeProjects();
  return (
    <div className="flex flex-col gap-3">
      <Dialog>
        <DialogTrigger
          disabled={session?.user.role === "USER"}
          className={cn(buttonVariants(), "self-end")}
        >
          Create New
        </DialogTrigger>
        <CreateDialog />
      </Dialog>
      <div className="card dark:bg-slate-600 rounded-md shadow-md">
        <Dialog onOpenChange={(open) => !open && setSelected(undefined)}>
          <Datatable
            columns={columns(session?.user.role === "USER", setSelected)}
            data={projects.data?.projects || []}
          />
          {selected && <EditDialog item={selected} />}
        </Dialog>
      </div>
    </div>
  );
};

type ColumnProps = (
  isDisabled: boolean,
  setSelected: React.Dispatch<React.SetStateAction<YoutubeProject | undefined>>
) => ColumnDef<YoutubeProject>[];

const columns: ColumnProps = (isDisabled, setSelected) => {
  return [
    {
      accessorKey: "projectName",
      header: "Project Name",
      cell(props) {
        return (
          <Link
            className={badgeVariants()}
            href={`/youtube-projects/${props.row.original.projectID}`}
          >
            {props.row.original.projectName}
          </Link>
        );
      },
    },
    {
      accessorKey: "keywords",
      header: "Keywords",
    },
    {
      accessorKey: "numChannels",
      header: "Number of Channels",
    },
    {
      accessorKey: "numVideos",
      header: "Number of Videos",
    },
    {
      accessorKey: "lastTracking",
      header: "Last Tracking",
      cell({ row }) {
        return (
          <span>
            {new Date(row.original.lastTracking).toLocaleDateString()}
          </span>
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
        setSelected(row.original);
        return (
          <DialogTrigger
            disabled={isDisabled}
            onClick={(event) => {
              setSelected(row.original);
              event.stopPropagation();
            }}
            className={buttonVariants({ size: "sm", variant: "outline" })}
          >
            Edit
          </DialogTrigger>
        );
      },
    },
  ];
};

export default YoutubeProjects;
