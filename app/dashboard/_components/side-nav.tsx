"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileIcon, Star, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import UploadButton from "./upload-button";

export function SideNav() {
  const pathname = usePathname();

  return (
    <div className="w-40 justify-start">
      <div className="mb-7">
        <UploadButton />
      </div>

      <div className="flex flex-col justify-start gap-2 w-full">
        <Link
          href="/dashboard/files"
          className={cn("hover:bg-gray-100  border border-white rounded-lg", {
            "bg-gray-100 border-gray-300":
              pathname.includes("/dashboard/files"),
          })}
        >
          <Button variant={"link"} className="gap-4">
            <FileIcon />
            All files
          </Button>
        </Link>

        <Link
          href="/dashboard/favorites"
          className={cn("hover:bg-gray-100  border border-white rounded-lg", {
            "bg-gray-100 border-gray-300": pathname.includes(
              "/dashboard/favorites"
            ),
          })}
        >
          <Button variant={"link"} className="gap-4">
            <Star />
            Favorites
          </Button>
        </Link>

        <Link
          href="/dashboard/trash"
          className={cn("hover:bg-gray-100  border border-white rounded-lg", {
            "bg-gray-100 border-gray-300":
              pathname.includes("/dashboard/trash"),
          })}
        >
          <Button variant={"link"} className="gap-4">
            <Trash2 />
            Trash
          </Button>
        </Link>
      </div>
    </div>
  );
}
