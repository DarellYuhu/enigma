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
