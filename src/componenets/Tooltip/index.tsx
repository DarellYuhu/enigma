import React from "react";
import * as MainTooltip from "@radix-ui/react-tooltip";
import styles from "./tooltip.module.css";

type Props = {
  children: React.ReactNode;
  text: string;
};

const Tooltip = ({ children, text }: Props) => {
  return (
    <MainTooltip.Root>
      <MainTooltip.Trigger asChild>{children}</MainTooltip.Trigger>
      <MainTooltip.Portal>
        <MainTooltip.Content className={styles.TooltipContent}>
          <div>{text}</div>
          <MainTooltip.Arrow />
        </MainTooltip.Content>
      </MainTooltip.Portal>
    </MainTooltip.Root>
  );
};

export default Tooltip;
