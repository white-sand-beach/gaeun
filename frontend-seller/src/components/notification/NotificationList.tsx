import React, { useEffect, useState } from "react";
import { NotiListInfo } from "../../types/notification/NotificationListType";
import { useNavigate } from "react-router-dom";
import SellerNotiRead from "../../service/notification/SellerNotiRead";
import letterIcon from "../../assets/letter-icon.png";
import SellerNotiCount from "../../service/notification/SellerNotiCount";

interface NotiProps {
  notiInfo: NotiListInfo[];
}

const NotificationList: React.FC<NotiProps> = (props) => {
  const navigate = useNavigate();
  const [notiCount, setNotiCount] = useState<number>(0);

  useEffect(() => {
    const fetchNotiCount = async () => {
      try {
        const response = await SellerNotiCount();
        setNotiCount(response.data.data.count);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotiCount();
  }, []);

  const handleReadNoti = async (id: number, type: string, typeId?: number) => {
    try {
      await SellerNotiRead(id);
      // 타입이 review 이면
      // 리뷰목록이 있는 내 가게 정보로 이동
      if (type === "review") {
        navigate("/mystore");
      }
      // 타입이 order 이면
      // 주문 상세내역으로 이동
      else if (type === "order") {
        navigate(`/order/${typeId}`);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-center items-center gap-4">
        <p className="text-4xl">읽지 않은 알림이</p>
        <p className="text-8xl">{notiCount}개</p>
        <p className="text-4xl">있어요!</p>
      </div>
      {props.notiInfo.map((item) => (
        <div
          key={item.id}
          className={`border-2 mx-2 rounded-3xl p-3 h-[300px] flex flex-col justify-center items-center ${!item.isRead ? "bg-orange-200" : "bg-gray-200"}`}
          onClick={() => handleReadNoti(item.id, item.type, item.typeId)}
        >
          <div className="flex flex-row w-full justify-center items-center gap-4">
            {/* 타입이 order 이면 주문 내역 노출 */}
            {item.type === "order" && (
              <div className="flex flex-col gap-4 text-4xl font-bold">
                <div className="flex flex-row justify-between text-gray-500">
                  <p>{item.content[3]}</p>
                  <p>{item.content[0] === "PAID" ? "결제 완료" : ""}</p>
                </div>
                <p>
                  주문번호 : {item.content[1]}
                </p>
                <p>{item.content[2]}</p>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-4">
                    <p>결제 금액</p>
                    <p className="text-red-500">{item.content[4]}원</p>
                  </div>
                </div>
              </div>
            )}
            {/* 타입이 review 이면 편지 아이콘 노출 */}
            {item.type === "review" && (
              <div className="flex flex-row gap-4 text-6xl">
                {item.content}
                <img src={letterIcon} className="w-[50px]" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
