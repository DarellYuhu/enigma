type Payload = {
  project: string;
  since?: string;
  until?: string;
  string: string;
};

type Atom = { user: string[]; value: number[] };
type TSAtom = {
  date: Date[];
  count: number[];
  play: number[];
  like: number[];
  comment: number[];
  share: number[];
};

type Data = {
  topUsers: {
    count: Atom;
    play: Atom;
    like: Atom;
    comment: Atom;
    share: Atom;
  };
  ts: {
    daily: TSAtom;
    monthly: TSAtom;
    weekly: TSAtom;
  };
};

export default async function getTrends(payload: Payload) {
  const response = await fetch("/api/v1/project/statistics", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: Data = await response.json();

  console.log(data, "unparsed data");

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
  let topUsers: Record<string, any> = {
    like: [],
    share: [],
    comment: [],
    count: [],
    play: [],
  };

  data.topUsers.count.user.forEach((_: any, index: number) => {
    categories.forEach((category) => {
      topUsers[category].push({
        user: data.topUsers[category as keyof typeof data.topUsers].user[index],
        value:
          data.topUsers[category as keyof typeof data.topUsers].value[index],
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
}

export type GetTrendsReturn = Awaited<ReturnType<typeof getTrends>>;
