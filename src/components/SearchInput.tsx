import { ArrowRight, Search } from "lucide-react";
import { Input } from "./ui/input";

type Props = {
  onChange: (value: string) => void;
  onClick?: () => void;
};

const SearchInput = (props: Props) => {
  return (
    <div className="relative min-w-52">
      <Input
        id="input-26"
        className="peer pe-9 ps-9"
        placeholder="Search..."
        type="search"
        onChange={(event) => props.onChange(event.currentTarget.value)}
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <Search size={16} strokeWidth={2} />
      </div>
      <button
        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Submit search"
        onClick={() => props.onClick && props.onClick()}
      >
        <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
};

export default SearchInput;
