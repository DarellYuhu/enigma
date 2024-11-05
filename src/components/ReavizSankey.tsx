"use client";

import { Sankey, SankeyNode, SankeyLink } from "reaviz";
import data from "@/data/sankey.json";

const ReavizSankey = () => {
  return (
    <Sankey
      width={400}
      height={500}
      nodes={Object.keys(data.thread).map((item) => (
        <SankeyNode title={item} id={item} />
      ))}
      links={data.flow.map((item) => (
        <SankeyLink source={item.from} target={item.to} />
      ))}
    />
  );
};

export default ReavizSankey;
