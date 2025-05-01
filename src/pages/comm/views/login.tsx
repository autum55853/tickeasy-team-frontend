import { Layout } from "./layout";
import { ImageSection } from "./components/imageSection";
import { LoginSection } from "./components/loginSection";
import login from "@/assets/images/undraw_login_weas.svg";

export default function Login() {
  return (
    <Layout>
      <div className="grid h-[calc(100vh-6rem)] w-full md:grid-cols-2">
        <ImageSection imageUrl={login} alt="logIn" />
        <LoginSection />
      </div>
    </Layout>
  );
}
