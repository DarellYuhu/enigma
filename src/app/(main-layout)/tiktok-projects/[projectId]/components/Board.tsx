import getBoards from "@/api/tiktok/getBoards";
import getExportComments from "@/api/tiktok/getExportComments";
import useCategoryStore from "@/store/category-store";
import useStatisticDateStore from "@/store/statistic-date-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import TypeSelection from "./TypeSelection";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import abbreviateNumber from "@/utils/abbreviateNumber";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  projectId: string;
  string: string;
};

const Board = ({ projectId, string }: Props) => {
  const [keywords, setKeywords] = useState<string>("");
  const { category } = useCategoryStore();
  const { from, to } = useStatisticDateStore();
  const [type, setType] = useState<"top" | "trending">("top");
  const boards = useQuery({
    queryKey: ["boards", projectId],
    queryFn: () =>
      getBoards({
        project: projectId,
        since: from?.toISOString().split("T")[0],
        until: to?.toISOString().split("T")[0],
        string,
      }),
  });
  const comments = useMutation({
    mutationFn: getExportComments,
    onSuccess(data) {
      const h = document.createElement("a");
      h.setAttribute("href", window.URL.createObjectURL(data));
      h.click();
      h.remove();
    },
  });
  const table = useReactTable({
    columns,
    data: boards.data?.[type as "top" | "trending"][category] || [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableMultiRowSelection: false,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });
  return (
    <div className="flex flex-col bg-white rounded-md">
      <div className="flex flex-row items-center justify-between m-2">
        <h5>Content Board</h5>
        <TypeSelection value={type} setValue={setType} />
      </div>
      <Dialog>
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
                key={row.id}
                className="dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
                onDoubleClick={() =>
                  window.open(
                    `https://www.tiktok.com/@${row.original.author_name}/video/${row.original.id}`,
                    "_blank"
                  )
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Comments into Excel</DialogTitle>
          </DialogHeader>
          <div>
            <Input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Keyword or leave it blank"
            />
          </div>
          <DialogFooter className="text-sm">
            <button
              onClick={() =>
                comments.mutate({
                  id: table.getSelectedRowModel().rows[0].original.id,
                  keywords: keywords,
                })
              }
              className="bg-green-400 dark:bg-green-500 rounded-md shadow-md p-2 hover:bg-green-500 dark:hover:bg-green-700 transition-all ease-in-out duration-200"
            >
              Export
            </button>
            <DialogClose className="bg-red-400 dark:bg-red-500 rounded-md shadow-md p-2 hover:bg-red-500 dark:hover:bg-red-700 transition-all ease-in-out duration-200">
              Cancel
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
    </div>
  );
};

const columns: ColumnDef<BoardItem>[] = [
  {
    accessorKey: "author_name",
    header: "Creator",
  },
  {
    accessorKey: "desc",
    header: "Caption",
  },
  {
    accessorKey: "play",
    header: "View",
    cell: ({ row }) => abbreviateNumber(row.original.play),
  },
  {
    accessorKey: "digg",
    header: "Like",
    cell: ({ row }) => abbreviateNumber(row.original.digg),
  },
  {
    accessorKey: "share",
    header: "Share",
    cell: ({ row }) => abbreviateNumber(row.original.share),
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => abbreviateNumber(row.original.comment),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DialogTrigger onClick={() => row.toggleSelected()}>
              <DropdownMenuItem>Export Comments</DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuSeparator />
            <Link
              target="_blank"
              href={`https://www.tiktok.com/@${row.original.author_name}/video/${row.original.id}`}
            >
              <DropdownMenuItem>Watch</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => row.toggleSelected()}>
              Hide this video
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default Board;
