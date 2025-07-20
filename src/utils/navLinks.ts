"use client";

import { BsTruck } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";
import { HiOutlineUsers } from "react-icons/hi";
import { GiReceiveMoney } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { RiBarcodeLine, RiUserSettingsLine } from "react-icons/ri";
import { MdOutlineAttachMoney, MdOutlineShoppingCart } from "react-icons/md";

export interface INavLinks {
  label: string;
  icon?: React.ElementType;
  path?: string;
  children?: INavLinks[];
  element?: React.ElementType;
}

export const admin: INavLinks[] = [
  {
    label: "Sales Report",
    icon: VscGraphLine,
    path: "/",
  },
  {
    label: "Purchase Management",
    icon: MdOutlineShoppingCart,
    children: [
      {
        label: "Purchase Report",
        path: "/purchase-report",
      },
      {
        label: "Purchase List",
        path: "/purchase-list",
      },
      {
        label: "Create Purchase",
        path: "/create-purchase",
      },
    ],
  },

  {
    label: "Costing Report",
    icon: MdOutlineAttachMoney,
    path: "/costing-report",
  },

  {
    label: "Suppliers",
    icon: HiOutlineUsers,
    children: [
      {
        label: "Supplier Management",
        path: "/supplier-management",
      },
      {
        label: "Purchase Orders",
        path: "/purchase-order",
      },
    ],
  },
  {
    label: "Barcode Management",
    icon: RiBarcodeLine,
    path: "/barcode-generator",
  },
  {
    label: "Courier Service",
    icon: TbTruckDelivery,
    path: "/courier",
  },
  {
    label: "Partner Finance",
    icon: GiReceiveMoney,
    children: [
      {
        label: "Investments",
        path: "/investments",
      },
      {
        label: "Deposits",
        path: "/deposits",
      },
      {
        label: "Profit Distribution",
        path: "/profit-distribution",
      },
      {
        label: "Partner Dedication",
        path: "/partner-dedication",
      },
    ],
  },
  {
    label: "Admin Management",
    icon: RiUserSettingsLine,
    children: [
      {
        label: "Admin",
        path: "/manage-admins",
      },
      {
        label: "Super Admin",
        path: "/manage-super-admin",
      },
    ],
  },
  {
    icon: BsTruck,
    label: "Shipping & Tracking",
    path: "/shipping-tracking",
  },
];

const NavLinks = {
  admin,
};

export default NavLinks;
