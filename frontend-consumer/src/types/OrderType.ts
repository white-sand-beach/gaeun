export interface OrderItem {
  name?: string;
  content?: string;
  quantity?: number;
  sellPrice?: number;
}

export interface OrderDetailType {
  orderInfoId?: number;
  orderNo?: string;
  storeId?: number;
  storeName?: string;
  storeTel?: string;
  orderStatus?: string;
  orderDate?: string;
  restTime?: number;
  orderItems?: OrderItem[];
  originalPrice?: number;
  discountPrice?: number;
  paymentPrice?: number;
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