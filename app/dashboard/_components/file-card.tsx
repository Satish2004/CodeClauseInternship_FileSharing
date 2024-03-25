import Image from "next/image";
import { ReactNode } from "react";
import { useQuery } from "convex/react";
import {
  FileTextIcon,
  GanttChartIcon,
  ImageIcon,
  LoaderIcon,
} from "lucide-react";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { FileCardAction } from "./file-card-action";
import { formatRevalidate } from "next/dist/server/lib/revalidate";

interface FileCardProps {
  file: Doc<"files">;
  favorites: Doc<"favorites">[];
}

export function FileCard({ file, favorites }: FileCardProps) {
  const typeIcons = {
    image: <ImageIcon className="w-6 h-6" />,
    pdf: <FileTextIcon className="w-6 h-6" />,
    csv: <GanttChartIcon className="w-6 h-6" />,
  } as Record<Doc<"files">["type"], ReactNode>;

  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  });

  const imageSrc = useQuery(api.files.getStorageInfo, {
    storageId: file.fileId,
  });

  if (!imageSrc) {
    return (
      <div className="h-[150px] flex justify-center items-center">
        <LoaderIcon className="w-4 h-4 animate-spin text-gray-600" />
      </div>
    );
  }

  const isFavorite = favorites.some(
    (favorites) => favorites.fileId === file._id
  );

  return (
    <Card className=" bg-gray-100 hover:bg-gray-200">
      <CardHeader className="relative p-4">
        <CardTitle className="flex gap-x-2 items-center text-base font-normal">
          <div className="flex justify-center">{typeIcons[file.type]}</div>
          <div>{file.name}</div>
        </CardTitle>
        <div className="absolute top-3 right-2">
          <FileCardAction file={file} isFavorite={isFavorite} />
        </div>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent className="h-[125px] flex justify-center items-center bg-white mx-2 rounded-lg p-1">
        {file.type === "image" && (
          <Image
            alt={file.name}
            width={"60"}
            height={"60"}
            src={imageSrc}
            priority
            style={{ width: "auto", height: "auto" }}
          />
        )}

        {file.type === "csv" && <GanttChartIcon className="w-20 h-20" />}
        {file.type === "pdf" && <FileTextIcon className="w-20 h-20" />}
      </CardContent>
      <CardFooter className="flex justify-between py-4">
        <div className="flex items-center gap-2 text-xs text-gray-600 w-40">
          <Avatar className="w-6 h-6">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>{userProfile?.name}</AvatarFallback>
          </Avatar>
          <div>{userProfile?.name?.split(" ")[0] ?? ""}</div>
        </div>
        <div className=" text-[9px] text-gray-700">
          Uploaded on {formatRelative(new Date(file._creationTime), new Date())}
        </div>
      </CardFooter>
    </Card>
  );
}
