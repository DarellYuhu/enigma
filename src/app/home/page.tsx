import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/ui/dock";
import { MagicCard } from "@/components/ui/magic-card";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { DiamondPlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import CreateSheet from "./components/CreateSheet";

const HomePage = () => {
  return (
    <div className="p-10 text-center relative">
      <h1 className="text-6xl font-bold mt-8">Welcome to Our Website</h1>
      <h3 className="text-xl p-20 text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque
        mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque
        mollitia fugiat omnis! Porro facilis quo
      </h3>
      <div className="grid grid-cols-12 gap-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <MagicCard
            className="relative col-span-3 transition-all ease-in-out duration-300 hover:scale-105"
            key={index}
          >
            <img
              alt="picture"
              // loader={customLoader}
              src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg"
              width={"100"}
              height={"100"}
              className="w-full h-full object-contain"
            />
            <div className="absolute group flex flex-col justify-end bottom-0 left-0 text-left h-full bg-gradient-to-t from-[rgba(255,255,255,1)] to-transparent">
              <div className="p-4">
                <h4 className="text-lg font-semibold">Some title here</h4>
                <h5 className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                  doloremque mollitia fugiat omnis! Porro facilis quo
                </h5>
              </div>
              <div className="absolute transition-all duration-500 ease-in-out bottom-0 left-0 w-full h-0 group-hover:h-2/5  overflow-y-auto">
                <div className="bg-white/30 flex flex-col items-center p-4 gap-2 backdrop-blur-md">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <Link
                      key={index}
                      className={cn(badgeVariants(), "col-span-4")}
                      href={"#"}
                    >
                      Bongbong Marcos ganteng
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </MagicCard>
        ))}
      </div>
      <Dock
        direction="middle"
        className="h-10 rounded-lg fixed -top-4 right-4 transform -translate-x-1/2 z-10"
      >
        <DockIcon>
          <Sheet>
            <Tooltip>
              <TooltipTrigger asChild>
                <SheetTrigger
                  aria-label={"Create"}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-8 rounded-lg"
                  )}
                >
                  <DiamondPlusIcon className="size-4" />
                </SheetTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>{"Create"}</p>
              </TooltipContent>
            </Tooltip>
            <CreateSheet />
          </Sheet>
        </DockIcon>
      </Dock>
    </div>
  );
};

export default HomePage;
