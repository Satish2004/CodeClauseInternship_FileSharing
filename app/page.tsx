"use client";

import { useQuery } from "convex/react";
import { useOrganization, useUser } from "@clerk/nextjs";

import { api } from "@/convex/_generated/api";

import UploadButton from "./_components/upload-button";
import { FileCard } from "./_components/file-card";
import Image from "next/image";
import { Loader } from "lucide-react";

export default function Home() {
  const user = useUser();
  const organization = useOrganization();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  const isLoading = files === undefined;

  return (
    <main className="container mx-auto pt-10">
      {isLoading && (
        <div className="flex flex-col w-full h-full items-center justify-center mt-[15%]">
          <Loader className="h-8 w-8 animate-spin text-gray-600" />
          <div className="text-gray-600 mt-4">Loading.</div>
        </div>
      )}

      {!isLoading && files.length === 0 && (
        <div className="flex flex-col gap-8 w-full items-center mt-12">
          <Image
            src={"/assets/empty-box.svg"}
            alt="Empty box"
            height={250}
            width={250}
          />
          <div className="flex text-xl items-center justify-center">
            You have no files yet, upload one now!
          </div>
          <UploadButton />
        </div>
      )}

      {!isLoading && files.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Your files</h1>
            <UploadButton />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {files?.map((file) => {
              return <FileCard key={file._id} file={file} />;
            })}
          </div>
        </>
      )}
    </main>
  );
}
