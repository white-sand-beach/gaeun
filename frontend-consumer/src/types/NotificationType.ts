export interface NotificationItem {
  id: number;
  type?: string;
  typeId: number;
  isRead?: boolean;
  content: string[];
}

export interface NotificationInfo {
  notificationList?: NotificationItem[];
  page: number;
  hasNext?: boolean;
}
