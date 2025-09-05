import { ManageAdminView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Admins | Dashboard",
  description: "Manage Admins",
};

const ManageAdmins = () => {
  return <ManageAdminView />;
};

export default ManageAdmins;
