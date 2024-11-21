import { useYoutubeTopVideos } from "@/hooks/useYoutubeTopVideos";
import { useQueryFilterStore } from "@/store/query-filter-store";
import useStatisticDateStore from "@/store/statistic-date-store";
import imageLoader from "@/utils/imageLoader";
import Image from "next/image";
import { useEffect } from "react";
import useSelectedVideoStore from "../store/selected-video-store";

const TopVideos = ({ projectId }: { projectId: string }) => {
  const { from, to } = useStatisticDateStore();
  const { query } = useQueryFilterStore();
  const { setVideo } = useSelectedVideoStore();
  const { data } = useYoutubeTopVideos({
    from,
    to,
    params: { projectId: projectId },
    string: query,
  });

  useEffect(() => {
    if (data) {
      setVideo(data.top[0]);
    }
  }, [data]);
  return (
    <div className="w-full flex flex-row gap-3">
      {data?.top.map((item, index) => (
        <Image
          key={index}
          loader={imageLoader}
          src={item.id}
          alt="profile_picture"
          className="aspect-[16/9] rounded-lg object-contain bg-slate-200"
          width={300}
          height={300}
          onClick={() => setVideo(item)}
        />
      ))}
    </div>
  );
};

export default TopVideos;
