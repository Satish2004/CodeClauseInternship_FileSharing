"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { useOrganization, useUser } from "@clerk/nextjs";

import { api } from "@/convex/_generated/api";

import { cn } from "@/lib/utils";
import { SideNav } from "./_components/side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUser();
  const organization = useOrganization();
  const [query] = useState("");

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId, query } : "skip");
  const isLoading = files === undefined;

  return (
    <main className={cn("container mx-auto", !isLoading ? "pt-8" : "pt-0")}>
      <div className="flex gap-8">
        <SideNav />

        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}
