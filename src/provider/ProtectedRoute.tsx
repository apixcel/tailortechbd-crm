import { useAppSelector } from "@/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
// import { Loader } from "@/components";

interface IProps {
  role: string;
  children: React.ReactNode;
  checkVerification?: boolean;
}

const ProtectedRoute = ({ role, children, checkVerification = true }: IProps) => {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const router = useRouter();
  const path = usePathname();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) return;

      //   if (!user) {
      //     Cookies.set("redirect", path);
      //     router.replace("/login");
      //     return;
      //   }

      //   if (user.role !== role && checkVerification) {
      //     Cookies.set("redirect", path);
      //     router.replace("/register/verification");
      //     return;
      //   }

      setIsAllowed(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isLoading, user, path, router, role, checkVerification]);

  //   if (isLoading || !isAllowed) {
  //     return <Loader className="!h-screen" />;
  //   }

  return <>{children}</>;
};

export default ProtectedRoute;
