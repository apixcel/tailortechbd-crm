"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { GoChevronDown } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";

import { adminNavlinks, INavLinks } from "@/utils";

const NavBox = ({
  navlink,
  depth = 0,
  setIsNavOpen,
}: {
  navlink: INavLinks;
  depth?: number;
  setIsNavOpen: (value: boolean) => void;
}) => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const Icon = navlink.icon;
  const hasChildren = navlink.children && navlink.children.length > 0;

  const isChildActive = (link: INavLinks): boolean => {
    return link.children?.some((child) => child.path === path || isChildActive(child)) || false;
  };

  const isDirectlyActive = path === navlink.path;
  const isDescendantActive = isChildActive(navlink);
  const isActive = isDirectlyActive || isDescendantActive;
  const isMainParent = depth === 0;

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen((prev) => !prev);
    }
  };

  // Update height when open
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className={"relative"}>
      {hasChildren ? (
        <div
          className={`flex cursor-pointer items-center justify-between gap-[8px] px-[16px] py-[10px] text-sm font-medium hover:text-primary ${
            isMainParent && isDescendantActive ? "bg-dashboard/5 text-dashboard" : "text-primary"
          }`}
          onClick={handleToggle}
        >
          <div className={`flex items-center gap-[8px] text-[15px] font-[600]`}>
            {Icon ? <Icon className="h-4 w-4" /> : ""}
            <span className="select-none">{navlink.label}</span>
          </div>
          <GoChevronDown className={`h-4 w-4 ${isOpen ? "rotate-180" : ""} duration-300`} />
          {navlink.element ? <navlink.element /> : ""}
        </div>
      ) : (
        <Link
          href={navlink.path || "#"}
          className={`flex cursor-pointer items-center gap-2 rounded-[8px] px-[16px] py-[10px] text-[15px] font-[600] hover:text-primary ${
            isDirectlyActive
              ? isMainParent
                ? "bg-dashboard/5 text-dashboard"
                : "text-dashboard"
              : "text-primary"
          }`}
          onClick={() => {
            if (typeof window !== "undefined" && window.innerWidth <= 750) {
              setIsNavOpen(false);
            }
          }}
        >
          {depth !== 0 ? (
            <span
              className={`h-[6px] w-[6px] shrink-0 rounded-full border-[1px] border-dashboard ${
                isActive ? "bg-dashboard" : "bg-transparent"
              }`}
            />
          ) : (
            ""
          )}
          {Icon ? <Icon className="h-4 w-4" /> : ""}
          <span className="line-clamp-1 select-none">{navlink.label}</span>
          {navlink.element ? <navlink.element /> : ""}
        </Link>
      )}

      {hasChildren && (
        <div
          ref={contentRef}
          className="ml-4 overflow-hidden pl-2 transition-[max-height] duration-[0.5s] ease-in-out"
          style={{
            maxHeight: isOpen ? `${contentHeight}px` : "0px",
          }}
        >
          {navlink.children?.map((child, index) => (
            <NavBox key={index} navlink={child} depth={depth + 1} setIsNavOpen={setIsNavOpen} />
          ))}
        </div>
      )}
    </div>
  );
};

const SideBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 750) {
        setIsNavOpen(false);
      } else {
        setIsNavOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className={`h-[calc(100dvh-60px)] shrink-0 overflow-x-hidden bg-white px-[10px] transition-[width] duration-[0.3s] ease-in-out ${
          window.innerWidth <= 750 ? "absolute top-0 left-0 z-[10] min-h-screen" : ""
        } ${isNavOpen ? "w-[300px]" : "w-0"}`}
      >
        <div className={`relative h-full w-full`}>
          <div className="smoothBar h-full w-full flex-col justify-between overflow-x-hidden overflow-y-auto pt-[20px] pb-[20px] lg:flex">
            <div className="flex flex-col gap-[0]">
              {adminNavlinks?.map((link, index) => (
                <NavBox
                  navlink={link}
                  key={index + (link.path || "parent")}
                  setIsNavOpen={setIsNavOpen}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute ${isNavOpen ? "left-[284px]" : "left-0"} top-[60px] z-[11] flex h-[calc(100dvh-60px)] items-center`}
      >
        <button
          onClick={toggleNav}
          className={`flex h-[30] w-[30px] cursor-pointer items-center justify-center rounded-full border border-quaternary bg-white ${isNavOpen ? "" : "rotate-180"}`}
          title={isNavOpen ? "Click to close sidebar" : "Click to open sidebar"}
        >
          <IoIosArrowBack size={20} />
        </button>
      </div>
    </>
  );
};

export default SideBar;
