// src/app/client-providers.tsx (Client Component)
"use client"; // Mark this component as a client component

import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "next-auth/react";

export default function ClientProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <TRPCReactProvider>
        <SessionProvider>{children}</SessionProvider>
      </TRPCReactProvider>
    </>
  );
}
