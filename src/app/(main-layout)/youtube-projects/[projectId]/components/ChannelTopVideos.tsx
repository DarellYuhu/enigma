import {
  CalendarArrowUp,
  CirclePlay,
  Heart,
  MessageCircle,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import abbreviateNumber from "@/utils/abbreviateNumber";
import imageLoader from "@/utils/imageLoader";

type Props = {
  data: {
    pub_date: Date;
    title: string;
    view: number;
    like: number;
    comment: number;
    id: string;
  }[];
};

const ChannelTopVideos = ({ data }: Props) => {
  return (
    <Carousel className="w-3/4 flex justify-self-center">
      <CarouselContent>
        {data.map((item, index) => (
          <CarouselItem>
            <div className="bg-gray-700 text-white p-4 text-sm space-y-3 w-full rounded-md shadow-md">
              <div className="flex flex-row justify-between gap-1">
                <h4 className="line-clamp-2">{item.title}</h4>
                <div className="flex flex-row gap-2 items-center border border-slate-200 py-1 px-2 rounded-md text-nowrap">
                  {<CalendarArrowUp width={16} height={16} />}
                  {new Date(item.pub_date).toLocaleDateString()}
                </div>
              </div>
              <Image
                loader={imageLoader}
                src={item.id}
                width={"208"}
                height={"208"}
                className="w-full h-52 object-contain bg-green-500"
                alt="_videos"
              />
              <div className="flex flex-row justify-start gap-2">
                <button
                  className="flex flex-row gap-2 border-2 border-green-600 rounded-md py-1 px-2 items-center transition-all duration-200 hover:bg-green-600"
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/watch?v=${item.id}`,
                      "_blank"
                    )
                  }
                >
                  <CirclePlay width={16} height={16} />{" "}
                  {abbreviateNumber(item.view)}
                </button>
                <div className="flex flex-row gap-2 border border-slate-200 rounded-md py-1 px-2 items-center">
                  <Heart width={16} height={16} /> {abbreviateNumber(item.like)}
                </div>
                <div className="flex flex-row gap-2 border border-slate-200 rounded-md py-1 px-2 items-center">
                  <MessageCircle width={16} height={16} />{" "}
                  {abbreviateNumber(item.comment)}
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ChannelTopVideos;
