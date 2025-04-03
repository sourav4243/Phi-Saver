import Link from "next/link";
import { Button } from "./ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function DesktopNavbar() {
  return (
    <div className="flex items-center space-x-6">
      <Link
        href="/"
        className="text-sm font-medium text-white transition-colors hover:text-white"
      >
        Home
      </Link>
      <Link
        href="/contact"
        className="text-sm font-medium text-white transition-colors hover:text-white"
      >
        Contact
      </Link>


      <SignInButton mode="modal" forceRedirectUrl={"/dashboard"}>
        <Button
          variant="outline"
          className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-lg text-white"
        >
          Sign In
        </Button>
      </SignInButton>
    </div>
  );
}