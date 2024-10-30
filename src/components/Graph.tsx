import { Cosmograph, CosmographData } from "@cosmograph/react";
import { CosmosInputLink, CosmosInputNode } from "@cosmograph/cosmos";

export type CosmosNode = CosmosInputNode & {
  label: string;
  fill: string;
  size?: number;
  data: any;
};

export type CosmosLink = CosmosInputLink & {
  data: any;
};

type Props = {
  data: CosmographData<CosmosNode, CosmosLink>;
  onClick?:
    | ((
        clickedNode: CosmosNode | undefined,
        index: number | undefined,
        nodePosition: [number, number] | undefined,
        event: MouseEvent
      ) => void)
    | undefined;
};

const Graph = ({ data, onClick }: Props) => {
  return (
    <Cosmograph
      nodes={data.nodes}
      links={data.links}
      backgroundColor="#fff"
      hoveredNodeLabelColor={"#fff"}
      nodeColor={(node) => node.fill}
      nodeSize={(node) => (node.size ? node.size * 0.18 : 1)}
      nodeLabelAccessor={(node) => `${node.label}`}
      nodeLabelColor={"#fff"}
      linkArrows={false}
      // linkColor={"#00000008"}
      simulationGravity={0.38}
      simulationLinkSpring={0.03}
      simulationRepulsion={0.4}
      simulationDecay={100}
      // simulationLinkDistance={8}
      onClick={onClick}
    />
  );
};

export default Graph;
