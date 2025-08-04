import { EmailLogin, FormCard } from "@/components";
import Image from "next/image";

const LoginView = () => {
  return (
    <div className="main_container flex h-screen flex-col gap-6 py-[20px]">
      <Image src="/images/logos/logo.png" alt="logo" width={200} height={200} className="mx-auto" />
      <h4 className="text-center text-[24px] font-[700] text-primary">Login</h4>
      <FormCard headerButtons={[]}>
        <EmailLogin />
      </FormCard>
    </div>
  );
};

export default LoginView;
