export type SelectedTicket = {
  ticketTypeId: string;
  quantity: number;
  ticketPrice: number;
  ticketTypeName: string;
};
export interface BuyerInfo {
  name: string;
  email: string;
  mobilePhone: string;
  paymentMethod: string;
}
export interface CreateOrderData {
  lockExpireTime: string;
  orderId: string;
}

export interface HandlePaymentData {
  method: string;
  provider: string;
}
export interface PaymentResultResponse {
  status: string;
  message: string;
  data: {
    paymentId: string;
    amount: number;
    currency: string;
    method: string;
    provider: string;
    status: string;
    rawPayload: Record<string, unknown>; // 平台回傳資料
  };
}
