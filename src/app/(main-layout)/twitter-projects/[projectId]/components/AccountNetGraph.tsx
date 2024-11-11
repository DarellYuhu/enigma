"use client";

import Graph, { CosmosLink, CosmosNode } from "@/components/Graph";
import useTwitterAccountNetwork from "@/hooks/useTwitterAccountNetwork";
import {
  CosmographData,
  CosmographProvider,
  CosmographSearch,
} from "@cosmograph/react";

const AccountNetGraph = ({ projectId }: { projectId: string }) => {
  const { data } = useTwitterAccountNetwork({
    project: projectId,
    window: "1",
  });
  return (
    <div className="relative w-full h-[500px] shadow-inner">
      <CosmographProvider
        links={data?.normalized.links}
        nodes={data?.normalized.nodes}
      >
        <div className=" bg-[#222222] absolute top-0 w-full z-10 px-2">
          <CosmographSearch
            accessors={[
              {
                label: "Name",
                accessor: (node: CosmosNode) => node.data.user_screen_name,
              },
              {
                label: "Description",
                accessor: (node) => node.data.user_description,
              },
            ]}
          />
        </div>
        <Graph
          simulationGravity={0.25}
          simulationRepulsion={1}
          simulationRepulsionTheta={1.15}
          simulationLinkSpring={0.5}
          simulationLinkDistance={10}
          simulationFriction={0.85}
          linkVisibilityDistanceRange={[100, 500]}
          linkVisibilityMinTransparency={0.2}
          linkArrows={true}
          data={
            (data?.normalized as CosmographData<CosmosNode, CosmosLink>) ?? []
          }
          // onClick={(node) => {
          //   if (node) {
          //     setNode(node.data);
          //   } else {
          //     setNode(null);
          //   }
          // }}
        />
      </CosmographProvider>
    </div>
  );
};

export default AccountNetGraph;
