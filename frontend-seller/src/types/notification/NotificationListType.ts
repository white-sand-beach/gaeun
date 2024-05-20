export interface NotificationInfo {
  notificationList: NotiListInfo[]
  page: number;
  hasNext?: boolean;
}

export interface NotiListInfo {
  id: number;
  type: string;
  typeId: number;
  content: string[];
  isRead?: boolean;
}