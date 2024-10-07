"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./projects.module.css";
import {
  ALargeSmall,
  CalendarPlus,
  CircleAlert,
  Eye,
  ListMinus,
  MonitorCog,
  Pencil,
} from "lucide-react";
import EditPanel from "@/componenets/EditPanel";
import * as Dialog from "@radix-ui/react-dialog";
import Tooltip from "@/componenets/Tooltip";
import Link from "next/link";

type Projects = {
  id: string;
  name: string;
  totalVideos: number;
  createdAt: Date;
  keywords: string[];
  status: string;
};

const columnHelper = createColumnHelper<Projects>();

const columns = [
  columnHelper.accessor("name", {
    sortingFn: "alphanumeric",
    cell: (info) => info.getValue(),
    header: () => (
      <span>
        <ALargeSmall />
        Name
      </span>
    ),
  }),
  columnHelper.accessor("totalVideos", {
    cell: (info) => info.getValue(),
    header: () => (
      <span>
        <Eye />
        Total Videos
      </span>
    ),
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => info.getValue().toLocaleDateString(),
    header: () => (
      <span>
        <CalendarPlus />
        Created At
      </span>
    ),
  }),
  columnHelper.accessor("keywords", {
    cell: (info) => (
      <div className={styles.keyword}>
        {info.getValue().map((word, index) => (
          <span key={index}>{word}</span>
        ))}
      </div>
    ),
    header: () => (
      <span>
        <ListMinus />
        Keywords
      </span>
    ),
  }),
  columnHelper.accessor("status", {
    cell: (info) => <span className={styles.status}>{info.getValue()}</span>,
    header: () => (
      <span>
        <CircleAlert />
        Status
      </span>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => {
      return (
        <span>
          <MonitorCog />
          Actions
        </span>
      );
    },
    cell: ({
      row: {
        original: { id },
      },
    }) => (
      <div className={styles.actionContainer}>
        <Tooltip text="View Project Details">
          <Link href={`/projects/${id}`} className={styles.view}>
            <Eye />
          </Link>
        </Tooltip>
        <Tooltip text="Edit">
          <Dialog.Trigger asChild>
            <div className={styles.edit}>
              <Pencil />
            </div>
          </Dialog.Trigger>
        </Tooltip>
      </div>
    ),
  }),
];

const Projects = () => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <Dialog.Root>
      <table className={styles.table}>
        <thead className={styles.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={styles.tbody}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <EditPanel />
    </Dialog.Root>
  );
};

const data: Projects[] = [
  {
    id: "1",
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    id: "2",
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    id: "3",
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    id: "4",
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    id: "5",
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    id: "6",
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    id: "7",
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    id: "8",
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    id: "9",
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    id: "10",
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    id: "11",
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    id: "12",
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    id: "13",
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    id: "14",
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    id: "15",
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
];

export default Projects;
