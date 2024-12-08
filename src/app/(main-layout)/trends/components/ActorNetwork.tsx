"use client";
import useActorNetwork from "@/hooks/features/trends/useActorNetwork";
import useConfigStore from "../store/config-store";
import VisGraph from "@/components/VisGraph";
import { Card, CardContent } from "@/components/ui/card";
import dateFormatter from "@/utils/dateFormatter";

const ActorNetwork = ({ details }: { details: string }) => {
  const { category, networkDate, networkType } = useConfigStore();
  const { data } = useActorNetwork({
    category,
    date:
      typeof networkDate === "string"
        ? networkDate
        : dateFormatter("ISO", networkDate),
    rid: details,
    window: parseInt(networkType),
  });
  if (!data) return null;
  return (
    <Card className="h-full">
      <CardContent className="p-6 h-full">
        <div className="h-full">
          <VisGraph data={data.normalized} type="interestNet" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ActorNetwork;
