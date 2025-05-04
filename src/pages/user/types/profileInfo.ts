export interface T_ProfileInfo {
  email: string; // 帳號(電子信箱)
  name: string; // 姓名 (暱稱)
  phone: string; // 手機
  birthday?: string | null; // 生日
  gender: string; // 性別
  preferredRegions: Array<string>; // 偏好地區
  preferredEventTypes: Array<string>; // 偏好音樂
  country: string; // 國家
  address: string; // 詳細地址
  img: string; // 頭像
}
