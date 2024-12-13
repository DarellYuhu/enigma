"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useTwitterBoards from "@/hooks/features/twitter/useTwitterBoards";
import useTwitterHashtagEvo from "@/hooks/features/twitter/useTwitterHashtagEvo";
import useTwitterHashtagNet from "@/hooks/features/twitter/useTwitterHashtagNet";
import useTwitterScatterTopics from "@/hooks/features/twitter/useTwitterScatterTopics";
import useGraphDateStore from "@/store/graph-date-store";
import { useQueryFilterStore } from "@/store/query-filter-store";
import dateFormatter from "@/utils/dateFormatter";
import { useEffect, useState } from "react";

const Window = ({ projectId }: { projectId: string }) => {
  const [toggleValue, setToggleValue] = useState("3");
  const { query } = useQueryFilterStore();
  const { from, to, setFrom, setTo } = useGraphDateStore();

  const boards = useTwitterBoards({
    project: projectId,
    string: query,
    since: from && dateFormatter("ISO", from),
    until: to && dateFormatter("ISO", to),
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
    since: from ? dateFormatter("ISO", from) : "",
    until: to ? dateFormatter("ISO", to) : "",
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
