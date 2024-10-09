type Payload = {
  project: string;
  since: string;
  until: string;
  string: string;
};
export default async function getTrends(payload: Payload) {
  const response = await fetch("/api/v1/project/statistics", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  function parseData(data: any) {
    return data.date.map((date: string, index: number) => ({
      date,
      like: data.like[index],
      share: data.share[index],
      comment: data.comment[index],
      count: data.count[index],
      play: data.play[index],
    }));
  }

  const daily = parseData(data.ts.daily);
  const weekly = parseData(data.ts.weekly);
  const monthly = parseData(data.ts.monthly);

  const categories = ["like", "share", "comment", "count", "play"];
  let topUsers: any = {
    like: [],
    share: [],
    comment: [],
    count: [],
    play: [],
  };

  data.topUsers.count.user.forEach((_: any, index: number) => {
    categories.forEach((category) => {
      topUsers[category].push({
        user: data.topUsers[category].user[index],
        value: data.topUsers[category].value[index],
      });
    });
  });

  const count = {
    play: monthly.reduce((acc: number, cur: any) => acc + cur.play, 0),
    like: monthly.reduce((acc: number, cur: any) => acc + cur.like, 0),
    share: monthly.reduce((acc: number, cur: any) => acc + cur.share, 0),
    comment: monthly.reduce((acc: number, cur: any) => acc + cur.comment, 0),
  };

  return { daily, weekly, monthly, topUsers, count };
  // return statistics;
}
