"use client";

import Datatable from "@/components/Datatable";
import { badgeVariants } from "@/components/ui/badge";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import useYoutubeVideoNet, {
  NodeVideoNetwork,
} from "@/hooks/useYoutubeVideoNet";
import abbreviateNumber from "@/utils/abbreviateNumber";
import { ColumnDef } from "@tanstack/react-table";
import { Heart, MessageCircle, Play } from "lucide-react";
import React from "react";

const TopCentrality = ({ projectId }: { projectId: string }) => {
  const { data } = useYoutubeVideoNet({ projectId: projectId, window: 5 });
  if (!data) return null;
  return (
    <Datatable
      columns={columns}
      data={data.data.network.nodes
        .sort((a, b) => b.centrality - a.centrality)
        .slice(0, 10)}
    />
  );
};

const columns: ColumnDef<NodeVideoNetwork>[] = [
  {
    accessorKey: "id",
    header: "Video",
    cell(props) {
      return (
        <div className="w-72 space-y-4">
          <HeroVideoDialog
            animationStyle="from-center"
            videoSrc={`https://www.youtube.com/embed/${props.row.original.id}`}
            thumbnailSrc={`https://img.youtube.com/vi/${props.row.original.id}/0.jpg`}
            thumbnailAlt="Hero Video"
          />
          <div className="flex flex-row gap-2 justify-center">
            <div className={badgeVariants({ variant: "outline" })}>
              <Play height={14} />
              {abbreviateNumber(props.row.original.play)}
            </div>
            <div className={badgeVariants({ variant: "outline" })}>
              <Heart height={14} />
              {abbreviateNumber(props.row.original.like)}
            </div>
            <div className={badgeVariants({ variant: "outline" })}>
              <MessageCircle height={14} />
              {abbreviateNumber(props.row.original.comment)}
            </div>
          </div>
        </div>
      );
    },
  },
];

export default TopCentrality;
