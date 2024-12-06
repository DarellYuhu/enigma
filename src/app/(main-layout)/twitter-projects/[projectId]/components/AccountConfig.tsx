"use client";

import { DatePicker } from "@/components/DatePicker";

import useAccountStore from "../store/account-config-store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const AccountConfig = () => {
  const searchParams = useSearchParams();
  const dateParams = searchParams.get("date");
  const { date, setDate } = useAccountStore();

  useEffect(() => {
    if (dateParams) setDate(new Date(dateParams));
  }, [dateParams]);
  return (
    <div className="flex justify-self-end">
      <DatePicker
        date={date}
        onDateChange={(value) => value && setDate(value)}
      />
    </div>
  );
};

export default AccountConfig;
