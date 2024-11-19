"use client";

import Datatable from "@/components/Datatable";
import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
import Graph, { CosmosLink, CosmosNode } from "@/components/Graph";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useTwitterAccountNetwork from "@/hooks/useTwitterAccountNetwork";
import useTwitterBoards, { TwitterBoardItem } from "@/hooks/useTwitterBoards";
import abbreviateNumber from "@/utils/abbreviateNumber";
import {
  CosmographData,
  CosmographProvider,
  CosmographSearch,
} from "@cosmograph/react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

const AccountNetGraph = ({ projectId }: { projectId: string }) => {
  const [node, setNode] = useState<CosmosNode | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useTwitterAccountNetwork({
    project: projectId,
    window: "1",
  });
  const boards = useTwitterBoards({
    project: projectId,
    string: node?.label ?? "",
    since: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    until: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  });
  return (
    <div className="relative w-full h-[500px] shadow-inner">
      <CosmographProvider
        links={data?.normalized.links}
        nodes={data?.normalized.nodes}
      >
        <div className=" bg-[#222222] absolute top-0 w-full z-10 px-2">
          <CosmographSearch
            accessors={[
              {
                label: "Name",
                accessor: (node: CosmosNode) => node.data.user_screen_name,
              },
              {
                label: "Description",
                accessor: (node) => node.data.user_description,
              },
            ]}
          />
        </div>
        <Graph
          onNodeMouseOver={(node) => setNode(node)}
          onNodeMouseOut={() => setNode(null)}
          simulationGravity={0.25}
          simulationRepulsion={1}
          simulationRepulsionTheta={1.15}
          simulationLinkSpring={0.5}
          simulationLinkDistance={10}
          simulationFriction={0.85}
          linkVisibilityDistanceRange={[100, 500]}
          linkVisibilityMinTransparency={0.2}
          selectedNode={node}
          linkArrows={true}
          data={
            (data?.normalized as CosmographData<CosmosNode, CosmosLink>) ?? []
          }
          onClick={(node) => {
            if (node) {
              setNode(node);
              setIsOpen(true);
            } else {
              setNode(null);
            }
          }}
        />
      </CosmographProvider>

      <Drawer
        open={isOpen}
        onOpenChange={(open) => {
          setNode(null);
          setIsOpen(open);
        }}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Content Board</DrawerTitle>
            <DrawerDescription>
              <p>{node?.label}</p>
              <p>{node?.data.user_description}</p>
              <p>Followers: {abbreviateNumber(node?.data.num_followers)}</p>
            </DrawerDescription>
          </DrawerHeader>
          {boards.data && node && (
            <ScrollArea className="w-full h-80 bg-white">
              <Datatable columns={columns} data={boards.data.top.view_count} />
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          )}
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const columns: ColumnDef<TwitterBoardItem>[] = [
  {
    accessorKey: "user_screen_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Screen name" />
    ),
  },
  {
    accessorKey: "full_text",
    header: "Tweets",
  },
  {
    accessorKey: "view_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="View" />
    ),
    cell: ({ row }) => abbreviateNumber(row.original.view_count),
  },
  {
    accessorKey: "retweet_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Retweet" />
    ),
    cell: ({ row }) => abbreviateNumber(row.original.retweet_count),
  },
  {
    accessorKey: "reply_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reply" />
    ),
    cell: ({ row }) => abbreviateNumber(row.original.reply_count),
  },
  {
    accessorKey: "favorite_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Favorite" />
    ),
    cell: ({ row }) => abbreviateNumber(row.original.favorite_count),
  },
  {
    accessorKey: "bookmark_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bookmark" />
    ),
    cell: ({ row }) => abbreviateNumber(row.original.bookmark_count),
  },
];

export default AccountNetGraph;
