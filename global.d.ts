declare type Menus = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  navMain: {
    title: string;
    url: string;
    icon: any;
    isActive: boolean;
    items: {
      title: string;
      url: string;
    }[];
  }[];
  projects: {
    name: string;
    url: string;
    icon: any;
  }[];
};

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

declare type YoutubeProjectConfig = {
  APIs: string;
  keywords: string;
  languageCode: string;
  regionCode: string;
  runEvery: number;
  getDetailsAfter: number;
  monitorTopVideosEvery: number;
  status: string;
};

declare type YoutubeProjectTopVideos = {
  tc: [
    {
      channel_id: string;
      n_top: number;
      channel_name: string;
      n_vid: number;
    }
  ];
  top: [
    {
      id: string;
      view: number;
      like: number;
      comment: number;
      pub_date: Date;
      title: string;
      channel_title: string;
    }
  ];
};

type YTVSItem = {
  val: number[];
  del: number[];
};

declare type YoutubeVideoStats = {
  datetime: number[];
  view: YTVSItem;
  like: YTVSItem;
  comment: YTVSItem;
};

declare type NormalizedYTStats = {
  view: {
    date: number;
    val: number;
    del: number;
  }[];
  like: {
    date: number;
    val: number;
    del: number;
  }[];
  comment: {
    date: number;
    val: number;
    del: number;
  }[];
};

declare type YoutubeTopChannels = {
  tc: {
    channel_id: string;
    video_count: number;
    frac: number;
    channel_name: string;
  }[];
  ts: {
    dates: number[];
    data: {
      [key: string]: {
        count: number[];
        top_videos: [];
      };
    };
  };
};

declare type YoutubeChannelTopVids = {
  tv: {
    view: string[];
    like: string[];
    comment: string[];
  };
  info: {
    [key: string]: {
      pub_date: Date;
      title: string;
      view: number;
      like: number;
      comment: number;
    };
  };
};
