export default async function getTopChannels(payload: {
  projectId: string;
  since?: Date;
  until?: Date;
  string: string;
}) {
  const response = await fetch(
    `/api/v1/youtube/projects/${
      payload.projectId
    }/top-channels?since=${payload.since?.toISOString()}&until=${payload.until?.toISOString()}&string=${
      payload.string
    }`
  );
  const data: YoutubeTopChannels = await response.json();
  return data;
}
