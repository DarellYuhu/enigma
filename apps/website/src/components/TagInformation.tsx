import { CalendarRange, Eye, Globe } from "lucide-react";
import { Separator } from "./ui/separator";
import abbreviateNumber from "@/utils/abbreviateNumber";
import { useTiktokTagInfo } from "@/hooks/features/tiktok/useTiktokTagInfo";
import ReavizPie from "./charts/ReavizPie";

const TagInformation = ({
  tagNode,
}: {
  tagNode: TagRelationNetwork["relation"]["nodes"][number];
}) => {
  const tagInformation = useTiktokTagInfo({ tagNode });
  if (tagInformation.isLoading) return <div>Loading...</div>;
  if (tagInformation.data?.Status === "No Data" || !tagInformation.data)
    return <div>No Data</div>;
  return (
    <>
      <h6>Hashtag Insights</h6>
      <div className="flex flex-row">
        <div className="flex flex-col gap-1 overflow-y-auto">
          <div className="flex flex-row justify-between gap-6 items-center">
            <h3 className="font-bold text-lg">{tagInformation?.data?.name}</h3>
            <div className="border border-slate-400 flex flex-row gap-2 rounded-sm p-2 text-xs">
              <CalendarRange width={16} height={16} />
              {`${new Date(
                tagInformation.data?.since
              ).toLocaleDateString()} - ${new Date(
                tagInformation.data?.until
              ).toLocaleDateString()}`}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 text-sm">
            <Eye width={25} height={25} />
            <Separator orientation="vertical" className="h-10" />
            <div className="flex flex-col gap-1">
              <p>{`Viewed ${abbreviateNumber(
                tagInformation.data?.views
              )} times`}</p>
              <Separator />
              <p>{`${(
                (tagInformation.data?.views / tagInformation.data?.viewsTotal) *
                100
              ).toFixed(2)}% Overall`}</p>
            </div>
          </div>
          <Separator />
          <div className="flex flex-row items-center gap-2 text-sm">
            <Globe width={25} height={25} />
            <Separator orientation="vertical" className="h-10" />
            <div className="flex flex-col gap-1">
              <p>{`Published ${abbreviateNumber(
                tagInformation.data?.published
              )} times`}</p>
              <Separator />
              <p>{`${(
                (tagInformation.data.published /
                  tagInformation.data.publishedTotal) *
                100
              ).toFixed(2)}% Overall`}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm">Topics</h4>
            <div className="text-white flex flex-row gap-2 justify-between">
              <div className="rounded-sm w-full flex justify-center items-center p-1 bg-green-500 text-center text-[10.5px]">
                {tagInformation.data.categories[0]}
              </div>
              <div className="rounded-sm w-full flex justify-center items-center p-1 bg-cyan-500 text-center text-[10.5px]">
                {tagInformation.data.categories[1]}
              </div>
              <div className="rounded-sm w-full flex justify-center items-center p-1 bg-violet-500 text-center text-[10.5px]">
                {tagInformation.data.categories[2]}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-52 w-52">
          <h3 className="mx-2 self-center">Age Range</h3>
          {/* <CustomPieChart
            data={tagInformation.data.audienceAges}
            dataKey="value"
            labelKey="age"
          /> */}
          <ReavizPie
            data={tagInformation.data.audienceAges.map((item) => ({
              key: item.age,
              data: item.value,
            }))}
          />
        </div>
      </div>
    </>
  );
};

export default TagInformation;
