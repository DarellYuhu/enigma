export default async function getBoards(payload: GetTrendsPayload) {
  const response = await fetch("/api/v1/project/boards", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: BoardsData = await response.json();
  const normalize = {
    ...data,
    top: {
      ...data.top,
      like: data.top.digg,
    },
    trending: {
      ...data.trending,
      like: data.trending.digg,
    },
  };
  return normalize;
}
