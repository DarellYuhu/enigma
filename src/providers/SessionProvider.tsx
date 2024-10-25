"use client";

import { SessionProviderProps, SessionProvider } from "next-auth/react";
import React from "react";

const SessionProvider2 = ({ children }: SessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProvider2;
