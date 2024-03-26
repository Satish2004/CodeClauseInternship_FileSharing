"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { Grid2X2Icon, Loader, Rows3Icon } from "lucide-react";
import { useOrganization, useUser } from "@clerk/nextjs";

import { api } from "@/convex/_generated/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FileCard } from "@/app/dashboard/_components/file-card";
import { SearchBar } from "@/app/dashboard/_components/search-bar";

import { EmptyFiles } from "./empty-cards";
import { EmptyFavorite } from "./empty-cards";
import { EmptyTrash } from "./empty-cards";
import { DataTable } from "./file-table";
import { columns } from "./column";

interface FileBrowserProps {
  title: string;
  favoritesOnly?: boolean;
  deletedOnly?: boolean;
}

export function FileBrowser({
  title,
  favoritesOnly,
  deletedOnly,
}: FileBrowserProps) {
  const user = useUser();
  const organization = useOrganization();
  const [query, setQuery] = useState("");

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(
    api.files.getFiles,
    orgId ? { orgId, query, favorites: favoritesOnly, deletedOnly } : "skip"
  );

  const favoritesFiles = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  );

  const isLoading = files === undefined;

  const modifiedFiles =
    files?.map((file) => ({
      ...file,
      isFavorite: (favoritesFiles ?? []).some(
        (favorite) => favorite.fileId === file._id
      ),
    })) ?? [];

  return (
    <div>
      <div className="w-full">
        <div className="flex justify-between items-center mb-9">
          <h1 className="text-2xl">{title}</h1>

          <div className={"lg:block md:block hidden"}>
            <SearchBar query={query} setQuery={setQuery} />
          </div>
        </div>

        <Tabs defaultValue="grid">
          <TabsList className="mb-2">
            <TabsTrigger value="grid" className="flex items-center gap-2">
              <Grid2X2Icon /> Grid
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center gap-2">
              <Rows3Icon /> Table
            </TabsTrigger>
          </TabsList>

          {isLoading && (
            <div className="flex flex-col w-full h-full items-center justify-center mt-[8%]">
              <Loader className="h-8 w-8 animate-spin text-gray-600" />
              <div className="text-gray-600 mt-4">Loading.</div>
            </div>
          )}

          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {modifiedFiles?.map((file) => {
                return <FileCard key={file._id} file={file} />;
              })}
            </div>
          </TabsContent>
          <TabsContent value="table">
            <DataTable columns={columns} data={modifiedFiles} />
          </TabsContent>
        </Tabs>

        {files?.length === 0 &&
          (favoritesOnly ? (
            <EmptyFavorite />
          ) : deletedOnly ? (
            <EmptyTrash />
          ) : (
            <EmptyFiles />
          ))}
      </div>
    </div>
  );
}
