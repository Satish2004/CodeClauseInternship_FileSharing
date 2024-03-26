"use client";

import { useQuery } from "convex/react";
import { ColumnDef } from "@tanstack/react-table";
import { formatRelative } from "date-fns";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileCardAction } from "./file-card-action";

function UserCell({ userId }: { userId: Id<"users"> }) {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: userId,
  });

  return (
    <div className="flex items-center gap-2">
      <Avatar className="w-6 h-6">
        <AvatarImage src={userProfile?.image} />
        <AvatarFallback>{userProfile?.name}</AvatarFallback>
      </Avatar>
      <div>{userProfile?.name}</div>
    </div>
  );
}

export const columns: ColumnDef<Doc<"files"> & { isFavorite: boolean }>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "type",
    header: "Type",
  },
  {
    header: "User",
    cell: ({ row }) => {
      return <UserCell userId={row.original.userId} />;
    },
  },
  {
    header: "Uploaded on",
    cell: ({ row }) => {
      const formattedDate = formatRelative(
        new Date(row.original._creationTime),
        new Date()
      );

      return (
        <div>
          {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
        </div>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start">
          <FileCardAction
            file={row.original}
            isFavorite={row.original.isFavorite}
          />
        </div>
      );
    },
  },
];
