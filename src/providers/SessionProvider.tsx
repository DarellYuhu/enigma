"use client";

import { SessionProviderProps, SessionProvider } from "next-auth/react";

const SessionProvider2 = ({ children }: SessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProvider2;
