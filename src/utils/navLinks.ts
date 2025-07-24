"use client";

import { VscGraphLine } from "react-icons/vsc";
import { HiOutlineUsers } from "react-icons/hi";
import { GiReceiveMoney } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { RiUserSettingsLine } from "react-icons/ri";
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
        label: "Create Purchase",
        path: "/create-purchase",
      },
      {
        label: "Purchase List",
        path: "/purchase-list",
      },
    ],
  },
  {
    label: "Costing Management",
    icon: MdOutlineAttachMoney,
    children: [
      {
        label: "Costing Report",
        path: "/costing-report",
      },
      {
        label: "Create Costing",
        path: "/create-costing",
      },
      {
        label: "Costing List",
        path: "/costing-list",
      },
    ],
  },
  {
    label: "Suppliers Management",
    icon: HiOutlineUsers,
    children: [
      {
        label: "Create Supplier",
        path: "/create-supplier",
      },
      {
        label: "Supplier List",
        path: "/supplier-list",
      },
    ],
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
];

const NavLinks = {
  admin,
};

export default NavLinks;
