import { ManageSuperAdminView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Super Admin | Dashboard",
  description: "Manage Super Admin",
};
const ManageSuperAdmin = () => {
  return <ManageSuperAdminView />;
};

export default ManageSuperAdmin;
