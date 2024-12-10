"use client";

import { badgeVariants } from "@/components/ui/badge";
import useYoutubeVideoNet, {
  NodeVideoNetwork,
} from "@/hooks/features/youtube/useYoutubeVideoNet";
import abbreviateNumber from "@/utils/abbreviateNumber";
import { Heart, MessageCircle, Play, XIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import useConfigStore from "../store/config-store";
import SingleSelect from "@/components/SingleSelect";
import dateFormatter from "@/utils/dateFormatter";
import { Skeleton } from "@/components/ui/skeleton";
// import SingleSelect from "@/components/SingleSelect";

const TopCentrality = ({ projectId }: { projectId: string }) => {
  const [type, setType] =
    useState<
      keyof Pick<
        NodeVideoNetwork,
        "centrality_bw" | "centrality_dg" | "centrality_pr"
      >
    >("centrality_pr");
  const { date } = useConfigStore();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const { data, isPending } = useYoutubeVideoNet({
    projectId: projectId,
    window: 5,
    date: dateFormatter("ISO", date),
  });

  if (isPending) return <Skeleton className="h-full w-full" />;

  if (!data) return null;
  return (
    <>
      <Carousel>
        <CarouselContent>
          {data.data.network.nodes
            .sort((a, b) => b[type] - a[type])
            .slice(0, 10)
            .map((video, index) => (
              <CarouselItem key={index}>
                <div className=" relative flex flex-col items-center gap-4">
                  <div
                    className={cn(
                      badgeVariants(),
                      "absolute top-2 left-2 z-40"
                    )}
                  >
                    #{index + 1}
                  </div>
                  <div
                    className="relative cursor-pointer group h-full"
                    onClick={() => {
                      setIsVideoOpen(true);
                      setVideoId(video.id);
                    }}
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
                      alt={"Hero Video"}
                      width={1920}
                      height={1080}
                      className="h-full object-contain w-full transition-all duration-200 group-hover:brightness-[0.8] ease-out rounded-md shadow-lg border bg-black"
                    />
                    <div className="absolute inset-0 flex items-center justify-center group-hover:scale-100 scale-[0.9] transition-all duration-200 ease-out rounded-2xl">
                      <Play
                        className="text-white fill-white group-hover:scale-105 scale-100 transition-transform duration-200 ease-out"
                        style={{
                          filter:
                            "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 z-40 flex-wrap">
                    <div
                      className={cn(
                        badgeVariants({
                          variant: "outline",
                          className: "text-[13px]",
                        })
                      )}
                    >
                      <Play height={16} />
                      {abbreviateNumber(video.play)}
                    </div>
                    <div
                      className={cn(
                        badgeVariants({
                          variant: "outline",
                          className: "text-[13px]",
                        })
                      )}
                    >
                      <Heart height={16} />
                      {abbreviateNumber(video.like)}
                    </div>
                    <div
                      className={cn(
                        badgeVariants({
                          variant: "outline",
                          className: "text-[13px]",
                        })
                      )}
                    >
                      <MessageCircle height={16} />
                      {abbreviateNumber(video.comment)}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
      <AnimatePresence>
        {isVideoOpen && videoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsVideoOpen(false)}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-video mx-4 md:mx-0"
            >
              <motion.button className="absolute -top-16 right-0 text-white text-xl bg-neutral-900/50 ring-1 backdrop-blur-md rounded-full p-2 dark:bg-neutral-100/50 dark:text-black">
                <XIcon className="size-5" />
              </motion.button>
              <div className="size-full border-2 border-white rounded-2xl overflow-hidden isolate z-[1] relative">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  className="size-full rounded-2xl"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute top-4 right-4">
        <SingleSelect
          selections={selections}
          value={type}
          setValue={(value) => setType(value as typeof type)}
        />
      </div>
    </>
  );
};

const selections = [
  {
    label: "PageRank",
    value: "centrality_pr",
  },
  {
    label: "Betweenness",
    value: "centrality_bw",
  },
  {
    label: "Degree",
    value: "centrality_dg",
  },
];

export default TopCentrality;
