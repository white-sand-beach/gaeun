// import { useState, useEffect } from "react";

// import NotificationGetForm from "../../services/notifications/NotificationGetService";
// import {
//   NotificationInfo,
//   NotificationItem,
// } from "../../types/NotificationType";
// import OrderDetailButton from "../../components/button/OrderDetailButton";

const Notification = () => {
  // const [notificationData, setNotificationData] = useState<NotificationItem[]>([]);
  // const [notificationInfo, setNotificationInfo] = useState<NotificationInfo>({
  //   id: 0,
  //   type: "",
  //   typeId: 0,
  //   isRead: false,
  //   page: 0,
  //   hasNext: false,
  // });

  // useEffect(() => {
  //   const fetchNotification = async () => {
  //     try {
  //       const response = await NotificationGetForm({
  //         page: String(notificationInfo.page),
  //         size: "10",
  //       });
  //       setNotificationInfo(response);
  //       setNotificationData(response.content);
  //       console.log(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchNotification();
  // });

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollHeight = document.documentElement.scrollHeight;
  //     const scrollTop = document.documentElement.scrollTop;
  //     const clientHeight = document.documentElement.clientHeight;

  //     if (
  //       scrollTop + clientHeight >= scrollHeight &&
  //       notificationInfo.hasNext
  //     ) {
  //       setNotificationInfo((prevState) => ({
  //         ...prevState,
  //         page: prevState.page + 1,
  //       }));
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [notificationInfo.hasNext]);

  return (
    <div className="pt-14">
      {/* 컴포넌트로 만들 거에요 */}
      <div className="bg-orange-100">
        <div className="between px-4 pt-2 text-xs font-bold text-gray-400">
          <p>4.18(목) 17:04</p>
          <p className="text-xxs">주문 성공</p>
        </div>
        <div className="between pb-2 pl-6">
          <div className="font-bold">
            <h1>가게명</h1>
            <p className="text-gray-400 text-xxs">
              메뉴 1개, 메뉴 2개 혹은 메뉴 외 1개
            </p>
            <div className="flex text-xs">
              <p>결제 금액</p>
              <p className="ml-2 text-red-500">31,900원</p>
            </div>
          </div>
          {/* 버튼 컴포넌트 만들거에요 */}
          <div className="mt-4 mr-2">{/* <OrderDetailButton /> */}</div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default Notification;
