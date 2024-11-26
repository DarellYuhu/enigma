"use client";

import { DatePicker } from "@/components/DatePicker";
import React from "react";
import useConfigStore from "../hooks/config-store";

const Configuration = () => {
  const { date, setDate } = useConfigStore();
  return <DatePicker date={date} onDateChange={setDate} toDate={new Date()} />;
};

export default Configuration;
