import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TypeSelection = ({
  value,
  setValue,
}: {
  value: "top" | "trending";
  setValue: (value: "top" | "trending") => void;
}) => (
  <Select onValueChange={setValue} value={value}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Type" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="top">Top</SelectItem>
      <SelectItem value="trending">Trending</SelectItem>
    </SelectContent>
  </Select>
);

export default TypeSelection;
