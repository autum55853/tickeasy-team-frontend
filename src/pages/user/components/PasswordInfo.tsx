import { T_Password } from "../types/password";
import { useForm } from "react-hook-form";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { ZodIssue } from "zod";
interface PasswordInfoProps {
  data: T_Password;
  onSubmit: (data: T_Password) => void;
  errors: ZodIssue[];
}
export default function PasswordInfo({ data, onSubmit, errors }: PasswordInfoProps) {
  const { register, handleSubmit, watch, setValue } = useForm<T_Password>({
    defaultValues: data,
  });
  return (
    <div className="flex w-full flex-col gap-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        >
          <div className="flex h-[40px] items-center relative">
            <p className="w-[120px] pr-4 text-right font-bold">目前密碼</p>
            <Input
              type="password"
              id="oldPassword"
              {...register("oldPassword")}
              value={watch("oldPassword")}
              onChange={(e) => setValue("oldPassword", e.target.value)}
              className="max-w-[300px] flex-1 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <p className="text-red-500 absolute top-full left-[130px] text-[14px]">
              {errors.find((error) => error.path[0] === "oldPassword")?.message}
            </p>
          </div>
          <div className="flex h-[40px] items-center relative">
            <p className="w-[120px] pr-4 text-right font-bold">新密碼</p>
            <Input
              type="password"
              id="newPassword"
              {...register("newPassword")}
              value={watch("newPassword")}
              onChange={(e) => setValue("newPassword", e.target.value)}
              className="max-w-[300px] flex-1"
            />
            <p className="text-red-500 absolute top-full left-[130px] text-[14px]">
              {errors.find((error) => error.path[0] === "newPassword")?.message}
            </p>
          </div>
          <div className="flex h-[40px] items-center relative">
            <p className="w-[120px] pr-4 text-right font-bold">確認新密碼</p>
            <Input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              value={watch("confirmPassword")}
              onChange={(e) => setValue("confirmPassword", e.target.value)}
              className="max-w-[300px] flex-1"
            />
            <p className="text-red-500 absolute top-full left-[130px] text-[14px]">
              {errors.find((error) => error.path[0] === "confirmPassword")?.message}
            </p>
          </div>
          <div className="flex justify-end gap-4 lg:mt-4 lg:justify-start lg:pl-28">
            <Button type="submit" variant="default">
              修改密碼
            </Button>
          </div>
        </form>
    </div>
  );
}

