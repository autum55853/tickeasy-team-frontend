import { Layout } from "./layout";
import { Input } from "@/core/components/ui/input";
import { ImageSection } from "./components/imageSection";
import { LoginSection } from "./components/loginSection";
import { ModalForgotPassword } from "./components/modalForgotPassword";
import { ResetPassword } from "./components/resetPassword";
import login from "@/assets/images/undraw_login_weas.svg";
import { ModalStatusContext } from "@/context/modalStatusContext";
import { useAuthStore } from "@/store/authStore";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/core/hooks/useToast";

export default function Login() {
  const navigate = useNavigate();
  const context = useContext(ModalStatusContext); // 如果要額外使用 context 內容
  const isLogin = useAuthStore((state) => state.isLogin);
  useEffect(() => {
    if (isLogin) {
      toast({
        title: "你已登入",
        description: "將回到首頁",
      });
      navigate("/");
    }
  }, []);
  return (
    <Layout>
      <ModalForgotPassword active={context?.isModalForgotPasswordActive ?? false}>
        {context?.isResetPassword ? (
          <ResetPassword />
        ) : (
          <Input
            type="email"
            label=""
            id="email"
            value={context?.email ?? ""}
            onChange={(e) => context?.setEmail?.(e.target.value)}
            placeholder="請輸入註冊信箱"
            className="mx-auto mt-8 w-full md:w-[70%]"
          />
        )}
      </ModalForgotPassword>
      <div className="flex grid h-[calc(70vh-3rem)] w-full grid-cols-1 items-center md:h-[calc(90vh-4rem)] md:grid-cols-2">
        <ImageSection imageUrl={login} alt="logIn" />
        <LoginSection />
      </div>
    </Layout>
  );
}
