import Link from "next/link";
import Image from "next/image";
import career_support from "@/assets/career_support.png";
import { UserButton } from "@clerk/nextjs";

export default function NavigationBar() {
  return (
    <div className="p-2 shadow">
      <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
        <Link href="/main" className="flex items-center gap-1">
          <Image
            src={career_support}
            width={40}
            height={40}
            alt="A logo showing career support."
          />
          <span className="text-lg font-semibold">Issem: Career Guidance</span>
        </Link>
        <div className="mr-2 flex items-center gap-3">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: { avatorBox: { width: "5.0rem", height: "5.0rem" } },
            }}
          />
        </div>
      </div>
    </div>
  );
}
