import interest from "@/data/interest";
import normalizeInterestNetwork from "@/utils/normalizeInterestNetwork";
import normalizeTagRelation from "@/utils/normalizeTagRelation";

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

export default async function getGraphs(payload: GetGraphsPayload) {
  const response = await fetch("/api/v1/project/graphs", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: TagRelationNetwork | InterestNetwork = await response.json();
  if ("hashtags" in data) {
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
    console.log(hashtags);
    return {
      ...data,
      hashtags,
      network: normalizeInterestNetwork(data as InterestNetwork),
    };
    // return normalizeInterestNetwork(interest as InterestNetwork);
  } else {
    // return normalizeTagRelation(data as TagRelationNetwork);
  }
}
