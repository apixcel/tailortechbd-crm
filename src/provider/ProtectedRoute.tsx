"use client";
import { useAppSelector } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
interface IProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: IProps) => {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
