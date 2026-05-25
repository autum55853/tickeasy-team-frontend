import { z } from "zod";

export const UpdatePasswordSchema = z
  .object({
    oldPassword: z.string().min(8, "舊密碼至少需要8個字符"),
    newPassword: z
      .string()
      .min(8, "新密碼至少需要 8 個字元")
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/, "密碼須包含英文字母與數字，且只允許英數字（不可含特殊符號）"),
    confirmPassword: z.string().min(8, "確認密碼至少需要8個字符"),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "新密碼不能與舊密碼相同",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "新密碼與確認密碼不匹配",
    path: ["confirmPassword"],
  });

// 定義TypeScript類型
export type T_UpdatePasswordSchema = z.infer<typeof UpdatePasswordSchema>;
