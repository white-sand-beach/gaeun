export interface FinishOrderType {
  orderInfo: orderInfoType[]
  page: number;
  hasNext: boolean;
}

export interface orderInfoType {
  orderInfoId: number;
  orderNo: string;
  orderContents: string;
  orderPrice: number;
  orderStatus: string;
  orderDate: string;
}