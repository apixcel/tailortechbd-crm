"use client";

import { EmailLogin, FormCard, PhoneNumberLogin } from "@/components";
import { useState } from "react";
import Image from "next/image";

const LoginView = () => {
  const [loginMode, setLoginMode] = useState<"phoneNumber" | "email">("phoneNumber");
  return (
    <div className="main_container flex h-screen flex-col gap-6 py-[20px]">
      <Image src="/images/logos/logo.png" alt="logo" width={200} height={200} className="mx-auto" />
      <h4 className="text-center text-[24px] font-[700] text-primary">Login</h4>
      <FormCard
        headerButtons={[
          {
            title: "Login with mobile",
            onClick: () => setLoginMode("phoneNumber"),
          },
          {
            title: "Login with email",
            onClick: () => setLoginMode("email"),
          },
        ]}
      >
        {loginMode === "phoneNumber" ? <PhoneNumberLogin /> : <EmailLogin />}
      </FormCard>
    </div>
  );
};

export default LoginView;
