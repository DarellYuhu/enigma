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
  const { setType, type } = useSelectionStore();
  return (
    <Select value={type} onValueChange={setType}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="centrality_pr">Centrality PR</SelectItem>
        <SelectItem value="centrality_bw">Centrality BW</SelectItem>
        <SelectItem value="centrality_dg">Centrality DG</SelectItem>
        <SelectItem value="num_contents">Number of contents</SelectItem>
        <SelectItem value="num_authors">Number of authors</SelectItem>
        <SelectItem value="num_audience">Number of audience</SelectItem>
        <SelectItem value="total_views">Total views</SelectItem>
        <SelectItem value="total_likes">Total likes</SelectItem>
        <SelectItem value="total_comments">Total comments</SelectItem>
        <SelectItem value="total_shares">Total shares</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TypeSelection;
