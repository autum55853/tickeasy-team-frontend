import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { GoogleButton } from "./googleButton";
import { Link } from "react-router-dom";
export function LoginSection() {
  return (
    <section className="flex flex-col items-center justify-center p-8">
      <h2>會員登入</h2>
      <GoogleButton />
      <div className="flex-column flex flex-col items-center justify-center">
        <Input type="text" label="帳號" id="account" placeholder="輸入帳號" />
        <Input type="password" label="密碼" id="password" placeholder="輸入密碼" />
        <Button type="button" variant="gradient" className="my-5 w-full">
          登入
        </Button>
      </div>
      <div className="flex">
        <p className="mr-2">尚未註冊?</p>
        <Link to="/signup" className="text-primary hover:underline hover:underline-offset-5">
          進行註冊
        </Link>
      </div>
    </section>
  );
}
