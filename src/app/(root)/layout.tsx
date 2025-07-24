import { Header, SideBar } from "@/components";
import { admin } from "@/utils";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-ful flex h-[100dvh] flex-col items-start justify-start gap-0">
      <Header />
      <div className="flex h-[calc(100%-60px)] w-full gap-[0px]">
        <SideBar navlinks={admin} />
        <main className="h-full w-full overflow-auto p-[20px] md:p-[30px]">{children}</main>
      </div>
    </div>
  );
};

export default PageLayout;
