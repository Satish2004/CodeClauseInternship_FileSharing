import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="border-b py-3 bg-gray-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src={"/assets/file-box-logo.png"}
            alt="FileBox Logo"
            width={60}
            height={60}
            priority
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        <div className="flex gap-x-4 items-center justify-center">
          <div className="pt-1">
            <OrganizationSwitcher />
          </div>
          <UserButton />
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Header;
