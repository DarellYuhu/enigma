"use client";

import { buttonVariants } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

type Props = {
  onValueChange?: (value: string) => void;
  value?: string;
};

export default function Window(props: Props) {
  return (
    <ToggleGroup type="single" {...props}>
      <ToggleGroupItem
        value="1"
        className={buttonVariants({ variant: "outline" })}
      >
        1
      </ToggleGroupItem>
      <ToggleGroupItem
        value="3"
        className={buttonVariants({ variant: "outline" })}
      >
        3
      </ToggleGroupItem>
      <ToggleGroupItem
        value="7"
        className={buttonVariants({ variant: "outline" })}
      >
        7
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
