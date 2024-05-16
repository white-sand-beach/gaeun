export interface FinishOrderType {
  orderInfo: [
    {
      orderInfoId: number;
      orderNo: string;
      orderContents: string;
      orderPrice: number;
      orderStatus: string;
      orderDate: string;
    }
  ]
  page: number;
  hasNext: boolean;
}