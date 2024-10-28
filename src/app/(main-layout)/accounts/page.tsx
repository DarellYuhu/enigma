"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CreateSheet from "./components/CreateSheet";
import { useUsers } from "@/hooks/useUsers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import UpdateSheet from "./components/UpdateSheet";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import DeleteAlert from "./components/DeleteAlert";

const Account = () => {
  const users = useUsers();
  const table = useReactTable({
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableMultiRowSelection: false,
    data: users?.data || [],
  });
  return (
    <div>
      <Sheet>
        <SheetTrigger className="flex justify-self-end bg-blue-500 dark:bg-green-500 shadow-md rounded-md p-2 text-white text-sm dark:hover:bg-green-600 hover:bg-blue-600 transition-all ease-in-out duration-200 self-end mb-2">
          Create New Account
        </SheetTrigger>
        <CreateSheet />
      </Sheet>
      <div className="bg-white">
        <AlertDialog>
          <Sheet>
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
            <UpdateSheet user={table.getSelectedRowModel().rows[0]?.original} />
            <DeleteAlert
              id={table.getSelectedRowModel().rows[0]?.original.id}
            />
          </Sheet>
        </AlertDialog>
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
    </div>
  );
};

const columns: ColumnDef<Omit<User, "password">>[] = [
  {
    accessorKey: "displayName",
    header: "Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <span>
        {new Date(row.getValue<Date>("createdAt")).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => (
      <span>
        {new Date(row.getValue<Date>("updatedAt")).toLocaleDateString()}
      </span>
    ),
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
            <DropdownMenuSeparator />
            <SheetTrigger asChild onClick={() => row.toggleSelected()}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </SheetTrigger>
            <AlertDialogTrigger asChild onClick={() => row.toggleSelected()}>
              <DropdownMenuItem>
                <span>Delete Account</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default Account;
