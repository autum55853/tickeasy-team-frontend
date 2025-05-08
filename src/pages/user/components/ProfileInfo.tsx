import ProfileAvatar from "./ProfileAvatar";
import DefaultImg from "@/assets/images/bg-user.png";
import { T_Profile } from "../types/porfile";
import { useForm } from "react-hook-form";
import { Input } from "@/core/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/select";
import { Button } from "@/core/components/ui/button";
import { SingleDatePicker } from "@/core/components/ui/singleDatePicker";
import { useEffect } from "react";
import ProfilePreferRegions from "./ProfilePreferRegions";
import ProfilePreferEventTypes from "./ProfilePreferEventTypes";
import { formatPreferredRegions } from "../utils/preferredRegions";
import { formatPreferredEventTypes } from "../utils/preferredEventTypes";
import { CategoryOptions } from "@/pages/home/types/CategoryOptions";
import dayjs from "dayjs";
interface ProfileInfoProps {
  isEdit: boolean;
  data: T_Profile;
  onSubmit: (data: T_Profile) => void;
  onCancel: () => void;
}

export default function ProfileInfo({ isEdit, data, onSubmit, onCancel }: ProfileInfoProps) {
  const { register, watch, setValue, handleSubmit } = useForm<T_Profile>({
    defaultValues: data,
  });
  // 全部偏好活動類型
  const allEventTypes: CategoryOptions[] = [
    {
      label: "療癒系音樂",
      value: "A",
      subLabel: "Pop",
    },
    {
      label: "搖滾音樂",
      value: "B",
      subLabel: "Rock",
    },
    {
      label: "電子音樂",
      value: "C",
      subLabel: "Electronic",
    },
    {
      label: "嘻哈/饒舌",
      value: "D",
      subLabel: "Hip-Hop/Rap",
    },
    {
      label: "古典/交響樂",
      value: "E",
      subLabel: "Classical/Symphony",
    },
  ];

  useEffect(() => {
    // 手动更新所有字段
    Object.keys(data).forEach((key) => {
      setValue(key as keyof T_Profile, data[key as keyof T_Profile]);
    });
  }, [data, setValue]);

  const renderContent = () => (
    <div className="relative mt-2 lg:mt-0">
      {isEdit ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        >
          <div className="flex h-[40px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">帳號</p>
            <Input
              id="email"
              {...register("email")}
              value={watch("email")}
              onChange={(e) => setValue("email", e.target.value)}
              className="max-w-[300px] flex-1 disabled:cursor-not-allowed disabled:opacity-50"
              inputClass="bg-neutral-300 border-none"
              disabled
            />
          </div>
          <div className="flex h-[40px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">姓名</p>
            <Input
              id="name"
              {...register("name")}
              value={watch("name") || ""}
              onChange={(e) => setValue("name", e.target.value)}
              className="max-w-[300px] flex-1"
              maxLength={20}
            />
          </div>
          <div className="flex h-[40px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">暱稱</p>
            <Input
              id="nickname"
              {...register("nickname")}
              value={watch("nickname") || ""}
              onChange={(e) => setValue("nickname", e.target.value)}
              className="max-w-[300px] flex-1"
              maxLength={20}
            />
          </div>
          <div className="flex h-[40px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">手機號碼</p>
            <Input
              id="phone"
              {...register("phone")}
              value={watch("phone") || ""}
              onChange={(e) => setValue("phone", e.target.value)}
              className="max-w-[300px] flex-1"
              maxLength={10}
              placeholder="格式：09xxxxxxxx"
            />
          </div>
          <div className="flex h-[40px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">出生年月日</p>
            <SingleDatePicker
              inputClassName="ml-2 max-w-[300px] flex-1"
              date={watch("birthday") ? new Date(watch("birthday") as string) : null}
              setDate={(date) =>
                setValue(
                  "birthday",
                  date
                    ? date
                        .toLocaleDateString("zh-TW", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                        .split("/")
                        .join("-")
                    : null
                )
              }
              defaultMonth={dayjs().subtract(20, "year").startOf("year").toDate()}
              placeholder="請選擇出生年月日"
            />
          </div>
          <div className="flex h-[40px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">生理性別</p>
            <Select
              value={watch("gender") || ""}
              onValueChange={(value) => {
                setValue("gender", value);
              }}
            >
              <SelectTrigger className="ml-2 max-w-[300px] flex-1 text-base text-neutral-600 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="請選擇性別" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="text-base text-neutral-600 focus:bg-slate-100 focus:text-neutral-600" value="男">
                  男
                </SelectItem>
                <SelectItem className="text-base text-neutral-600 focus:bg-slate-100 focus:text-neutral-600" value="女">
                  女
                </SelectItem>
                <SelectItem className="text-base text-neutral-600 focus:bg-slate-100 focus:text-neutral-600" value="其他">
                  其他
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex h-[80px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">偏好活動區域</p>
            <ProfilePreferRegions regions={register("preferredRegions")} />
          </div>
          <div className="flex h-[200px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">偏好活動類型</p>
            <ProfilePreferEventTypes eventTypes={register("preferredEventTypes")} allEventTypes={allEventTypes} />
          </div>
          <div className="flex h-[40px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">國家／地區</p>
            <Select
              value={watch("country") || ""}
              onValueChange={(value) => {
                setValue("country", value);
              }}
            >
              <SelectTrigger className="ml-2 max-w-[300px] flex-1 text-base text-neutral-600 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="請選擇國家／地區" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="text-base text-neutral-600 focus:bg-slate-100 focus:text-neutral-600" value="台灣">
                  台灣
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex h-[40px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">詳細地址</p>
            <Input
              id="address"
              {...register("address")}
              value={watch("address") || ""}
              onChange={(e) => setValue("address", e.target.value)}
              className="max-w-[300px] flex-1"
              maxLength={50}
            />
          </div>
          <div className="flex justify-end gap-4 lg:mt-4 lg:justify-start lg:pl-28">
            <Button
              type="button"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                // 重置表單數據到原始狀態
                Object.keys(data).forEach((key) => {
                  setValue(key as keyof T_Profile, data[key as keyof T_Profile]);
                });
                onCancel();
              }}
            >
              取消編輯
            </Button>
            <Button type="submit" variant="default">
              儲存會員資料
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex w-full flex-col gap-4 px-4">
          <div className="flex h-[40px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">帳號</p>
            <p className="flex-1 text-sm text-gray-500">{data.email}</p>
          </div>
          <div className="flex h-[40px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">姓名</p>
            <p className="flex-1 text-sm text-gray-500">{data?.name || "-"}</p>
          </div>
          <div className="flex h-[40px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">暱稱</p>
            <p className="flex-1 text-sm text-gray-500">{data?.nickname || "-"}</p>
          </div>
          <div className="flex h-[40px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">聯絡方式</p>
            <p className="flex-1 text-sm text-gray-500">{data?.phone || "-"}</p>
          </div>
          <div className="flex h-[40px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">出生年月日</p>
            <p className="flex-1 text-sm text-gray-500">{data?.birthday || "-"}</p>
          </div>
          <div className="flex h-[40px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">生理性別</p>
            <p className="flex-1 text-sm text-gray-500">{data?.gender || "-"}</p>
          </div>
          <div className="flex h-[40px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">偏好活動區域</p>
            <p className="flex-1 text-sm text-gray-500">{formatPreferredRegions(data?.preferredRegions || [])}</p>
          </div>
          <div className="flex h-[40px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">偏好活動類型</p>
            <p className="flex-1 text-sm text-gray-500">{formatPreferredEventTypes(data?.preferredEventTypes || [])}</p>
          </div>
          <div className="flex h-[40px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">國家／地區</p>
            <p className="flex-1 text-sm text-gray-500">{data?.country || "-"}</p>
          </div>
          <div className="flex h-[40px] items-center">
            <p className="w-[120px] pr-4 text-right font-bold">詳細地址</p>
            <p className="flex-1 text-sm text-gray-500">{data?.address || "-"}</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative p-4">
      {/* 會員頭像 */}
      <div className="flex justify-center lg:justify-start">
        <ProfileAvatar img={data?.avatar || DefaultImg} />
      </div>
      {/* 會員資訊 */}
      {renderContent()}
    </div>
  );
}
