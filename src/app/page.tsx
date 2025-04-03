import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import ModeToggle from "@/components/ModeToggle";


export default function Home() {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
      
      <ModeToggle/>
    </>
  );
}
