"use client";

import { useLogoutUserMutation } from "@/redux/features/user/user.api";
import { logout as logoutAction } from "@/redux/features/user/user.slice";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect, useRef, useState } from "react";

import { FaCircleUser } from "react-icons/fa6";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";

const UserDropdown = ({ displayName = false }: { displayName?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useAppDispatch();
  const [isMouseOver, setIsMouseOver] = useState(false);

  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    dispatch(logoutAction(undefined));
    setIsOpen(false);
    await logoutUser(undefined);
    toast.success("Logout successfully");
  };

  return (
    <div className="relative hidden lg:block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center gap-[10px] text-primary"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onMouseOver={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        {user?.avatar ? (
          <Image
            src={user.avatar}
            width={30}
            height={30}
            alt="Avatar"
            className="aspect-square w-[30px] overflow-hidden rounded-full border border-quaternary/30 object-cover"
          />
        ) : (
          <FaCircleUser size={22} />
        )}
        {displayName ? (
          <span className="flex items-center justify-start gap-[1px]">
            <span className="line-clamp-1 max-w-[100px] text-[14px] font-[700] text-primary">
              {user?.fullName}
            </span>
            <FiChevronDown size={16} className="ml-[4px]" />
            {isMouseOver && (
              <div className="absolute -bottom-10 left-1/2 z-10 w-fit -translate-x-1/2 rounded bg-primary px-2 py-0.5 text-[12px] whitespace-nowrap text-white opacity-100 transition duration-200">
                Profile
              </div>
            )}
          </span>
        ) : (
          <div>
            <FiChevronDown size={16} className="ml-[4px]" />
            {isMouseOver && (
              <div className="absolute -bottom-10 left-1/2 z-10 w-fit -translate-x-1/2 rounded bg-primary px-2 py-0.5 text-[12px] whitespace-nowrap text-white opacity-100 transition duration-200">
                Profile
              </div>
            )}
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white pt-2 shadow-lg">
          {/* User Info Header */}
          <div className="border-b border-gray-100 px-4 py-3">
            <div className="flex items-center space-x-3">
              {user?.avatar ? (
                <div className="aspect-square w-[40px] overflow-hidden rounded-full border border-quaternary/30">
                  <Image
                    src={user?.avatar}
                    width={40}
                    height={40}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <Image
                  src="/images/avatar.jpg"
                  alt="user-icon"
                  width={40}
                  height={40}
                  className="rounded-full border border-border-muted object-cover"
                />
              )}
              <div>
                <p className="text-[14px] font-medium capitalize">{user?.fullName}</p>
                <p className="text-[12px] text-info capitalize">{user?.role ? String(user.role) : ""}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div>
            <Link
              href="/account/profile"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center space-x-[12px] border-b border-gray-200 px-[16px] py-[12px] text-[14px] text-primary transition-colors duration-150 hover:bg-gray-50"
            >
              <FiUser className="h-[16px] w-[16px]" />
              <span>Profile</span>
            </Link>

            <button
              onClick={() => handleLogout()}
              className="flex w-full cursor-pointer items-center space-x-[12px] px-[16px] py-[12px] text-[14px] text-primary transition-colors duration-150 hover:bg-gray-50"
            >
              <FiLogOut className="h-[16px] w-[16px]" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
