"use client";

import Image from "next/image";
import Link from "next/link";

import { useAppSelector } from "@/hooks";
import { adminNavlinks } from "@/utils";

import { PathSearchBar, UserDropdown } from "@/components";

const Header = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <header className="sticky top-0 z-[10] flex h-[60px] w-full items-center justify-between gap-4 border-b border-border-muted bg-white px-4">
      <Link href={"/"} className="w-[190px] shrink-0 lg:w-[284px]">
        <Image
          src="/images/logos/logo.svg"
          alt="logo"
          width={150}
          height={150}
          className="hidden w-[150px] sm:block sm:w-full lg:w-[220px]"
        />
        <Image
          src="/images/logos/logo-text.png"
          alt="logo"
          width={110}
          height={110}
          className="block sm:hidden"
        />
      </Link>
      <div className="flex items-center justify-end gap-4 md:w-full md:justify-between">
        <PathSearchBar navLinks={adminNavlinks} />
        {user && <UserDropdown /* displayName={true} */ />}
      </div>
    </header>
  );
};

export default Header;
