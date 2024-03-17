"use client";

import { useQuery } from "convex/react";
import { useOrganization, useUser } from "@clerk/nextjs";

import { api } from "@/convex/_generated/api";

import UploadButton from "./_components/upload-button";

export default function Home() {
  const user = useUser();
  const organization = useOrganization();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");

  return (
    <main className="container mx-auto pt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your files</h1>
        <UploadButton />
      </div>

      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}
    </main>
  );
}
