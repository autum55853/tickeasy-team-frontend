import { Layout } from "./layout";
import { Input } from "@/core/components/ui/input";
import { ImageSection } from "./components/imageSection";
import { LoginSection } from "./components/loginSection";
import { ModalForgotPassword } from "./components/modalForgotPassword";
import { ResetPassword } from "./components/resetPassword";
import login from "@/assets/images/undraw_login_weas.svg";
import { createContext, useState } from "react";

interface ModalStatusContextType {
  isModalForgotPasswordActive: boolean;
  setIsModalForgotPasswordActive: (value: boolean) => void;
  isResetPassword: boolean;
  setIsResetPassword: (value: boolean) => void;
}
export const ModalStatusContext = createContext<ModalStatusContextType | null>(null);

export default function Login() {
  const [isModalForgotPasswordActive, setIsModalForgotPasswordActive] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  return (
    <Layout>
      <ModalStatusContext.Provider value={{ isModalForgotPasswordActive, setIsModalForgotPasswordActive, isResetPassword, setIsResetPassword }}>
        <ModalForgotPassword active={isModalForgotPasswordActive}>
          {isResetPassword ? (
            <ResetPassword />
          ) : (
            <Input type="email" label="" id="email" placeholder="請輸入註冊信箱" className="mx-auto mt-8 w-[70%]" />
          )}
        </ModalForgotPassword>
        <div className="grid h-[calc(100vh-6rem)] w-full md:grid-cols-2">
          <ImageSection imageUrl={login} alt="logIn" />
          <LoginSection />
        </div>
      </ModalStatusContext.Provider>
    </Layout>
  );
}
