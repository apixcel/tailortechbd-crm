import { LoginView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Admin Dashboard",
  description: "Login",
};

const Login = () => {
  return <LoginView />;
};

export default Login;
