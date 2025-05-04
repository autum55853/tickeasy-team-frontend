import { Input } from "@/core/components/ui/input";
import { useState } from "react";
export function ResetPassword() {
  const [insertItem, setInsertItem] = useState({
    verifiedCode: {
      value: "",
      error: false,
      errorMessage: "",
    },
    newPassword: {
      value: "",
      error: false,
      errorMessage: "",
    },
    reNewPassword: {
      value: "",
      error: false,
      errorMessage: "",
    },
  });
  const handleSetItems = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInsertItem((prev) => ({
      ...prev,
      [id]: {
        ...prev[id as keyof typeof prev],
        value: value,
      },
    }));
  };
  return (
    <>
      <div>
        <Input type="text" label="" id="verifiedCode" value={insertItem["verifiedCode"].value} placeholder="請輸入驗證碼" onChange={handleSetItems} />
        {insertItem["verifiedCode"].error ? `<span>${insertItem["verifiedCode"].errorMessage}</span>` : ""}
      </div>
      <div>
        <Input type="text" label="" id="newPassword" value={insertItem["newPassword"].value} placeholder="請輸入新密碼" onChange={handleSetItems} />
        {insertItem["newPassword"].error ? `<span>${insertItem["newPassword"].errorMessage}</span>` : ""}
      </div>
      <div>
        <Input
          type="text"
          label=""
          id="reNewPassword"
          value={insertItem["reNewPassword"].value}
          placeholder="請再次輸入新密碼"
          onChange={handleSetItems}
        />
        {insertItem["reNewPassword"].error ? `<span>${insertItem["reNewPassword"].errorMessage}</span>` : ""}
      </div>
    </>
  );
}
