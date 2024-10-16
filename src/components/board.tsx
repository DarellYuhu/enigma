import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import getBoards from "@/api/getBoards";
import { useState } from "react";
import useStatisticDateStore from "@/store/statistic-date-store";
import useCategoryStore, { CategoryState } from "@/store/category-store";
import abbreviateNumber from "@/utils/abbreviateNumber";

type Props = {
  projectId: string;
  string: string;
};

const Board = ({ projectId, string }: Props) => {
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
  const table = useReactTable({
    columns,
    data: boards.data?.[type as "top" | "trending"][category] || [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });

  return (
    <div className="bg-white rounded-md">
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
    header: "User",
  },
  {
    accessorKey: "desc",
    header: "Description",
  },
  {
    accessorKey: "play",
    header: "Play",
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
      const payment = row.original;
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
            <DropdownMenuItem>Extract Comments</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Watch</DropdownMenuItem>
            <DropdownMenuItem>Hide this video</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const dummyData: BoardItem[] = Array.from({ length: 13 }).map((_, index) => ({
  author_id: (index + 1).toString(),
  author_name: `User ${index + 1}`,
  desc: `This is the description of the video from user ${index + 1}`,
  play: index * 2,
  digg: index * 3,
  share: index * 4,
  comment: index * 5,
  interval: index * 6,
  diff: index * 7,
  id: index.toString(),
}));

export default Board;
