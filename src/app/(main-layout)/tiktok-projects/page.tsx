"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  HeaderGroup,
  useReactTable,
} from "@tanstack/react-table";
import {
  ALargeSmall,
  CalendarArrowUp,
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clapperboard,
  FilePenLine,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useTiktokProjects } from "@/hooks/useTiktokProjects";
import { useCreateTTProject } from "@/hooks/useCreateTTProject";
import TiktokSchema from "@/schemas/tiktok";
import { useSession } from "next-auth/react";
import EditDialog from "./components/EditDialog";

type Project = {
  projectId: string;
  projectName: string;
  status: string;
  created: Date;
  lastUpdate: Date;
  numVideos: number;
};

const Projects = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const projectsQuery = useTiktokProjects();
  const projectsMutation = useCreateTTProject();
  const table = useReactTable({
    columns: columns(session?.user.role === "USER"),
    data: projectsQuery.data?.projects || [],
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
  const createForm = useForm<z.infer<typeof TiktokSchema.create>>({
    resolver: zodResolver(TiktokSchema.create),
    defaultValues: {
      projectName: "",
      keywords: "",
    },
  });

  const onSubmit = (values: z.infer<typeof TiktokSchema.create>) => {
    projectsMutation.mutate(values);
    createForm.reset();
  };

  const handleNavigation = (projectId: string) => {
    router.push(`/tiktok-projects/${projectId}`);
  };

  if (projectsQuery.status === "pending") {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-3">
      <Dialog>
        <DialogTrigger
          disabled={session?.user.role === "USER"}
          className="bg-blue-500 dark:bg-green-500 shadow-md rounded-md p-2 text-white text-sm dark:hover:bg-green-600 hover:bg-blue-600 transition-all ease-in-out duration-200 self-end"
        >
          Create New
        </DialogTrigger>
        <DialogContent className="bg-white dark:bg-slate-800 border-0">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <Form {...createForm}>
            <form
              onSubmit={createForm.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={createForm.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Project Name</FormLabel>
                    <FormControl className="bg-slate-200 dark:bg-slate-600 text-sm p-2 rounded-sm">
                      <input placeholder="Type here the name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createForm.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Keywords</FormLabel>
                    <FormControl className="bg-slate-200 dark:bg-slate-600 text-sm p-2 rounded-sm">
                      <textarea
                        rows={4}
                        placeholder="Type here the keywords"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Seperate by comma (,)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="text-sm">
                <button
                  type="submit"
                  className="bg-green-400 dark:bg-green-500 rounded-md shadow-md p-2 hover:bg-green-500 dark:hover:bg-green-700 transition-all ease-in-out duration-200"
                >
                  Submit
                </button>
                <DialogClose className="bg-red-400 dark:bg-red-500 rounded-md shadow-md p-2 hover:bg-red-500 dark:hover:bg-red-700 transition-all ease-in-out duration-200">
                  Cancel
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <div className="card bg-white dark:bg-slate-600 rounded-md">
        <Dialog onOpenChange={(open) => !open && table.resetRowSelection()}>
          <Table>
            <TableHeader>
              {table
                .getHeaderGroups()
                .map((headerGroup: HeaderGroup<Project>) => (
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
            </DialogHeader>
            <EditDialog
              project={table.getSelectedRowModel().rows[0]?.original}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const columns: (isDisabled: boolean) => ColumnDef<Project>[] = (isDisabled) => [
  {
    sortingFn: "text",
    accessorKey: "projectName",
    header: () => {
      return (
        <div className="flex flex-row gap-2 items-center">
          <ALargeSmall width={20} height={20} /> Name
        </div>
      );
    },
  },
  {
    sortingFn: "basic",
    accessorKey: "numVideos",
    header: () => {
      return (
        <div className="flex flex-row gap-2 items-center">
          <Clapperboard width={18} height={18} /> Total Videos
        </div>
      );
    },
  },
  {
    sortingFn: "datetime",
    accessorKey: "created",
    header: () => {
      return (
        <div className="flex flex-row gap-2 items-center">
          <CalendarPlus width={18} height={18} /> Created At
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <span>{new Date(row.getValue("created")).toLocaleDateString()}</span>
      );
    },
  },
  {
    sortingFn: "datetime",
    accessorKey: "lastUpdate",
    header: () => {
      return (
        <div className="flex flex-row gap-2 items-center">
          <CalendarArrowUp width={18} height={18} /> Updated At
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <span>{new Date(row.getValue("lastUpdate")).toLocaleDateString()}</span>
      );
    },
  },
  {
    sortingFn: "text",
    accessorKey: "status",
    header: () => {
      return (
        <div className="flex flex-row gap-2 items-center">
          <CircleAlert width={18} height={18} /> Status
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => {
      return (
        <div className="flex flex-row gap-2 items-center">
          <CircleAlert width={18} height={18} /> Action
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <DialogTrigger
          className="bg-blue-400 hover:bg-blue-500 text-slate-100 flex flex-row gap-2 items-center p-[3px] rounded-md"
          onClick={(event) => {
            event.stopPropagation();
            row.toggleSelected();
          }}
          disabled={isDisabled}
        >
          <FilePenLine width={16} height={16} />
          Edit
        </DialogTrigger>
      );
    },
  },
];

export default Projects;
