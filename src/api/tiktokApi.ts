import { COLORS } from "@/constants";
import extractAgeLabel from "@/utils/extractAgeLabel";
import normalizeTagRelation from "@/utils/normalizeTagRelation";
import { CosmographData } from "@cosmograph/react";
import { CosmosLink, CosmosNode } from "@/components/Graph";

export const createProject = async (payload: {
  projectName: string;
  keywords: string;
}) => {
  const response = await fetch("/api/v1/project/create", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("You don't have permission to create project");
    }
    throw new Error("Failed to create project");
  }
  const data = await response.json();
  return data;
};

export const editProject = async (payload: EditProjectPayload) => {
  const response = await fetch("/api/v1/project/edit", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("You don't have permission to edit project");
    }
    throw new Error("Failed to edit project");
  }
  const data = await response.json();
  return data;
};

export const getProject = async (payload: {
  projectId?: string;
}): Promise<GetProjectResult> => {
  const response = await fetch("/api/v1/project/cat", {
    method: "POST",
    body: JSON.stringify({ type: "getProjectInfo", ...payload }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const getProjects = async (
  payload: GetProjectsPayload
): Promise<GetProjectsResult> => {
  const response = await fetch("/api/v1/project/cat", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const getBoards = async (payload: GetTrendsPayload) => {
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
};

export const exportComments = async (payload: {
  id: string;
  keywords: string;
}) => {
  const response = await fetch("/api/v1/export/comments", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.blob();
  return data;
};

export const getInterestGraphs = async (payload: GetGraphsPayload) => {
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
      color: COLORS[index],
      data: item.hashtags.map((tag, index) => ({
        hashtag: tag,
        value: item.values[index],
        color: COLORS[index],
      })),
    };
  });
  const nodes = data.network.nodes.map((node) => ({
    id: node.id,
    label: node.author_name,
    fill: COLORS[node.class],
    size: Math.log(node.digg),
    data: node,
  }));

  const normalized: CosmographData<CosmosNode, CosmosLink> = {
    nodes,
    links: data.network.edges.map((edge, index) => ({
      id: index.toString(),
      source: edge.from,
      target: edge.to,
      fill: nodes.find((node) => node.id === edge.from)?.fill,
      data: edge,
    })),
  };

  return { network: normalized, hashtags };
};

export const getTagInformation = async (payload: { hashtag: string }) => {
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
};

export const getTagRelationGraphs = async (payload: GetGraphsPayload) => {
  const response = await fetch("/api/v1/project/graphs/tag-relation-network", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: TagRelationNetwork = await response.json();
  return normalizeTagRelation(data);
};

export default async function getTrends(payload: GetTrendsPayload) {
  const response = await fetch("/api/v1/project/statistics", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: TrendsData = await response.json();

  const parseData = (data: TSAtom) =>
    data.date.map((date: Date, index: number) => ({
      date,
      like: data.like[index],
      share: data.share[index],
      comment: data.comment[index],
      count: data.count[index],
      play: data.play[index],
    }));

  const daily = parseData(data.ts.daily);
  const weekly = parseData(data.ts.weekly);
  const monthly = parseData(data.ts.monthly);

  const categories = ["like", "share", "comment", "count", "play"];
  const topUsers: Record<string, { user: string; value: number }[]> = {
    like: [],
    share: [],
    comment: [],
    count: [],
    play: [],
  };

  data.topUsers.count.user.forEach((_, index: number) => {
    categories.forEach((category) => {
      topUsers[category].push({
        user: data.topUsers[category as keyof typeof data.topUsers].user[index],
        value:
          data.topUsers[category as keyof typeof data.topUsers].value[index],
      });
    });
  });

  const count = {
    play: monthly.reduce((acc: number, cur) => acc + cur.play, 0),
    like: monthly.reduce((acc: number, cur) => acc + cur.like, 0),
    share: monthly.reduce((acc: number, cur) => acc + cur.share, 0),
    comment: monthly.reduce((acc: number, cur) => acc + cur.comment, 0),
  };

  return { daily, weekly, monthly, topUsers, count };
}

export type GetTrendsReturn = Awaited<ReturnType<typeof getTrends>>;
