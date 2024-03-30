import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import {
  Download,
  LoaderIcon,
  MoreVertical,
  Star,
  Trash2,
  Undo,
} from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Protect } from "@clerk/nextjs";

interface FileCardActionProps {
  file: Doc<"files">;
  isFavorite?: boolean;
}

export function FileCardAction({ file, isFavorite }: FileCardActionProps) {
  const deleteFile = useMutation(api.files.deleteFile);
  const restoreFile = useMutation(api.files.restoreFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);

  const imageSrc = useQuery(api.files.getStorageInfo, {
    storageId: file.fileId,
  });

  const me = useQuery(api.users.getMe);

  const { toast } = useToast();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  if (!imageSrc) {
    return (
      <div className="h-[150px] flex justify-center items-center">
        <LoaderIcon className="w-5 h-5 animate-spin text-gray-800" />
      </div>
    );
  }

  const handleDeleteFile = async () => {
    await deleteFile({ fileId: file._id });

    toast({
      variant: "default",
      title: "File moved to trash!",
      description: "You can restore it later if you want.",
      duration: 3000,
    });
  };

  const handleRestoreFile = async () => {
    await restoreFile({ fileId: file._id });

    toast({
      variant: "default",
      title: "File restored!",
      description: "Your file restored successfully.",
      duration: 3000,
    });
  };

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will mark the file for deletion and move it to the
              trash.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteFile}
              className="bg-red-600 hover:bg-red-700"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="w-6 h-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              window.open(imageSrc, "_blank");
            }}
            className="gap-2 flex justify-between items-center cursor-pointer"
          >
            Download
            <Download className="w-4 h-4 " />
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              toggleFavorite({ fileId: file._id });
            }}
            className="gap-2 flex justify-between items-center cursor-pointer"
          >
            {isFavorite ? (
              <>
                Unfavorite
                <Star className="w-4 h-4 text-yellow-500" />
              </>
            ) : (
              <>
                Favorite
                <Star className="w-4 h-4" />
              </>
            )}
          </DropdownMenuItem>

          <Protect
            condition={(check) => {
              return (
                check({
                  role: "org:admin",
                }) || file.userId === me?._id
              );
            }}
            fallback={
              <p className="text-xs px-2 py-1.5">
                You do not have the permission delete this file.
              </p>
            }
          >
            <DropdownMenuItem
              onClick={() => {
                if (file.isMarkedForDeletion) {
                  handleRestoreFile();
                } else {
                  setIsConfirmOpen(true);
                }
              }}
              className="gap-2 flex justify-between items-center cursor-pointer"
            >
              {file.isMarkedForDeletion ? (
                <>
                  Restore
                  <Undo className="w-4 h-4 text-green-600" />
                </>
              ) : (
                <>
                  Trash
                  <Trash2 className="w-4 h-4 text-red-600" />
                </>
              )}
            </DropdownMenuItem>
          </Protect>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
