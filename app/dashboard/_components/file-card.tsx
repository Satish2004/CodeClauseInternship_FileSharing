import Image from "next/image";
import { ReactNode } from "react";
import {
  FileTextIcon,
  GanttChartIcon,
  ImageIcon,
  LoaderIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Doc, Id } from "@/convex/_generated/dataModel";

import { FileCardAction } from "./file-card-action";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface FileCardProps {
  file: Doc<"files">;
}

export function FileCard({ file }: FileCardProps) {
  const typeIcons = {
    image: <ImageIcon className="w-6 h-6" />,
    pdf: <FileTextIcon className="w-6 h-6" />,
    csv: <GanttChartIcon className="w-6 h-6" />,
  } as Record<Doc<"files">["type"], ReactNode>;

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

  return (
    <Card className=" bg-gray-100 hover:bg-gray-200">
      <CardHeader className="relative p-4">
        <CardTitle className="flex gap-x-2 items-center">
          <div className="flex justify-center">{typeIcons[file.type]}</div>
          <div className="text-base font-normal">{file.name}</div>
        </CardTitle>
        <div className="absolute top-3 right-2">
          <FileCardAction file={file} />
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
      <CardFooter className="flex justify-center p-4">
        <Button
          size={"sm"}
          onClick={() => {
            window.open(imageSrc, "_blank");
          }}
        >
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
