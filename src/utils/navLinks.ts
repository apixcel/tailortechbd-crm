"use client";

import { MdOutlineAttachMoney, MdOutlineInventory2 } from "react-icons/md";
import { RiBarcodeLine, RiUserSettingsLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";

import { HiOutlineUsers } from "react-icons/hi";
import { GiReceiveMoney } from "react-icons/gi";
import { BsTruck } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";

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
    label: "Purchases",
    icon: MdOutlineInventory2,
    children: [
      {
        label: "Purchase Report",
        path: "/purchase-report",
      },
      {
        label: "Purchase Management",
        path: "/purchase-management",
      },
    ],
  },
  {
    label: "Costing & Expenses",
    icon: MdOutlineAttachMoney,
    children: [
      {
        label: "Costing Report",
        path: "/costing-report",
      },
      {
        label: "Expense Tracking",
        path: "/expense-tracking",
      },
    ],
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
    label: "User Management",
    icon: RiUserSettingsLine,
    children: [
      {
        label: "Admins",
        path: "/manage-admins",
      },
      {
        label: "Customers",
        path: "/manage-customers",
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
