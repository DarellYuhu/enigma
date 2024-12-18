import dateFormatter from "@/utils/dateFormatter";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export function useTiktokTrends(payload: {
  params: { projectId: string };
  query: string;
  statisticDate: { from?: Date; to?: Date };
}) {
  return useQuery({
    queryKey: [
      "trends",
      "statistics",
      payload.params.projectId,
      payload.statisticDate.to &&
        dateFormatter("ISO", payload.statisticDate.to),
    ],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/tiktok/${payload.params.projectId}/statistics?since=${format(
          payload.statisticDate.from!,
          "yyyy-MM-dd"
        )}&until=${format(payload.statisticDate.to!, "yyyy-MM-dd")}&string=${
          payload.query
        }`
      );
      const data: TrendsData = await response.json();

      const parseData = (data: TSAtom) =>
        data.date.map((date: Date, index: number) => ({
          date,
          like: data.like[index],
          share: data.share[index],
          comment: data.comment[index],
          count: data.count[index],
          play: data.play[index],
        }));

      const daily = parseData(data.ts.daily);
      const weekly = parseData(data.ts.weekly);
      const monthly = parseData(data.ts.monthly);

      const categories = ["like", "share", "comment", "count", "play"];
      const topUsers: Record<string, { user: string; value: number }[]> = {
        like: [],
        share: [],
        comment: [],
        count: [],
        play: [],
      };

      data.topUsers.count.user.forEach((_, index: number) => {
        categories.forEach((category) => {
          topUsers[category].push({
            user: data.topUsers[category as keyof typeof data.topUsers].user[
              index
            ],
            value:
              data.topUsers[category as keyof typeof data.topUsers].value[
                index
              ],
          });
        });
      });

      const count = {
        play: monthly.reduce((acc: number, cur) => acc + cur.play, 0),
        like: monthly.reduce((acc: number, cur) => acc + cur.like, 0),
        share: monthly.reduce((acc: number, cur) => acc + cur.share, 0),
        comment: monthly.reduce((acc: number, cur) => acc + cur.comment, 0),
      };

      return { daily, weekly, monthly, topUsers, count };
    },
  });
}

export type GetTrendsReturn = Awaited<
  ReturnType<typeof useTiktokTrends>
>["data"];
