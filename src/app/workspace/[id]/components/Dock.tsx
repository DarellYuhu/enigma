import { buttonVariants } from "@/components/ui/button";
import { Dock as DockContainer, DockIcon } from "@/components/ui/dock";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DiamondPlusIcon } from "lucide-react";
import CreateSheet from "./CreateSheet";
import { cn } from "@/lib/utils";
import CreateSectionDialog from "./CreateSectionDialog";

const Dock = () => {
  return (
    <DockContainer
      direction="middle"
      className="h-10 rounded-lg fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10"
    >
      <DockIcon>
        <Sheet>
          <Tooltip>
            <TooltipTrigger asChild>
              <SheetTrigger
                aria-label={"Create card"}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-8 rounded-lg"
                )}
              >
                <DiamondPlusIcon className="size-4" />
              </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>{"Create card"}</p>
            </TooltipContent>
          </Tooltip>
          <CreateSheet />
        </Sheet>
      </DockIcon>
      <DockIcon>
        <CreateSectionDialog />
      </DockIcon>
    </DockContainer>
  );
};

export default Dock;
