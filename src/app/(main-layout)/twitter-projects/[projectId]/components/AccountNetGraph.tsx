"use client";

import Datatable from "@/components/datatable/Datatable";
import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
import Graph, { CosmosLink, CosmosNode } from "@/components/charts/Graph";
import { Button, buttonVariants } from "@/components/ui/button";
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
import useTwitterAccountNet from "@/hooks/features/twitter/useTwitterAccountNet";
import useTwitterBoards, {
  TwitterBoardItem,
} from "@/hooks/features/twitter/useTwitterBoards";
import abbreviateNumber from "@/utils/abbreviateNumber";
import {
  CosmographData,
  CosmographProvider,
  CosmographSearch,
} from "@cosmograph/react";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import useClusterStore from "../store/cluster-store";
import useAccountStore from "../store/account-config-store";
import adjustDateByFactor from "@/utils/adjustDateByFactor";
import dateFormatter from "@/utils/dateFormatter";
import useProjectInfo from "@/hooks/features/useProjectInfo";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Expand } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

const AccountNetGraph = ({ projectId }: { projectId: string }) => {
  const [label, setLabel] = useState(false);
  const { setAccount } = useClusterStore();
  const [node, setNode] = useState<CosmosNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<CosmosNode | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const projectInfo = useProjectInfo("TWITTER", projectId);
  const { date, setDate } = useAccountStore();
  const { data, isPending } = useTwitterAccountNet({
    projectId,
    Window: 1,
    date: date ? dateFormatter("ISO", date) : "",
  });
  const boards = useTwitterBoards({
    project: projectId,
    string: selectedNode?.data.user_screen_name ?? "",
    since: date && dateFormatter("ISO", adjustDateByFactor(-3, date)),
    until: date && dateFormatter("ISO", adjustDateByFactor(1, date)),
  });

  useEffect(() => {
    if (projectInfo.data?.lastUpdate) {
      setDate(adjustDateByFactor(-1, new Date(projectInfo.data.lastUpdate)));
    }
  }, [projectInfo.data?.lastUpdate]);

  useEffect(() => {
    if (data) {
      setAccount(
        data.normalized.classes.filter((item) => !!item.representation)[0]?.id
      );
    }
  }, [data]);

  if (isPending) return <Skeleton className="h-[400px] w-full" />;

  return (
    <>
      <div className="relative w-full h-[400px] shadow-inner">
        <CosmographProvider
          links={data?.normalized.network.links}
          nodes={data?.normalized.network.nodes}
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
            simulationLinkSpring={1}
            simulationLinkDistance={10}
            simulationFriction={0.85}
            linkVisibilityDistanceRange={[100, 500]}
            linkVisibilityMinTransparency={0.2}
            selectedNode={node}
            showDynamicLabels={label}
            data={
              (data?.normalized.network as CosmographData<
                CosmosNode,
                CosmosLink
              >) ?? []
            }
            onClick={(node) => {
              if (node) {
                setSelectedNode(node);
                setIsOpen(true);
              } else {
                setSelectedNode(null);
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
                <Datatable
                  columns={columns}
                  data={boards.data.top.view_count}
                />
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
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <Dialog>
          <DialogTrigger>
            <Button size={"icon"} variant={"ghost"}>
              <Expand size={14} />
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-[90%] h-[90%]">
            <Graph
              onNodeMouseOver={(node) => setNode(node)}
              onNodeMouseOut={() => setNode(null)}
              simulationGravity={0.25}
              simulationRepulsion={1}
              simulationRepulsionTheta={1.15}
              simulationLinkSpring={1}
              simulationLinkDistance={10}
              simulationFriction={0.85}
              linkVisibilityDistanceRange={[100, 500]}
              linkVisibilityMinTransparency={0.2}
              selectedNode={node}
              showDynamicLabels={label}
              data={
                (data?.normalized.network as CosmographData<
                  CosmosNode,
                  CosmosLink
                >) ?? []
              }
              onClick={(node) => {
                if (node) {
                  setSelectedNode(node);
                  setIsOpen(true);
                } else {
                  setSelectedNode(null);
                }
              }}
            />
          </DialogContent>
        </Dialog>
        <Toggle
          pressed={label}
          onPressedChange={setLabel}
          className={buttonVariants({ variant: "outline" })}
        >
          Show Label
        </Toggle>
      </div>
    </>
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
