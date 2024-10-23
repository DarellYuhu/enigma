import abbreviateNumber from "@/utils/abbreviateNumber";
import React, { useMemo } from "react";

type Props = {
  dataKey: "comment" | "like" | "view";
  value?: number;
  selected: "comment" | "like" | "view";
  onClick: (category: "comment" | "like" | "view") => void;
};

const CategoryButton = ({ dataKey, value, onClick, selected }: Props) => {
  const label = useMemo(() => {
    switch (dataKey) {
      case "comment":
        return "Comments";
      case "view":
        return "Views";
      case "like":
        return "Likes";
      default:
        return "No Label";
    }
  }, [dataKey]);
  return (
    <button
      className={`card text-center space-y-2 w-full ${
        selected === dataKey ? "border border-red-500" : ""
      }`}
      onClick={() => onClick(dataKey)}
    >
      <h3 className="text-3xl font-semibold">{abbreviateNumber(value ?? 0)}</h3>
      <p>{label}</p>
    </button>
  );
};

export default CategoryButton;
