import { statistics } from "@/datas/statistics";

type Payload = {
  project: string;
  since: string;
  until: string;
  string: string;
};
export default async function getTrends(payload: Payload) {
  // const response = await fetch("/api/v1/project/statistics", {
  //   method: "POST",
  //   body: JSON.stringify(payload),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // const data = await response.json();
  // console.log(data);

  // function parseData(data: any) {
  //   return data.date.map((date: string, index: number) => ({
  //     date,
  //     like: data.like[index],
  //     share: data.share[index],
  //     comment: data.comment[index],
  //     count: data.count[index],
  //     play: data.play[index],
  //   }));
  // }

  // const daily = parseData(data.ts.daily);
  // const weekly = parseData(data.ts.weekly);
  // const monthly = parseData(data.ts.monthly);

  // return { daily, weekly, monthly };
  return statistics;
}
