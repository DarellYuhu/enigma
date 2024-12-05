"use client";
import { badgeVariants } from "@/components/ui/badge";
import { MagicCard } from "@/components/ui/magic-card";
import useWorkspace from "@/hooks/features/workspace/useWorkspace";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import DeleteSectionDialog from "./DeleteSectionDialog";
import DeleteProjectDialog from "./DeleteProjectDialog";

const MainContent = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useWorkspace(params.id);
  if (isLoading) return <div>Loading</div>;
  else if (!data) return null;

  return (
    <div className="p-10 text-center relative">
      <h1 className="text-6xl font-bold mt-8">{data.data.name}</h1>
      <h3 className="text-xl p-20 text-gray-400">{data.data.description}</h3>
      <div className="space-y-8">
        {Object.values(data.normalized).map((item) => (
          <div className="space-y-4" key={item.id}>
            <div className="flex flex-row justify-between">
              <h2 className="text-2xl font-bold">{item.name}</h2>
              <DeleteSectionDialog
                section={{
                  id: item.id,
                  name: item.name,
                  workspaceId: item.workspaceId,
                }}
              />
            </div>
            <div className="grid grid-cols-12 gap-10">
              {item.projects?.map((item, index) => (
                <MagicCard
                  className="relative col-span-3 transition-all ease-in-out duration-300 hover:scale-105 h-354 w-472 aspect-3/4"
                  key={index}
                >
                  <img
                    alt="picture"
                    // loader={customLoader}
                    src={`/api/${item.imageUrl}`}
                    width={"100"}
                    height={"100"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute group flex flex-col justify-end bottom-0 left-0 text-left h-full bg-gradient-to-t from-[rgba(255,255,255,1)] to-transparent w-full">
                    <div className="p-4">
                      <h4 className="text-lg font-semibold">{item.title}</h4>
                      <h5 className="text-sm">{item.description}</h5>
                    </div>
                    <div className="absolute transition-all duration-500 ease-in-out bottom-0 left-0 w-full h-0 group-hover:h-2/5  overflow-y-auto">
                      <div className="bg-white/30 flex flex-col items-center p-4 gap-2 backdrop-blur-md h-full">
                        {item.Link.map((item, index) => (
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
                  </div>
                  <DeleteProjectDialog
                    projectId={item.id}
                    projectName={item.title}
                    workspaceId={data.data.id}
                  />
                </MagicCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
