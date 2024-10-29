import YoutubeSchema from "@/schemas/youtube";
import { z } from "zod";

export const createProject = async (
  paylaod: z.infer<typeof YoutubeSchema.create>
) => {
  const response = await fetch("/api/v1/youtube/projects", {
    method: "POST",
    body: JSON.stringify(paylaod),
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

export const editProject = async (
  payload: z.infer<typeof YoutubeSchema.update>
) => {
  const response = await fetch(
    `/api/v1/youtube/projects/${payload.projectId}/config`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("You don't have permission to update project config");
    }
    throw new Error("Failed to update project config");
  }
  const data = await response.json();
  return data;
};

export const getVideoStats = async (payload: {
  projectId: string;
  since?: Date;
  until?: Date;
  details?: string;
}) => {
  const response = await fetch(
    `/api/v1/youtube/projects/${payload.projectId}/statistics/${
      payload.details
    }?since=${payload.since?.toISOString()}&until=${payload.until?.toISOString()}`
  );

  const data: YoutubeVideoStats = await response.json();

  const normalized: NormalizedYTStats = {
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
};

export const getTopVideos = async (payload: {
  projectId: string;
  since?: Date;
  until?: Date;
  string: string;
}) => {
  const response = await fetch(
    `/api/v1/youtube/projects/${
      payload.projectId
    }/top-videos?since=${payload.since?.toISOString()}&until=${payload.until?.toISOString()}&string=${
      payload.string
    }`
  );

  const data: YoutubeProjectTopVideos = await response.json();
  return data;
};

export const getTopChannels = async (payload: {
  projectId: string;
  since?: Date;
  until?: Date;
  string: string;
}) => {
  const response = await fetch(
    `/api/v1/youtube/projects/${
      payload.projectId
    }/top-channels?since=${payload.since?.toISOString()}&until=${payload.until?.toISOString()}&string=${
      payload.string
    }`
  );
  const data: YoutubeTopChannels = await response.json();
  return data;
};

export const getProjects = async () => {
  const response = await fetch("/api/v1/youtube/projects");
  const data: Data = await response.json();
  return data;
};

export const getChannelTopVideos = async (payload: {
  projectId: string;
  since?: Date;
  until?: Date;
  details?: string;
  string: string;
}) => {
  const response = await fetch(
    `/api/v1/youtube/projects/${payload.projectId}/top-channels/${
      payload.details
    }?since=${payload.since?.toISOString()}&until=${payload.until?.toISOString()}&string=${
      payload.string
    }`
  );

  const data: YoutubeChannelTopVids = await response.json();
  return data;
};

export const getProjectConfig = async (projectId: string) => {
  const response = await fetch(`/api/v1/youtube/projects/${projectId}/config`);
  const data: YoutubeProjectConfig = await response.json();
  return data;
};

export const getAudienceNetwork = async (payload: {
  projectId: string;
  since?: Date;
  until?: Date;
  string: string;
}) => {
  const response = await fetch(
    `/api/v1/youtube/projects/${
      payload.projectId
    }/audience-network?since=${payload.since?.toISOString()}&until=${payload.until?.toISOString()}&string=${
      payload.string
    }`
  );

  const data = await response.json();
  return data;
};

type Data = {
  projects: YoutubeProject[];
};