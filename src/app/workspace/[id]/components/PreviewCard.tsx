import { badgeVariants } from "@/components/ui/badge";
import { MagicCard } from "@/components/ui/magic-card";
import { cn } from "@/lib/utils";
import ProjectSchema from "@/schemas/project";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { z } from "zod";

const PreviewCard = ({
  item,
}: {
  item: z.infer<typeof ProjectSchema.create>;
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleFileChange = () => {
    const file = item.image;
    if (file) {
      const reader = new FileReader();
      return (reader.onload = () => {
        setImageSrc(reader.result as string); // Set the image source
      });
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    handleFileChange();
  }, [item]);

  return (
    <MagicCard className="relative col-span-3 h-[450px] w-full aspect-3/4 border-none shadow-md">
      <img
        alt="picture"
        // loader={customLoader}
        src={imageSrc || ""}
        width={"100"}
        height={"100"}
        className="w-full h-full object-cover"
      />
      <div className="absolute group flex flex-col justify-end bottom-0 left-0 text-left h-full bg-gradient-to-t from-[rgba(255,255,255,1)]  to-40% to-[rgba(255,255,255,0)] w-full">
        <div className="p-4 group-hover:opacity-0 transition-all duration-500 ease-in-out">
          <h4 className="text-lg font-semibold">{item.title}</h4>
          <h5 className="text-sm">{item.description}</h5>
        </div>
      </div>
      <div className="absolute transition-all duration-500 ease-in-out bottom-0 left-0 w-full h-0 group-hover:h-1/5  overflow-y-auto">
        <div className="bg-white/30 flex flex-col items-center p-4 gap-2 backdrop-blur-md h-full">
          {item.links.map((item, index) => (
            <Link
              key={index}
              className={cn(badgeVariants(), "col-span-4")}
              href={item.url}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </MagicCard>
  );
};

export default PreviewCard;
