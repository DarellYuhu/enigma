import { badgeVariants } from "@/components/ui/badge";
import { MagicCard } from "@/components/ui/magic-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProjectSchema from "@/schemas/project";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Control, useWatch } from "react-hook-form";
import { z } from "zod";

const PreviewCard = ({
  control,
}: {
  control: Control<z.infer<typeof ProjectSchema.create>>;
}) => {
  const { gradientBgColor, description, image, links, textColor, title } =
    useWatch({
      control,
    });
  const [imageSrc, setImageSrc] = useState<string | undefined>();

  const handleFileChange = () => {
    const file = image;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string); // Set the image source
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    handleFileChange();
  }, [image]);

  if (!imageSrc) {
    return null;
  }

  return (
    <>
      <h3 className="text-lg font-semibold">Preview</h3>
      <MagicCard className="h-[430px] relative">
        <div className="absolute transition-all duration-500 ease-in-out bottom-0 left-0 w-full h-0 group-hover:h-1/5 z-10">
          <ScrollArea className="h-full bg-white/30 backdrop-blur-md">
            <div className="flex flex-col items-center p-4 gap-2 h-full">
              {links?.map((item, index) => (
                <Link
                  key={index}
                  className={badgeVariants()}
                  href={item.url!}
                  style={{
                    color: item.textColor,
                    background: item.buttonColor,
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div
          className={
            "absolute bottom-0 left-0 p-4 group-hover:opacity-0 h-full justify-end flex flex-col transition-all duration-500 ease-in-out bg-gradient-to-t from-[#ffffff]  to-40% to-transparent"
          }
          style={{
            background: `linear-gradient(to top, ${gradientBgColor}, transparent 40%)`,
            color: textColor,
          }}
        >
          <h4 className="text-lg font-semibold">{title}</h4>
          <h5 className="text-sm">{description}</h5>
        </div>
        <img src={imageSrc} alt="card_bg" className="h-full object-cover" />
      </MagicCard>
    </>
  );
};

export default PreviewCard;
