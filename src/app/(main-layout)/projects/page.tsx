"use client";

import {
  Cell,
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  RowData,
  RowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ALargeSmall,
  CalendarArrowUp,
  CalendarPlus,
  CircleAlert,
  Clapperboard,
  Eye,
  ListMinus,
  MonitorCog,
  Pencil,
} from "lucide-react";
import EditPanel from "@/componenets/EditPanel";
import * as Dialog from "@radix-ui/react-dialog";
import Tooltip from "@/componenets/Tooltip";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import getProjects from "@/api/getProjects";

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

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
// }

const Projects = () => {
  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects({ type: "listAllProjects" }),
  });
  const table = useReactTable({
    columns,
    data: projectsQuery.data?.projects || [],
    getCoreRowModel: getCoreRowModel(),
  });

  if (projectsQuery.status === "pending") {
    return <div>Loading...</div>;
  }
  return (
    // <Dialog.Root>
    //   <table className={"w-full"}>
    //     <thead className={""}>
    //       {table.getHeaderGroups().map((headerGroup) => (
    //         <tr key={headerGroup.id} className="bg-slate-700 rounded-lg">
    //           {headerGroup.headers.map((header) => (
    //             <th key={header.id} className="font-semibold text-base p-2">
    //               {flexRender(
    //                 header.column.columnDef.header,
    //                 header.getContext()
    //               )}
    //             </th>
    //           ))}
    //         </tr>
    //       ))}
    //     </thead>
    //     <tbody>
    //       {table.getRowModel().rows.map((row) => (
    //         <tr key={row.id}>
    //           {row.getVisibleCells().map((cell) => (
    //             <td key={cell.id}>
    //               {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //             </td>
    //           ))}
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    //   <EditPanel />
    // </Dialog.Root>
    <div className="flex flex-col gap-3">
      <button className="bg-green-500 shadow-md rounded-md p-2 text-slate-200 text-sm hover:bg-green-600 transition-all ease-in-out duration-200 self-end">
        Create New
      </button>
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
