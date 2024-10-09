"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ALargeSmall,
  CalendarArrowUp,
  CalendarPlus,
  CircleAlert,
  Clapperboard,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getProjects from "@/api/getProjects";
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
import postProjects from "@/api/postProjects";

// COLUMNS ======================================
type Projects = {
  projectId: string;
  projectName: string;
  status: string;
  created: Date;
  lastUpdate: Date;
  numVideos: number;
};

const columns: ColumnDef<Projects>[] = [
  {
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
    accessorKey: "created",
    header: () => {
      return (
        <div className="flex flex-row gap-2 items-center">
          <CalendarPlus width={18} height={18} /> Created At
        </div>
      );
    },
    cell: ({ row }: any) => {
      return (
        <span>{new Date(row.getValue("created")).toLocaleDateString()}</span>
      );
    },
  },
  {
    accessorKey: "lastUpdate",
    header: () => {
      return (
        <div className="flex flex-row gap-2 items-center">
          <CalendarArrowUp width={18} height={18} /> Updated At
        </div>
      );
    },
    cell: ({ row }: any) => {
      return (
        <span>{new Date(row.getValue("lastUpdate")).toLocaleDateString()}</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => {
      return (
        <div className="flex flex-row gap-2 items-center">
          <CircleAlert width={18} height={18} /> Status
        </div>
      );
    },
  },
];

const createFormSchema = z.object({
  projectName: z.string().trim().min(1, "Required"),
  keywords: z
    .string()
    .trim()
    .min(1, "Required")
    .refine((val) => val.split(",").length > 0, {
      message: "Keywords must be separated by comma",
    }),
});

const Projects = () => {
  const queryClient = useQueryClient();
  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects({ type: "listAllProjects" }),
  });
  const projectsMutation = useMutation({
    mutationFn: postProjects,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      alert("success");
    },
    onError: () => {
      alert("error");
    },
  });
  const table = useReactTable({
    columns,
    data: projectsQuery.data?.projects || [],
    getCoreRowModel: getCoreRowModel(),
  });
  const createForm = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      projectName: "",
      keywords: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createFormSchema>) => {
    projectsMutation.mutate(values);
    createForm.reset();
  };

  if (projectsQuery.status === "pending") {
    return <div>Loading...</div>;
  }
  return (
    <Dialog>
      <div className="flex flex-col gap-3">
        <DialogTrigger className="bg-green-500 shadow-md rounded-md p-2 text-slate-200 text-sm hover:bg-green-600 transition-all ease-in-out duration-200 self-end">
          Create New
        </DialogTrigger>
        <Table className="bg-slate-600 rounded-md shadow-lg">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-slate-700">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-slate-300 text-nowrap font-semibold"
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
              <TableRow key={row.id} className="text-white hover:bg-slate-700">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DialogContent className="bg-slate-800 text-white border-0">
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
                  <FormControl className="bg-slate-600 text-sm p-2 rounded-sm">
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
                  <FormControl className="bg-slate-600 text-sm p-2 rounded-sm">
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
                className="bg-green-500 rounded-md shadow-md p-2 hover:bg-green-700 transition-all ease-in-out duration-200"
              >
                Submit
              </button>
              <DialogClose className="bg-red-500 rounded-md shadow-md p-2 hover:bg-red-700 transition-all ease-in-out duration-200">
                Cancel
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const data: Projects[] = [
  {
    projectId: "1",
    projectName: "Coding",
    numVideos: 10,
    created: new Date(),
    lastUpdate: new Date(),
    status: "active",
  },
  {
    projectId: "2",
    projectName: "Coding",
    numVideos: 10,
    created: new Date(),
    lastUpdate: new Date(),
    status: "active",
  },
];

export default Projects;
