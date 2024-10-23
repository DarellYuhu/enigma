export default async function getAudienceNetwork(payload: {
  projectId: string;
  since?: Date;
  until?: Date;
  string: string;
}) {
  const response = await fetch(
    `/api/v1/youtube/projects/${
      payload.projectId
    }/audience-network?since=${payload.since?.toISOString()}&until=${payload.until?.toISOString()}&string=${
      payload.string
    }`
  );

  const data = await response.json();
  return data;
}
