"use client";
import useActorNetwork from "@/hooks/features/trends/useActorNetwork";
import useConfigStore from "../store/config-store";
import VisGraph from "@/components/VisGraph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dateFormatter from "@/utils/dateFormatter";

const ActorNetwork = ({ details }: { details: string }) => {
  const { category, networkDate, networkType } = useConfigStore();
  const { data } = useActorNetwork({
    category,
    date: dateFormatter("ISO", networkDate),
    rid: details,
    window: parseInt(networkType),
  });
  if (!data) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Correlation Network</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <VisGraph data={data.normalized} type="interestNet" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ActorNetwork;
