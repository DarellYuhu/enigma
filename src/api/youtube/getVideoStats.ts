export default async function getVideoStats(payload: {
  projectId: string;
  since?: Date;
  until?: Date;
  details?: string;
}) {
  const response = await fetch(
    `/api/v1/youtube/projects/${payload.projectId}/statistics/${
      payload.details
    }?since=${payload.since?.toISOString()}&until=${payload.until?.toISOString()}`
  );

  const data: YoutubeVideoStats = await response.json();

  let normalized: NormalizedYTStats = {
    comment: [],
    like: [],
    view: [],
  };
  data.datetime.forEach((item, index) => {
    normalized.view.push({
      date: item,
      del: data.view.del[index],
      val: data.view.val[index],
    });
    normalized.like.push({
      date: item,
      del: data.like.del[index],
      val: data.like.val[index],
    });
    normalized.comment.push({
      date: item,
      del: data.comment.del[index],
      val: data.comment.val[index],
    });
  });
  return normalized;
}
