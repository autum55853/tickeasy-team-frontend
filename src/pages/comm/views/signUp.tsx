import { Layout } from "./layout";
import { ImageSection } from "./components/imageSection";
import { SignupSection } from "./components/signupSection";
import signup from "@/assets/images/undraw_sign-up_z2ku.svg";
export default function Signup() {
  return (
    <Layout>
      <div className="flex w-full items-center justify-center md:grid-cols-2">
        <SignupSection />
        <ImageSection imageUrl={signup} alt="signUp" />
      </div>
    </Layout>
  );
}
