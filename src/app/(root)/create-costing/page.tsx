import { CreateCostingView } from "@/view";
    import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Costing | Admin Dashboard",
    description: "Create Costing",
  };

const CreateCosting = () => {
  return <CreateCostingView />;
}

export default CreateCosting;