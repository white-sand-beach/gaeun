export interface Notification {
  notificationList?: NotiList[]
  page: number;
  hasNext?: boolean;
}

export interface NotiList {
  id: number;
  type?: string[];
  typeId: number;
  content: string[];
  isRead?: boolean;
}