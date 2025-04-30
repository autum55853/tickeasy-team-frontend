import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { Checkbox } from "@/core/components/ui/checkbox";
export function SignupSection() {
  return (
    <section className="flex flex-col items-center justify-center p-8">
      <h2>會員註冊</h2>
      <div className="flex-column flex flex-col items-center justify-center">
        <Input type="text" label="姓名" id="username" placeholder="請輸入您的全名" />
        <Input type="email" label="電子信箱" id="email" placeholder="請輸入您的電子信箱" />
        <div className="flex">
          <Input type="phone" label="手機號碼" id="phone" placeholder="請輸入您的手機號碼" />
          <Input type="date" label="出生日期" id="birthday" placeholder="年 月 日" />
        </div>
        <Input type="password" label="密碼" id="password" placeholder="請設定密碼" />
        <Input type="password" label="確認密碼" id="password" placeholder="請再次輸入密碼" />
      </div>
      <div className="mt-8 w-sm">
        <Checkbox label="我已閱讀並同意服務條款及隱私政策" id="agreement" />
        <Checkbox label="我願意接收最新演唱會資訊及優惠通知" id="newsletter" />
        <Button type="button" variant="gradient" className="my-5 w-full">
          立即註冊
        </Button>
      </div>
    </section>
  );
}
