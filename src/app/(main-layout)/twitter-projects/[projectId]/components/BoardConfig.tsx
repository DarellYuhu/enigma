"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import useTwitterBoards from "@/hooks/useTwitterBoards";
import useBoardConfigStore from "../store/board-config-store";

const BoardConfig = ({ projectId }: { projectId: string }) => {
  const [toggleValue, setToggleValue] = useState("3");
  const { from, to, string, setDate, setString, reset } = useBoardConfigStore();
  const { refetch } = useTwitterBoards({
    project: projectId,
    string: string,
    since: from,
    until: to,
  });

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    switch (toggleValue) {
      case "1":
        setDate({
          from: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          to: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        });
        break;
      case "3":
        setDate({
          from: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          to: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        });
        break;
      case "7":
        setDate({
          from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          to: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        });
        break;
    }
  }, [toggleValue]);

  return (
    <div className="flex flex-row gap-2">
      <ToggleGroup
        type="single"
        defaultValue="3"
        value={toggleValue}
        onValueChange={setToggleValue}
      >
        <ToggleGroupItem variant={"outline"} value="1">
          1d
        </ToggleGroupItem>
        <ToggleGroupItem variant={"outline"} value="3">
          3d
        </ToggleGroupItem>
        <ToggleGroupItem variant={"outline"} value="7">
          7d
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="relative">
        <Input
          id="input-26"
          className="peer pe-9 ps-9"
          placeholder="Search..."
          type="search"
          onChange={(event) => setString({ string: event.currentTarget.value })}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          onClick={() => refetch()}
        >
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default BoardConfig;
