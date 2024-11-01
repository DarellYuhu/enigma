import { Cosmograph, CosmographData, CosmographRef } from "@cosmograph/react";
import { CosmosInputLink, CosmosInputNode } from "@cosmograph/cosmos";
import { useRef } from "react";

export type CosmosNode = CosmosInputNode & {
  label: string;
  fill: string;
  size?: number;
  data: any;
};

export type CosmosLink = CosmosInputLink & {
  data: any;
  fill?: string;
};

type Props = {
  linkVisibilityDistanceRange?: [number, number];
  showDynamicLabel?: boolean;
  simulationGravity?: number;
  simulationLinkSpring?: number;
  simulationRepulsion?: number;
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

const Graph = ({
  data,
  showDynamicLabel = true,
  linkVisibilityDistanceRange = [90, 90],
  simulationGravity = 0.38,
  simulationLinkSpring = 0.03,
  simulationRepulsion = 0.4,
  onClick,
}: Props) => {
  const ref = useRef(null);
  return (
    <Cosmograph
      ref={ref}
      nodes={data.nodes}
      links={data.links}
      backgroundColor="#fff"
      hoveredNodeLabelColor={"#fff"}
      nodeColor={(node) => node.fill}
      nodeSize={(node) => (node.size ? node.size * 0.18 : 1)}
      nodeLabelAccessor={(node) => `${node.label}`}
      nodeLabelColor={"#fff"}
      showDynamicLabels={showDynamicLabel}
      linkArrows={false}
      linkColor={(link) => link.fill || "#fff"}
      linkVisibilityDistanceRange={linkVisibilityDistanceRange}
      linkGreyoutOpacity={0.9}
      simulationGravity={simulationGravity}
      simulationLinkSpring={simulationLinkSpring}
      simulationRepulsion={simulationRepulsion}
      onClick={onClick}
    />
  );
};

export default Graph;
