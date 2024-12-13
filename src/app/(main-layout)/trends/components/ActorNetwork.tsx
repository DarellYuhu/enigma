"use client";
import useActorNetwork from "@/hooks/features/trends/useActorNetwork";
import useConfigStore from "../store/config-store";
import VisGraph from "@/components/VisGraph";
import { Card, CardContent } from "@/components/ui/card";
import dateFormatter from "@/utils/dateFormatter";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Expand } from "lucide-react";
import { Button } from "@/components/ui/button";

const ActorNetwork = ({ details }: { details: string }) => {
  const { category, networkDate, networkType } = useConfigStore();
  const { data, isPending } = useActorNetwork({
    category,
    date:
      typeof networkDate === "string"
        ? networkDate
        : dateFormatter("ISO", networkDate),
    rid: details,
    window: parseInt(networkType),
  });

  if (isPending) return <Skeleton className="h-96 w-full" />;

  if (!data) return null;
  return (
    <Card className="relative h-full">
      <CardContent className="p-6 h-full">
        <div className="h-full">
          <VisGraph data={data.normalized} type="interestNet" />
        </div>
      </CardContent>
      <Dialog>
        <DialogTrigger className="absolute top-2 right-2">
          <Button size={"icon"} variant={"ghost"}>
            <Expand size={14} />
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[90%] h-[90%]">
          <VisGraph data={data.normalized} type="interestNet" />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ActorNetwork;
