import { useState, useEffect } from "react";

import NotificationGetForm from "../../services/notifications/NotificationGetService";
import {
  NotificationInfo,
  NotificationItem,
} from "../../types/NotificationType";
import OrderDetailButton from "../../components/button/OrderDetailButton";
import NotificationsCountForm from "../../services/notifications/NotificationCheckServics";

const Notification = () => {
  const [notificationData, setNotificationData] = useState<NotificationItem[]>(
    []
  );
  const [notificationInfo, setNotificationInfo] = useState<NotificationInfo>({
    page: 0,
    hasNext: false,
  });

  const handleCheckSubmit = async (notification: any) => {
    try {
      if (!notification.isRead) {
        const response = await NotificationsCountForm(String(notification.id));
        console.log(response);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await NotificationGetForm({
          page: String(notificationInfo.page),
          size: "10",
        });
        setNotificationInfo(response);
        setNotificationData(response.notificationList);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotification();
  }, [notificationInfo.page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (
        scrollTop + clientHeight >= scrollHeight &&
        notificationInfo.hasNext
      ) {
        setNotificationInfo((prevState) => ({
          ...prevState,
          page: prevState.page + 1,
        }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [notificationInfo.hasNext]);

  return (
    <div className="pt-14">
      {/* 컴포넌트로 만들 거에요 */}
      {notificationData.map((notification) => (
        <div
          key={notification.id}
          onClick={() => {
            (async () => {
              await handleCheckSubmit(notification);
            })();
          }}
          className={`${notification.isRead ? "bg-white" : "bg-orange-100"}`}
        >
          {notification.type === "order" ? (
            <div>
              <div className="between px-4 pt-2 text-xs font-bold text-gray-400">
                <p>{notification.content[3]}</p> {/* 수정 */}
                <p className="text-xs">{notification.content[0]}</p>{" "}
                {/* 수정 */}
              </div>
              <div className="between pb-2 pl-6">
                <div className="font-bold">
                  <h1 className="">{notification.content[2]}</h1> {/* 수정 */}
                  <p className="text-sm">{notification.content[5]}</p>{" "}
                  {/* 수정 */}
                  <div className="flex text-xs">
                    <p>결제 금액</p>
                    <p className="ml-2 text-red-500">
                      {notification.content[4]}원
                    </p>{" "}
                    {/* 수정 */}
                  </div>
                </div>
                <div className="mt-4 mr-2">
                  <OrderDetailButton orderInfoId={notification.typeId} />
                </div>
              </div>
              <hr className="mb-1" />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Notification;
