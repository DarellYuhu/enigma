"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
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
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CreateNewDialog from "./components/CreateNewDialog";
import useTwitterProjects from "@/hooks/useTwitterProjects";
import { TTwitterProjects } from "@/api/twitterApi";
import EditDialog from "./components/EditDialog";

const TwitterProjects = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const projects = useTwitterProjects();
  const table = useReactTable({
    columns: columns(session?.user.role === "USER"),
    data: projects.data?.projects || [],
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: false,
  });
  const handleNavigation = (projectId: string) => {
    router.push(`/twitter-projects/${projectId}`);
  };
  return (
    <div className="flex flex-col gap-3">
      <Dialog>
        <DialogTrigger
          disabled={session?.user.role === "USER"}
          className="bg-blue-500 dark:bg-green-500 shadow-md rounded-md p-2 text-white text-sm dark:hover:bg-green-600 hover:bg-blue-600 transition-all ease-in-out duration-200 self-end"
        >
          Create New
        </DialogTrigger>
        <CreateNewDialog />
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
                  onClick={() => handleNavigation(row.original.projectId)}
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
          <EditDialog
            projectId={table.getSelectedRowModel().rows[0]?.original.projectId}
          />
        </Dialog>
      </div>
    </div>
  );
};

const columns = (
  isDisabled: boolean
): ColumnDef<TTwitterProjects["projects"][0]>[] => {
  return [
    {
      accessorKey: "projectName",
      header: "Project Name",
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
            disabled={isDisabled}
            onClick={(event) => {
              row.toggleSelected();
              event.stopPropagation();
            }}
            className="border border-blue-300 rounded-sm cursor-pointer hover:bg-blue-300 p-2"
          >
            Edit
          </DialogTrigger>
        );
      },
    },
  ];
};

export default TwitterProjects;