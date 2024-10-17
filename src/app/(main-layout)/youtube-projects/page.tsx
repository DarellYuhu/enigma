"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import CreateDialog from "./components/createdialog";
import { useQuery } from "@tanstack/react-query";
import getProjects from "@/api/youtube/getProjects";

const YoutubeProjects = () => {
  const projects = useQuery({
    queryKey: ["youtube", "projects"],
    queryFn: getProjects,
  });
  const table = useReactTable({
    columns,
    data: projects.data?.projects || [],
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="flex flex-col gap-3">
      <Dialog>
        <DialogTrigger className="bg-blue-500 dark:bg-green-500 shadow-md rounded-md p-2 text-white text-sm dark:hover:bg-green-600 hover:bg-blue-600 transition-all ease-in-out duration-200 self-end">
          Create New
        </DialogTrigger>
        <CreateDialog />
      </Dialog>
      <div className="bg-white dark:bg-slate-600 rounded-md shadow-md">
        <Dialog onOpenChange={(open) => !open && table.resetRowSelection()}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={
                        header.id === "actions"
                          ? "text-black dark:text-slate-300 text-nowrap font-semibold"
                          : "text-black dark:text-slate-300 text-nowrap font-semibold cursor-pointer hover:bg-slate-300"
                      }
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  //   onClick={() => handleNavigation(row.original.projectId)}
                  key={row.id}
                  className="dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex flex-1 justify-end p-4 gap-3">
            <button
              className="bg-blue-300 rounded-sm cursor-pointer hover:bg-blue-400 p-2"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft width={18} height={18} />
            </button>
            <button
              className="bg-blue-300 rounded-sm cursor-pointer hover:bg-blue-400 p-2"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight width={18} height={18} />
            </button>
          </div>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const columns: ColumnDef<YoutubeProject>[] = [
  {
    accessorKey: "projectName",
    header: "Project Name",
  },
  {
    accessorKey: "keywords",
    header: "Keywords",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell({ row }) {
      return (
        <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
      );
    },
  },
  {
    accessorKey: "firstVideo",
    header: "First Video",
    cell({ row }) {
      return (
        <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
      );
    },
  },
  {
    accessorKey: "lastTracking",
    header: "Last Tracking",
    cell({ row }) {
      return (
        <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

const dummyData: YoutubeProject[] = Array.from({ length: 13 }).map(
  (_, index) => ({
    projectID: index.toString(),
    projectName: `Project ${index}`,
    createdAt: new Date(),
    APIs: "APIs",
    keywords: "keywords",
    languageCode: "languageCode",
    regionCode: "regionCode",
    status: "status",
    firstVideo: new Date(),
    lastTracking: new Date(),
  })
);

export default YoutubeProjects;
