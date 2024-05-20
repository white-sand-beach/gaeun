import { useEffect, useState } from "react";
import { NotificationInfo } from "../../types/notification/NotificationListType";
import SellerNoti from "../../service/notification/SellerNoti";
import NotificationList from "../../components/notification/NotificationList";

const NotificationPage = () => {
  const [notiInfo, setNotiInfo] = useState<NotificationInfo>({
    notificationList: [],
    page: 0,
    hasNext: false,
  });

  // 페이지 변화에 따라 알람 정보 변동
  useEffect(() => {
    const fetchNotiInfo = async () => {
      try {
        const response = await SellerNoti(notiInfo.page, 5);
        setNotiInfo((prev) => ({
          ...prev,
          notificationList: [
            ...prev.notificationList,
            ...response.data.notificationList,
          ],
          hasNext: response.data.hasNext,
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotiInfo();
  }, [notiInfo.page]);

  // 스크롤 변화에 따라 page 값 변동
  useEffect(() => {
    const handleScroll = () => {
      const scrollH = document.documentElement.scrollHeight;
      const scrollT = document.documentElement.scrollTop;
      const clientH = document.documentElement.clientHeight;

      if (scrollT + clientH >= scrollH && notiInfo.hasNext) {
        setNotiInfo((prev) => ({
          ...prev,
          page: prev.page + 1,
        }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll)
  }, [notiInfo.hasNext]);

  return (
    <div className="no-footer top-[80px]">
      <NotificationList notiInfo={notiInfo.notificationList} />
    </div>
  );
};

export default NotificationPage;
