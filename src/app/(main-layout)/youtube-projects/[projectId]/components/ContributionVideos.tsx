"use client";

import { useYTChannelTopVids } from "@/hooks/useYTChannelTopVids";
import useStatisticDateStore from "@/store/statistic-date-store";
import React from "react";
import useSelectedChannelStore from "../store/selected-channel-store";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { badgeVariants } from "@/components/ui/badge";
import { Calendar, Heart, MessageCircle, Play } from "lucide-react";
import abbreviateNumber from "@/utils/abbreviateNumber";
import { cn } from "@/lib/utils";

const ContributionVideos = ({ projectId }: { projectId: string }) => {
  const { from, to } = useStatisticDateStore();
  const { channelId } = useSelectedChannelStore();
  const { data } = useYTChannelTopVids({
    from,
    to,
    params: { projectId },
    selectedTopChannel: channelId,
    string: "",
  });
  if (!data) return null;
  return (
    <div className="grid grid-cols-12 gap-4">
      {data.normalized.map((item, index) => (
        <Card key={index} className="col-span-3">
          <CardHeader>
            <CardTitle className="line-clamp-3">{item.title}</CardTitle>
            <CardDescription
              className={cn(
                badgeVariants({ variant: "outline" }),
                "flex self-start"
              )}
            >
              <Calendar height={14} />{" "}
              {new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(new Date(item.pub_date))}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <HeroVideoDialog
              animationStyle="from-center"
              videoSrc={`https://www.youtube.com/embed/${item.id}`}
              thumbnailSrc={`https://img.youtube.com/vi/${item.id}/0.jpg`}
              thumbnailAlt="Hero Video"
            />
            <div className="flex flex-row gap-2">
              <div className={badgeVariants({ variant: "outline" })}>
                <Play height={14} />
                {abbreviateNumber(item.view)}
              </div>
              <div className={badgeVariants({ variant: "outline" })}>
                <Heart height={14} />
                {abbreviateNumber(item.like)}
              </div>
              <div className={badgeVariants({ variant: "outline" })}>
                <MessageCircle height={14} />
                {abbreviateNumber(item.comment)}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContributionVideos;
