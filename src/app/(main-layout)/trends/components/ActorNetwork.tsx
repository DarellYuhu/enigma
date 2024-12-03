"use client";
import useActorNetwork from "@/hooks/features/trends/useActorNetwork";
import useConfigStore from "../store/config-store";
import VisGraph from "@/components/VisGraph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ActorNetwork = ({ details }: { details: string }) => {
  const { category } = useConfigStore();
  const { data } = useActorNetwork({
    category,
    date: "",
    rid: details,
    window: 60,
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
