"use client";

import {
  createColumnHelper,
  createTable,
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
  Pencil,
  View,
} from "lucide-react";
import EditPanel from "@/componenets/EditPanel";
import { useState } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

type Projects = {
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
  {
    header: "Actions",
    accessor: "id",
    cell: () => (
      <div className={styles.actionContainer}>
        <button className={styles.view}>
          <Eye />
        </button>
        <button className={styles.edit}>
          <Pencil />
        </button>
      </div>
    ),
  },
];

const Projects = () => {
  const [open, setOpen] = useState(false);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div>
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

      <button onClick={() => setOpen(true)}>Open dialog</button>

      {/* <EditPanel open={open} setOpen={setOpen} /> */}
      <Dialog className={styles.dialog} open={open} onClose={setOpen}>
        <div>
          <DialogPanel>
            <DialogTitle>Deactivate account</DialogTitle>
            <Description>
              This will permanently deactivate your account
            </Description>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed.
            </p>
            <div>
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button onClick={() => setOpen(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

const data: Projects[] = [
  {
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
  {
    name: "Coding",
    totalVideos: 10,
    createdAt: new Date(),
    keywords: ["coding", "programing", "python", "java", "c++"],
    status: "active",
  },
];

export default Projects;
