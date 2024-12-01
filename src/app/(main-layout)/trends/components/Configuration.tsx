"use client";
import { Input } from "@/components/ui/input";
import useTrends from "@/hooks/features/useTrends";
import React from "react";
import useConfigStore from "../store/config-store";
import { Label } from "@/components/ui/label";
import DateRangePicker from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Configuration = ({ details }: { details: string }) => {
  const { category, level, since, until, setCategory, setDate, setLevel } =
    useConfigStore();
  const { refetch } = useTrends({
    category,
    level,
    details,
    since: since!,
    until: until!,
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration</CardTitle>
        <CardDescription>
          Modify this configuration to your needs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Category</Label>
          <Input
            type="number"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <Label>Level</Label>
          <Input
            type="number"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
        </div>
        <div>
          <Label>Date Range</Label>
          <DateRangePicker
            date={{ from: since, to: until }}
            setDate={(date) => setDate({ since: date?.from, until: date?.to })}
            numberOfMonths={2}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={!since || !until} onClick={() => refetch()}>
          Fetch
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Configuration;
