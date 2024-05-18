export interface NotificationItem {
  orderNumber?: number;
  storeName?: string;
  orderTime?: number;
  orderStatus?: number;
  payment?: number;
  menus?: string;
}

export interface NotificationInfo {
  id: number;
  type?: string;
  typeId?: number;
  content?: NotificationItem[];
  isRead?: boolean;
  page: number;
  hasNext?: boolean;
}
