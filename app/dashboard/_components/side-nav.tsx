"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery } from "convex/react";
import { FileIcon, Star, Trash2 } from "lucide-react";
import { useOrganization, useUser } from "@clerk/nextjs";

import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";
import UploadButton from "./upload-button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SideNav() {
  const user = useUser();
  const organization = useOrganization();
  const [query] = useState("");
  const pathname = usePathname();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId, query } : "skip");
  const isLoading = files === undefined;

  return (
    <>
      {!isLoading && (
        <div className="w-40 justify-start">
          <div className="mb-7">
            <UploadButton />
          </div>

          <div className="flex flex-col justify-start gap-2 w-full">
            <Link
              href="/dashboard/files"
              className={cn(
                "hover:bg-gray-100  border border-white rounded-lg",
                {
                  "bg-gray-100 border-gray-300":
                    pathname.includes("/dashboard/files"),
                }
              )}
            >
              <Button variant={"link"} className="gap-4">
                <FileIcon />
                All files
              </Button>
            </Link>

            <Link
              href="/dashboard/favorites"
              className={cn(
                "hover:bg-gray-100  border border-white rounded-lg",
                {
                  "bg-gray-100 border-gray-300": pathname.includes(
                    "/dashboard/favorites"
                  ),
                }
              )}
            >
              <Button variant={"link"} className="gap-4">
                <Star />
                Favorites
              </Button>
            </Link>

            <Link
              href="/dashboard/trash"
              className={cn(
                "hover:bg-gray-100  border border-white rounded-lg",
                {
                  "bg-gray-100 border-gray-300":
                    pathname.includes("/dashboard/trash"),
                }
              )}
            >
              <Button variant={"link"} className="gap-4">
                <Trash2 />
                Trash
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
