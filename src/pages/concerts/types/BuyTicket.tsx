export type SelectedTicket = {
  ticketTypeId: string;
  quantity: number;
  ticketPrice: number;
};
export interface BuyerInfo {
  name: string;
  email: string;
  mobilePhone: string;
  paymentMethod: string;
}
export interface CreditCardInfo {
  cardNumber: string;
  cardExpirationDate: string;
  cardCvv: string;
}
