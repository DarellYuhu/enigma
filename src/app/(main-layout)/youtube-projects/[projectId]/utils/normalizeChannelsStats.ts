export default function normalizeChannelsStats(
  channelId: string,
  ts: YoutubeTopChannels["ts"]
) {
  const data: { date: number; value: number }[] = [];
  ts.dates.forEach((item, index) => {
    data.push({ date: item, value: ts.data[channelId].count[index] });
  });
  return data;
}
