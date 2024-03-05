"use client";

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { useConvexAuth, useMutation, useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";

export default function Home() {
  const files = useQuery(api.files.getFiles);
  const createFile = useMutation(api.files.createFile);

  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly ">
      {isAuthenticated ? "Logged in" : "Logged out or still loading"}

      <SignedIn>
        <SignOutButton>
          <Button>Sign Out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>

      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}

      <Button
        onClick={() =>
          createFile({
            name: "hello world",
          })
        }
      >
        Create file
      </Button>
    </main>
  );
}
