import { CalendarRange, Eye, Globe } from "lucide-react";
import { Separator } from "./ui/separator";
import CustomPieChart from "./custom-piechart";
import { useQuery } from "@tanstack/react-query";
import getTagInformation from "@/api/getTagInformation";
import abbreviateNumber from "@/utils/abbreviateNumber";

const TagInformation = ({
  tagNode,
}: {
  tagNode: TagRelationNetwork["relation"]["nodes"][number];
}) => {
  const tagInformation = useQuery({
    queryKey: ["tagInformation", tagNode.id],
    enabled: !!tagNode.id,
    queryFn: () => getTagInformation({ hashtag: tagNode.id }),
  });
  if (tagInformation.isLoading) return <div>Loading...</div>;
  if (tagInformation.data?.Status === "No Data" || !tagInformation.data)
    return <div>No Data</div>;
  return (
    <div className="absolute p-2 h-4/5 w-fit backdrop-blur-md border rounded-md shadow-md bottom-0 left-0 m-2">
      <h6>Tag Information</h6>
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
              <p>{`Dilihat ${abbreviateNumber(
                tagInformation.data?.views
              )} Kali`}</p>
              <Separator />
              <p>{`Atau ${(
                (tagInformation.data?.views / tagInformation.data?.viewsTotal) *
                100
              ).toFixed(2)}% Dari total`}</p>
            </div>
          </div>
          <Separator />
          <div className="flex flex-row items-center gap-2 text-sm">
            <Globe width={25} height={25} />
            <Separator orientation="vertical" className="h-10" />
            <div className="flex flex-col gap-1">
              <p>{`Dipublis ${abbreviateNumber(
                tagInformation.data?.published
              )} Kali`}</p>
              <Separator />
              <p>{`Atau ${(
                (tagInformation.data.published /
                  tagInformation.data.publishedTotal) *
                100
              ).toFixed(2)}% Dari total`}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm">Topik</h4>
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
        <div className="h-52 w-52">
          <CustomPieChart
            data={tagInformation.data.audienceAges}
            dataKey="value"
            labelKey="age"
          />
        </div>
      </div>
    </div>
  );
};

export default TagInformation;
