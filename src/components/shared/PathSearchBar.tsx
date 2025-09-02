"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BsSearch } from "react-icons/bs";
import { HiChevronRight } from "react-icons/hi";

import Input from "../ui/Input";
import { INavLinks } from "@/utils";

interface SearchableLink {
  label: string;
  path: string | undefined;
  breadcrumb: string;
}
const PathSearchBar = ({ navLinks }: { navLinks: INavLinks[] }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Flatten the admin nav links with breadcrumb info
  const searchableLinks = useMemo(() => {
    const links: SearchableLink[] = [];

    for (const item of navLinks) {
      if (item.children) {
        for (const child of item.children) {
          links.push({
            label: child.label,
            path: child.path,
            breadcrumb: `${item.label} > ${child.label}`,
          });
        }
      } else {
        links.push({
          label: item.label,
          path: item.path,
          breadcrumb: item.label,
        });
      }
    }

    return links;
  }, []);

  const filteredLinks = useMemo(() => {
    return searchableLinks.filter((link) => link.label.toLowerCase().includes(query.toLowerCase()));
  }, [query, searchableLinks]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return (
    <div className="relative hidden w-full max-w-[400px] items-center md:flex">
      <div className="flex w-full items-center rounded border border-muted/50 pr-2">
        <Input
          className="border-none bg-transparent py-2"
          placeholder="Search in dashboard"
          value={query}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
          }}
          onChange={(e) => setQuery(e.target.value)}
        />
        <BsSearch />
      </div>

      {query && isOpen && (
        <div className="absolute top-[48px] left-0 z-50 max-h-[200px] w-full overflow-auto rounded bg-white shadow-md">
          {filteredLinks.length > 0 ? (
            filteredLinks.map((link) => (
              <div
                key={link.path}
                onClick={() => {
                  if (link.path) {
                    router.push(link.path);
                  }
                  setQuery("");
                }}
                className="flex items-center justify-between gap-[5px] px-4 py-2 hover:bg-dashboard/5"
              >
                <div className="flex w-full cursor-pointer flex-col">
                  <span className="cursor-pointer font-[600] text-dashboard">{link.label}</span>
                  <span className="text-[12px] text-primary/50">{link.breadcrumb}</span>
                </div>
                <HiChevronRight />
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PathSearchBar;
