import { CosmosLink, CosmosNode } from "@/components/Graph";
import { COLORS } from "@/constants";
import { CosmographData } from "@cosmograph/react";
import { Edge, Node } from "vis-network/standalone/umd/vis-network.min";

export const createProject = async (payload: {
  projectName: string;
  keywords: string;
}) => {
  const response = await fetch("/api/v1/twitter", {
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

export const getProjects = async () => {
  const response = await fetch("/api/v1/twitter");
  const data: TTwitterProjects = await response.json();
  return data;
};

export const getProjectInfo = async (projectId?: string) => {
  const response = await fetch(`/api/v1/twitter/${projectId}`);
  const data: TwitterInfo = await response.json();
  return data;
};

export const editProject = async (payload: EditProjectPayload) => {
  const response = await fetch(`/api/v1/twitter/${payload.projectId}`, {
    method: "PATCH",
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

export const getBoards = async (payload: {
  project: string;
  since?: Date;
  until?: Date;
  string: string;
}) => {
  const response = await fetch(
    `/api/v1/twitter/${
      payload.project
    }/boards?since=${payload.since?.toISOString()}&until=${payload.until?.toISOString()}&string=${
      payload.string
    }`
  );
  const data: TwitterBoards = await response.json();
  return data;
};

export const getTagRelationGraph = async (payload: {
  project: string;
  since?: Date;
  until?: Date;
  string: string;
}) => {
  const response = await fetch(
    `/api/v1/twitter/${
      payload.project
    }/hashtag-network?since=${payload.since?.toISOString()}&until=${payload.until?.toISOString()}&string=${
      payload.string
    }`
  );

  const data: TwitterHashtagRelation = await response.json();

  // const nodes: CosmosNode[] = data.relation.nodes
  //   .filter((node) => node.isinBackbone)
  //   .map((node) => ({
  //     id: node.id,
  //     label: node.id,
  //     fill: COLORS[node.class],
  //     size: Math.log(node.authorCount),
  //     data: node,
  //   }));

  // const links: CosmosLink[] = data.relation.edges
  //   .filter((edge) => edge.isBackbone !== 0)
  //   .map((link) => ({
  //     source: link.from,
  //     target: link.to,
  //     data: link,
  //     fill: nodes.find((node) => node.id === link.from)?.fill,
  //   }));

  // return { links, nodes };

  const normalized: {
    nodes: Node[];
    edges: Edge[];
  } = {
    nodes: data.relation.nodes
      .filter((node) => node.isinBackbone)
      .map((node) => ({
        ...node,
        label: node.id,
        shape: "dot",
        color: COLORS[node.class],
        size: Math.log(node.authorCount),
        font: { size: 5 * Math.log(node.authorCount) },
      })),

    edges: data.relation.edges.filter((edge) => edge.isBackbone !== 0),
  };

  return normalized;
};

export const getAccountNetwork = async (payload: {
  project: string;
  window: string;
  string: string;
}) => {
  const response = await fetch(
    `/api/v1/twitter/${payload.project}/account-network?string=${payload.string}&window=${payload.window}`
  );
  const data: AccountNetwork = await response.json();
  const normalized: CosmographData<CosmosNode, CosmosLink> = {
    links: data.network.edges.map((edge) => ({
      data: edge,
      source: edge.from,
      target: edge.to,
      fill: COLORS[edge.tone],
    })),
    nodes: data.network.nodes.map((node) => ({
      data: node,
      fill: COLORS[parseInt(node.class) ?? COLORS.length - 1],
      id: node.user_id,
      label: node.user_name,
      size: Math.log(node.num_followers),
    })),
  };
  return normalized;
};

type AccountNetwork = {
  network: {
    nodes: {
      user_id: string;
      user_screen_name: string;
      user_name: string;
      user_description: string;
      num_followers: number;
      centrality: number;
      class: string; // <-- a number
    }[];
    edges: {
      from: string;
      to: string;
      tone: number;
      weight: number;
    }[];
  };
};

type TwitterHashtagRelation = {
  relation: {
    nodes: {
      id: string;
      tweetCount: number;
      authorCount: number;
      isinBackbone: number;
      class: number;
    }[];
    edges: {
      from: string;
      to: string;
      isBackbone: number;
      value: number;
    }[];
  };
};

export type TTwitterProjects = {
  projects: {
    projectId: string;
    projectName: string;
    status: string;
    created: Date;
    lastUpdate: Date;
    numTweets: number;
  }[];
};

export type TwitterInfo = {
  projectId: string;
  projectName: string;
  status: string;
  keywords: string;
};

export type TwitterBoardItem = {
  id: string;
  created_at: string; // 2024-11-06 05:35:11 <-- this format
  user_id: string;
  user_screen_name: string;
  full_text: string;
  retweet_count: number;
  reply_count: number;
  favorite_count: number;
  bookmark_count: number;
};

type TwitterBoards = {
  top: {
    retweet_count: TwitterBoardItem[];
    reply_count: TwitterBoardItem[];
    favorite_count: TwitterBoardItem[];
    bookmark_count: TwitterBoardItem[];
  };
};
