export default function normalizeChannelVids(
  ids: string[],
  data: YoutubeChannelTopVids["info"]
) {
  return ids.map((id) => {
    return {
      id,
      ...data[id],
    };
  });
}
