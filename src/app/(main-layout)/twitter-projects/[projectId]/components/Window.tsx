"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useTwitterAccountNetwork from "@/hooks/useTwitterAccountNetwork";
import useTwitterBoards from "@/hooks/useTwitterBoards";
import useTwitterHashtagEvo from "@/hooks/useTwitterHashtagEvo";
import useTwitterHashtagNet from "@/hooks/useTwitterHashtagNet";
import useTwitterScatterTopics from "@/hooks/useTwitterScatterTopics";
import useGraphDateStore from "@/store/graph-date-store";
import { useQueryFilterStore } from "@/store/query-filter-store";
import { useEffect, useState } from "react";

const Window = ({ projectId }: { projectId: string }) => {
  const [toggleValue, setToggleValue] = useState("3");
  const { query } = useQueryFilterStore();
  const { from, to, setFrom, setTo } = useGraphDateStore();

  const boards = useTwitterBoards({
    project: projectId,
    string: query,
    since: from,
    until: to,
  });

  const scatterTopics = useTwitterScatterTopics({
    project: projectId,
    date: from!,
  });

  const hashtagNet = useTwitterHashtagNet({
    project: projectId,
    string: query,
    since: from,
    until: to,
  });

  const hashtagEvo = useTwitterHashtagEvo({
    project: projectId,
    string: query,
    since: from,
    until: to,
  });

  const account = useTwitterAccountNetwork({
    project: projectId,
    window: toggleValue,
  });

  useEffect(() => {
    switch (toggleValue) {
      case "1":
        setFrom(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000));
        setTo(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000));
        break;
      case "3":
        setFrom(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000));
        setTo(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000));
        break;
      case "7":
        setFrom(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
        setTo(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000));
        break;
    }
    boards.refetch();
    scatterTopics.refetch();
    hashtagNet.refetch();
    hashtagEvo.refetch();
    account.refetch();
  }, [toggleValue]);
  return (
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
  );
};

export default Window;
