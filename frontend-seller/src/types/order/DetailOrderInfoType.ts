export interface DetailOrderInfoType {
  orderInfoId: number;
  orderNo: string;
  orderStatus: string;
  orderDate: string;
  restTime: number;
  orderItems: [
    {
      name: string;
      content: string;
      quantity: number;
      sellPrice: number;
    }
  ]
  originalPrice: number;
  discountPrice: number;
  paymentPrice: number;
}