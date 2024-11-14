"use client";

import { User as PrismaUser } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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
import { Button, buttonVariants } from "@/components/ui/button";
import UpdateSheet from "./components/UpdateSheet";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import DeleteAlert from "./components/DeleteAlert";
import ResetPassAlert from "./components/ResetPassAlert";
import { useState } from "react";
import Datatable from "@/components/Datatable";
import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
import { cn } from "@/lib/utils";

type User = Omit<PrismaUser, "password">;

const Account = () => {
  const [selectedRow, setSelectedRow] = useState<User | undefined>();
  const [resetAlert, setResetAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const users = useUsers();
  return (
    <div className="flex flex-col gap-3">
      <Sheet>
        <SheetTrigger
          className={cn(buttonVariants({ variant: "default" }), "self-end")}
        >
          Create New Account
        </SheetTrigger>
        <CreateSheet />
      </Sheet>
      <AlertDialog open={resetAlert} onOpenChange={setResetAlert}>
        <AlertDialog open={deleteAlert} onOpenChange={setDeleteAlert}>
          <Sheet>
            <Datatable
              columns={() =>
                columns({
                  deleteAlert,
                  resetAlert,
                  setDeleteAlert,
                  setResetAlert,
                  setSelectedRow,
                })
              }
              data={users?.data || []}
            />
            <UpdateSheet user={selectedRow} />
            <DeleteAlert id={selectedRow?.id || 0} />
          </Sheet>
        </AlertDialog>
        <ResetPassAlert id={selectedRow?.id || 0} />
      </AlertDialog>
    </div>
  );
};

type ColumnProps = {
  resetAlert: boolean;
  setResetAlert: React.Dispatch<React.SetStateAction<boolean>>;
  deleteAlert: boolean;
  setDeleteAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRow: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const columns: ({
  resetAlert,
  deleteAlert,
  setResetAlert,
  setDeleteAlert,
  setSelectedRow,
}: ColumnProps) => ColumnDef<User>[] = ({
  resetAlert,
  deleteAlert,
  setResetAlert,
  setDeleteAlert,
  setSelectedRow,
}) => {
  return [
    {
      accessorKey: "displayName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => (
        <span>
          {new Date(row.getValue<Date>("createdAt")).toLocaleDateString()}
        </span>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Updated At" />
      ),
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
        const handleRowSelect = () => {
          setSelectedRow(row.original);
        };
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
              <SheetTrigger asChild onClick={() => handleRowSelect()}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </SheetTrigger>
              <AlertDialogTrigger
                asChild
                onClick={() => {
                  setDeleteAlert(!deleteAlert);
                  handleRowSelect();
                }}
              >
                <DropdownMenuItem>
                  <span>Delete Account</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogTrigger>
                <DropdownMenuItem
                  onClick={(event) => {
                    setResetAlert(!resetAlert);
                    event.stopPropagation();
                    handleRowSelect();
                  }}
                >
                  <span>Reset Password</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};

export default Account;
