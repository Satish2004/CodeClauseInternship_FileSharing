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
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
  } as Record<Doc<"files">["type"], ReactNode>;

  const imageSrc = useQuery(api.files.getStorageInfo, {
    storageId: file.fileId,
  });

  if (!imageSrc) {
    return <LoaderIcon className="w-4 h-4 animate-spin" />;
  }

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2">
          <div className="flex justify-center">{typeIcons[file.type]}</div>
          {file.name}
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardAction file={file} />
        </div>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent className="h-[200px] flex justify-center items-center">
        {file.type === "image" && (
          <Image alt={file.name} width={"100"} height={"100"} src={imageSrc} />
        )}

        {file.type === "csv" && <GanttChartIcon className="w-20 h-20" />}
        {file.type === "pdf" && <FileTextIcon className="w-20 h-20" />}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
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
