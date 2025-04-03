import Link from "next/link";
import { Button } from "./ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function DesktopNavbar() {
  return (
    <div className="flex items-center space-x-6">
      <Link
        href="/"
        className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
      >
        Home
      </Link>
      <Link
        href="/contact"
        className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
      >
        Contact
      </Link>

      <SignInButton mode="modal">
        <Button
          variant="outline"
          className="ml-4 border-white/20 text-white hover:bg-white/10"
        >
          Sign In
        </Button>
      </SignInButton>
    </div>
  );
}