"use client";

import { DatePicker } from "@/components/DatePicker";
import React from "react";
import useAccountStore from "../store/account-config-store";

const AccountConfig = () => {
  const { date, setDate } = useAccountStore();
  return (
    <div className="flex justify-self-end">
      <DatePicker date={date} onDateChange={setDate} />
    </div>
  );
};

export default AccountConfig;
