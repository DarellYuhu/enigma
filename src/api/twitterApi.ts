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
  console.log(data);
  return data;
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
