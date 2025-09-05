"use client";

import { ROLE_ACTIONS } from "@/constants/roleAction";
import { GiReceiveMoney } from "react-icons/gi";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineAttachMoney, MdOutlineShoppingCart } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { VscGraphLine } from "react-icons/vsc";

export interface INavLinks {
  label: string;
  icon?: React.ElementType;
  path?: string;
  children?: INavLinks[];
  element?: React.ElementType;
  action?: string;
}

export const adminNavlinks: INavLinks[] = [
  {
    label: "Sales Report",
    icon: VscGraphLine,
    path: "/",
    action: ROLE_ACTIONS.VIEW_SALES_REPORT.value,
  },
  {
    label: "Purchase Management",
    icon: MdOutlineShoppingCart,
    children: [
      {
        label: "Purchase Report",
        path: "/purchase-report",
        action: ROLE_ACTIONS.VIEW_PURCHASE_REPORT.value,
      },
      {
        label: "Create Purchase",
        path: "/create-purchase",
        action: ROLE_ACTIONS.CREATE_PURCHASE.value,
      },
      {
        label: "Purchase List",
        path: "/purchase-list",
        action: ROLE_ACTIONS.VIEW_PURCHASE_LIST.value,
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
        action: ROLE_ACTIONS.VIEW_COSTING_REPORT.value,
      },
      {
        label: "Create Costing",
        path: "/create-costing",
        action: ROLE_ACTIONS.CREATE_COSTING.value,
      },
      {
        label: "Costing List",
        path: "/costing-list",
        action: ROLE_ACTIONS.VIEW_COSTING_LIST.value,
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
        action: ROLE_ACTIONS.CREATE_SUPPLIER.value,
      },
      {
        label: "Supplier List",
        path: "/supplier-list",
        action: ROLE_ACTIONS.VIEW_SUPPLIER_LIST.value,
      },
      {
        label: "Supplier Payments List",
        path: "/supplier-payments-list",
        action: ROLE_ACTIONS.VIEW_SUPPLIER_PAYMENTS_LIST.value,
      },
    ],
  },
  {
    label: "Partner Finance",
    icon: GiReceiveMoney,
    children: [
      {
        label: "Capitals",
        path: "/capitals",
        action: ROLE_ACTIONS.VIEW_CAPITAL_LIST.value,
      },
      {
        label: "Investments",
        path: "/investments",
        action: ROLE_ACTIONS.VIEW_INVESTMENT_LIST.value,
      },
      {
        label: "Profit Withdrawal",
        path: "/profit-withdrawal",
        action: ROLE_ACTIONS.VIEW_WITHDRAWAL_LIST.value,
      },
      {
        label: "Profit Balance",
        path: "/profit-balance",
        action: ROLE_ACTIONS.VIEW_PROFIT_DISTRIBUTION.value,
      },
      {
        label: "Partner List",
        path: "/partner-list",
        action: ROLE_ACTIONS.VIEW_PARTNERS.value,
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
        action: ROLE_ACTIONS.VIEW_ADMINS.value,
      },
      {
        label: "Role & Permission",
        path: "/manage-roles",
        action: ROLE_ACTIONS.MANAGE_ROLES.value,
      },
    ],
  },
];

const NavLinks = {
  admin: adminNavlinks,
};

export default NavLinks;
