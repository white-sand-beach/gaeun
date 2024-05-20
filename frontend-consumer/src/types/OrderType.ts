export interface OrderItem {
  name?: string;
  content?: string;
  quantity?: number;
  sellPrice?: number;
}

export interface OrderDetailType {
  orderInfoId?: number;
  orderNo?: string;
  orderStatus?: string;
  orderDate?: string;
  restTime?: number;
  orderItems?: OrderItem[];
  originalPrice?: number;
  discountPrice?: number;
  paymentPrice?: number;
  storeId: number;
  storeName?: string;
  storeTel?: string;
  reviewId?: number;
}

export interface OrderInfo {
  orderInfoId: number;
  orderContents?: string;
  orderPrice?: number;
  orderStatus?: string;
  orderDate?: string;
  storeId?: number;
  storeName?: string;
  storeTel?: string;
}

export interface OrderListType {
  orderInfoList?: OrderInfo[];
  page: number;
  hasNext?: boolean;
}

export interface OrderCurrentState {
  orderInfoId: number;
  orderDate: string;
  orderRestTime: number;
  orderStatus: string;
  orderContents: string;
  storeId: number;
  storeName: string;
  storeTel: string;
  storeAddress: string;
  storeRoadAddress: string;
  storeLatitude: number;
  storeLongitude: number;
}
