import normalizeInterestNetwork from "@/utils/normalizeInterestNetwork";

const colors = [
  "#527BA8",
  "#EE8C1F",
  "#DD5657",
  "#7AB7B2",
  "#60A04E",
  "#ECC640",
  "#AD7BA2",
  "#FB9CA6",
  "#9B755F",
  "#B9AFAB",
];

export default async function getInterestGraphs(payload: GetGraphsPayload) {
  const response = await fetch("/api/v1/project/graphs/interest-network", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: InterestNetwork = await response.json();
  const hashtags = Object.values(data.hashtags).map((item, index) => {
    return {
      color: colors[index],
      data: item.hashtags.map((tag, index) => ({
        hashtag: tag,
        value: item.values[index],
        color: colors[index],
      })),
    };
  });
  return {
    ...data,
    hashtags,
    network: normalizeInterestNetwork(data),
  };
}
