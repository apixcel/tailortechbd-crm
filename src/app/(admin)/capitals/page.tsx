import { CapitalsView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capitals | Dashboard",
  description: "Capitals",
};

const Capitals = () => {
  return <CapitalsView />;
};

export default Capitals;
