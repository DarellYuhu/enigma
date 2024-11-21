import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import useSelectedVideoStore from "../store/selected-video-store";
import imageLoader from "@/utils/imageLoader";

const VideoCard = () => {
  const { video } = useSelectedVideoStore();
  if (!video) return null;
  return (
    <>
      <CardHeader>
        <CardTitle>{video.channel_title}</CardTitle>
        <CardDescription>
          {new Date(video.pub_date).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Image
          className="aspect-[16/9] rounded-lg object-contain bg-slate-200"
          loader={imageLoader}
          src={video.id}
          width={300}
          height={300}
          alt="profile_picture"
        />
        <h4 className="text-sm font-light overflow-y-auto">
          {`${video.title}`}
        </h4>
      </CardContent>
    </>
  );
};

export default VideoCard;
