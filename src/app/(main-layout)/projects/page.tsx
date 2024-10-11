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
  Clipboard,
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getProjects from "@/api/getProjects";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { Switch } from "@/components/ui/switch";
import { useEffect, useMemo, useState } from "react";
import editProject from "@/api/editProject";
import getProject from "@/api/getProject";

type Project = {
  projectId: string;
  projectName: string;
  status: string;
  created: Date;
  lastUpdate: Date;
  numVideos: number;
};

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
  const [selected, setSelected] = useState<Project | null>(null);
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
  const columns: ColumnDef<Project>[] = useMemo(
    () => [
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
            <span>
              {new Date(row.getValue("created")).toLocaleDateString()}
            </span>
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
            <span>
              {new Date(row.getValue("lastUpdate")).toLocaleDateString()}
            </span>
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
              onClick={() => handleSelected(row.original)}
            >
              <FilePenLine width={16} height={16} />
              Edit
            </DialogTrigger>
          );
        },
      },
    ],
    []
  );
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

  const handleSelected = (row: Project) => {
    setSelected(row);
  };

  if (projectsQuery.status === "pending") {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-3">
      <Dialog>
        <DialogTrigger className="bg-blue-500 dark:bg-green-500 shadow-md rounded-md p-2 text-white text-sm dark:hover:bg-green-600 hover:bg-blue-600 transition-all ease-in-out duration-200 self-end">
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
      <div className="bg-white dark:bg-slate-600 rounded-md shadow-md">
        <Dialog onOpenChange={(open) => !open && setSelected(null)}>
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
                      className="text-black dark:text-slate-300 text-nowrap font-semibold"
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
            </DialogHeader>
            <EditDialog project={selected} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const updateFormSchema = z.object({
  projectId: z.string().optional(),
  keywords: z.string().optional(),
  status: z.boolean().optional(),

  // added for accessibility only
  currentKeywords: z.string().optional(),
});

const EditDialog = ({ project }: { project?: Project | null }) => {
  const queryClient = useQueryClient();
  const projectQuery = useQuery({
    queryKey: ["project", project?.projectId],
    queryFn: () => getProject({ projectId: project?.projectId }),
    enabled: !!project?.projectId,
  });
  const projectMutation = useMutation({
    mutationFn: editProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      alert("success");
    },
  });
  const updateForm = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      keywords: "",
      projectId: "",
      status: true,
      currentKeywords: "",
    },
  });
  const onEditSubmit = ({
    currentKeywords,
    ...values
  }: z.infer<typeof updateFormSchema>) => {
    const normalize: EditProjectPayload = {
      ...values,
      projectId: project?.projectId,
      status: values.status ? "active" : "inactive",
    };
    console.log(normalize, "on submit");
    projectMutation.mutate(normalize);
  };

  useEffect(() => {
    if (projectQuery?.data) {
      updateForm.reset({
        keywords: "",
        projectId: projectQuery.data.projectId,
        status: projectQuery.data.status === "active",
        currentKeywords: projectQuery.data.keywords,
      });
    }
  }, [projectQuery.status]);

  if (projectQuery?.status === "pending") {
    return <div>Loading...</div>;
  }
  return (
    <Form {...updateForm}>
      <form
        onSubmit={updateForm.handleSubmit(onEditSubmit)}
        className="space-y-4"
      >
        <FormField
          control={updateForm.control}
          name="projectId"
          disabled
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Project Id</FormLabel>
              <FormControl className="bg-slate-200 disabled:bg-slate-300 dark:bg-slate-600 text-sm p-2 rounded-sm">
                <input placeholder="Do not change!!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updateForm.control}
          name="currentKeywords"
          disabled
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Current Keywords</FormLabel>
              <FormControl className="bg-slate-300 dark:bg-slate-600 text-sm p-2 rounded-sm">
                <div className="relative">
                  <input
                    disabled
                    placeholder="Do not change!!"
                    className="disabled:bg-slate-300"
                    {...field}
                  />
                  <button
                    type="button"
                    className="bg-slate-400 hover:bg-slate-500  p-1 mr-3 rounded-sm absolute right-0"
                    onClick={() =>
                      navigator.clipboard.writeText(field.value || "")
                    }
                  >
                    <Clipboard width={14} height={14} />
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updateForm.control}
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
        <FormField
          control={updateForm.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
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
  );
};

export default Projects;
