declare type TNetRelation = {
  edges: {
    source: string;
    isBackbone: number;
    target: string;
    value: number;
  }[];
  nodes: {
    authorCount: number;
    class: number;
    id: string;
    isinBackbone: boolean;
    videoCount: number;
  }[];
};

declare type EditProjectPayload = {
  projectId?: string;
  keywords?: string;
  status?: "active" | "inactive";
};

declare type GetGraphsPayload = {
  type: "interestNet" | "tagRelation";
  project: string;
  since: string;
  until: string;
  string: string;
};

declare type GetProjectResult = {
  projectId: string;
  projectName: string;
  status: "active" | "inactive";
  keywords: string;
};

declare type GetProjectsPayload = {
  type: "listAllProjects" | "listActiveProjects" | "getProjectInfo";
  projectId?: string;
};

declare type GetProjectsResult = {
  projects: {
    projectId: string;
    projectName: string;
    status: string;
    created: Date;
    lastUpdate: Date;
    numVideos: number;
  }[];
};

declare type GetTrendsPayload = {
  project: string;
  since?: string;
  until?: string;
  string: string;
};

type Atom = { user: string[]; value: number[] };
declare type TSAtom = {
  date: Date[];
  count: number[];
  play: number[];
  like: number[];
  comment: number[];
  share: number[];
};

declare type TrendsData = {
  topUsers: {
    count: Atom;
    play: Atom;
    like: Atom;
    comment: Atom;
    share: Atom;
  };
  ts: {
    daily: TSAtom;
    monthly: TSAtom;
    weekly: TSAtom;
  };
};
