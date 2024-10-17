import extractAgeLabel from "@/utils/extractAgeLabel";

export default async function getTagInformation(payload: { hashtag: string }) {
  const response = await fetch("/api/v1/hashtags", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: TagInformation = await response.json();

  return {
    ...data,
    audienceAges: Object.values(data.audienceAges).map((value, index) => ({
      age: extractAgeLabel(Object.keys(data.audienceAges)[index]),
      value: value,
    })),
  };
}
