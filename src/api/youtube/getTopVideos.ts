export default async function getTopVideos(payload: {
  projectId: string;
  since?: Date;
  until?: Date;
  string: string;
}) {
  const response = await fetch(
    `/api/v1/youtube/projects/${
      payload.projectId
    }/top-videos?since=${payload.since?.toISOString()}&until=${payload.until?.toISOString()}&string=${
      payload.string
    }`
  );

  const data: YoutubeProjectTopVideos = await response.json();
  return data;
}
