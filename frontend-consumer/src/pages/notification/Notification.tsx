import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../../../public/windows11/LargeTile.scale-100.png";
import NotificationGetForm from "../../services/notifications/NotificationGetService";
import NotificationCheckForm from "../../services/notifications/NotificationCheckServics";
import {
  NotificationInfo,
  NotificationItem,
} from "../../types/NotificationType";
import OrderDetailButton from "../../components/button/OrderDetailButton";

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
        const response = await NotificationCheckForm(String(notification.id));
        console.log(response);
        setNotificationData((prevNotifications) =>
          prevNotifications.map((item) =>
            item.id === notification.id ? { ...item, isRead: true } : item
          )
        );
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
        setNotificationData((prevNotifications) => [
          ...prevNotifications,
          ...response.notificationList,
        ]);
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
      {notificationData.length > 0 ? (
        <div>
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
                  <div className="px-4 pt-2 text-xs font-bold text-gray-600 between">
                    {/* 날짜 및 주문 현황 */}
                    <p>{notification.content[3]}</p>
                    <p className="text-xs">
                      {notification.content[0] === "FINISHED"
                        ? "수령 완료"
                        : notification.content[0] === "IN_PROGRESS"
                          ? "주문 수락"
                          : notification.content[0] === "DENIED"
                            ? "주문 거절"
                            : notification.content[0] === "PREPARED" &&
                              "음식 준비 완료"}
                    </p>
                  </div>
                  <div className="pb-2 pl-6 between">
                    <div className="font-bold">
                      <h1 className="">{notification.content[2]}</h1>
                      <p className="text-sm">{notification.content[5]}</p>
                      <div className="flex text-xs">
                        <p>결제 금액</p>
                        <p className="ml-2 text-red-500">
                          {notification.content[4]}원
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 mr-2">
                      <OrderDetailButton orderInfoId={notification.typeId} />
                    </div>
                  </div>
                  <hr className="mx-2 mb-1" />
                </div>
              ) : (
                <div>
                  <div className="px-4 pt-2 text-xs font-bold text-gray-600 between">
                    <p>{notification.content[2]}</p>
                    <p>{notification.content[1]}</p>
                  </div>
                  <div className="pb-2 pl-6 font-bold">
                    {/* 가게 오픈 알림 */}
                    <p>{notification.content[0]}</p>
                    <div className="between">
                      <p className="pb-3">확인해보러 갈까요?</p>
                      <Link to={`/shop/${notification.typeId}`}>
                        <button className="mr-2 order-detail-button">
                          <p className="whitespace-nowrap">{`천사가게 보러가기 >`}</p>
                        </button>
                      </Link>
                    </div>
                  </div>
                  <hr className="mx-2 mb-1" />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="h-screen pb-40 center">
          <div>
            <img className="rounded-full" src={logo} alt="로고" />
            <h2 className="text-lg font-bold center">
              중요한 알림이
              <span className="mx-2 text-4xl" style={{ fontFamily: "MyFont" }}>
                슈슝~
              </span>
              올 거에요
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
