export default async function getChannelTopVideos(payload: {
  projectId: string;
  since?: Date;
  until?: Date;
  details?: string;
  string: string;
}) {
  const response = await fetch(
    `/api/v1/youtube/projects/${payload.projectId}/top-channels/${
      payload.details
    }?since=${payload.since?.toISOString()}&until=${payload.until?.toISOString()}&string=${
      payload.string
    }`
  );

  const data: YoutubeChannelTopVids = await response.json();
  return data;
}
