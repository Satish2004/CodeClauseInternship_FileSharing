import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  return (
    <div className="border-t bg-gray-50 bottom-0 w-full fixed mt-10 py-2">
      <div className="container mx-auto flex  justify-between items-center">
        <div className="flex flex-col text-gray-500 text-xs">
          <div>© 2024 File Box</div>
          <div>All rights reserved.</div>
        </div>

        <div className="flex gap-x-5">
          <Link href={"/about"}>
            <Button size={"xs"} variant={"link"} className="text-gray-500">
              About us
            </Button>
          </Link>
          <Link href={"/privacy"}>
            <Button size={"xs"} variant={"link"} className="text-gray-500">
              Privacy Policy
            </Button>
          </Link>
          <Link href={"/terms_conditions"}>
            <Button size={"xs"} variant={"link"} className="text-gray-500">
              Terms & Conditions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
