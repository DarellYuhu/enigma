"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSelectionStore from "../hooks/selection-store";

const TypeSelection = () => {
  const { type, setType } = useSelectionStore();
  return (
    <Select onValueChange={setType} value={type}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="top">Top</SelectItem>
        <SelectItem value="trending">Trending</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TypeSelection;
