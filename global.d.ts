declare type Menus = {
  title: string;
  menus: {
    label: string;
    link: string;
    icon: React.ReactNode;
  }[];
}[];

declare type TagRelationNetwork = {
  relation: {
    edges: {
      from: string;
      isBackbone: number;
      to: string;
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
};

type HashTagRecord = {
  hashtags: string[];
  values: number[];
};

declare type InterestNetwork = {
  hashtags: Record<number, HashTagRecord>;
  network: {
    edges: {
      from: string;
      to: string;
      value: number;
    }[];
    nodes: {
      id: string;
      desc: string;
      published_at: number;
      author_id: string;
      author_name: string;
      digg: number;
      share: number;
      comment: number;
      play: number;
      class: number;
      tag: number;
    }[];
  };
  tags: Record<number, string>;
};

declare type EditProjectPayload = {
  projectId?: string;
  keywords?: string;
  status?: "active" | "inactive";
};

declare type GetGraphsPayload = {
  project: string;
  since?: string;
  until?: string;
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

declare type TagInformation = {
  since: Date;
  until: Date;
  name: string;
  views: number;
  published: number;
  viewsTotal: number;
  publishedTotal: number;
  audienceAges: {
    level1: number;
    level2: number;
    level3: number;
  };
  categories: string[];
  Status?: string;
};

declare type BoardItem = {
  id: string;
  desc: string;
  author_id: string;
  author_name: string;
  digg: number;
  share: number;
  comment: number;
  play: number;
  interval: number;
  diff: number;
};

declare type BoardsData = {
  top: {
    digg: BoardItem[];
    share: BoardItem[];
    comment: BoardItem[];
    play: BoardItem[];
  };
  trending: {
    digg: BoardItem[];
    share: BoardItem[];
    comment: BoardItem[];
    play: BoardItem[];
  };
};

declare type YoutubeProject = {
  projectID: string;
  projectName: string;
  createdAt: Date;
  APIs: string;
  keywords: string;
  languageCode: string;
  regionCode: string;
  status: string;
  firstVideo: Date;
  lastTracking: Date;
};
