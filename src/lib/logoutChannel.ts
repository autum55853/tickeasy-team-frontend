import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "./supabase";

// 模組層 singleton：前台「接收」與「送出」跨域登出廣播共用同一個 channel。
// Supabase Realtime 規則為單 client 單 topic 只能一個 channel，若 receiver 與
// sender 各開一個同 topic 的 channel，第二個 subscribe 會 hang（永遠到不了
// SUBSCRIBED）。共用 singleton 可避免此問題，並讓 sender 重用已訂閱的 channel
// 直接 send。
let _logoutChannel: RealtimeChannel | undefined;
let _currentEmail: string | undefined;

/**
 * 確保前台針對 `tickeasy-session-${email}` 的單例 channel 已建立並訂閱（接收端）。
 * email 變更時會先移除舊 channel 再重建。
 */
export function ensureLogoutChannel(
  email: string,
  onLogout: () => void,
): RealtimeChannel {
  if (_logoutChannel && _currentEmail === email) {
    console.log("[logout-sync] FRONT ensureLogoutChannel skip（singleton 已存在）, email =", email);
    return _logoutChannel;
  }

  if (_logoutChannel) {
    console.log("[logout-sync] FRONT email 變更，移除舊 channel:", _currentEmail);
    supabase.removeChannel(_logoutChannel);
    _logoutChannel = undefined;
  }

  _currentEmail = email;
  console.log("[logout-sync] FRONT subscribe Supabase channel:", `tickeasy-session-${email}`);
  const channel = supabase.channel(`tickeasy-session-${email}`);
  _logoutChannel = channel;
  channel
    .on("broadcast", { event: "LOGOUT" }, () => {
      console.log("[logout-sync] FRONT 收到 Supabase LOGOUT broadcast");
      onLogout();
    })
    .subscribe((status: string) => {
      console.log("[logout-sync] FRONT receiver subscribe status =", status);
    });

  return channel;
}

/**
 * 送出跨域登出廣播。重用已訂閱的 singleton channel，不另開同 topic channel。
 * 登出當下 receiver（AuthSyncProvider）通常已 SUBSCRIBED；若 singleton 不存在則 no-op。
 */
export async function sendLogout(): Promise<void> {
  if (!_logoutChannel) {
    console.warn("[logout-sync] FRONT sendLogout：singleton channel 不存在，略過 Supabase 廣播");
    return;
  }
  const sendRes = await _logoutChannel.send({
    type: "broadcast",
    event: "LOGOUT",
    payload: { timestamp: Date.now() },
  });
  console.log("[logout-sync] FRONT sendLogout 結果 =", sendRes);
}
