import React from "react";
import { NotiListInfo } from "../../types/notification/NotificationListType";
import { useNavigate } from "react-router-dom";
import SellerNotiRead from "../../service/notification/SellerNotiRead";

interface NotiProps {
  notiInfo: NotiListInfo[];
};

const NotificationList: React.FC<NotiProps> = (props) => {
    const navigate = useNavigate()
    const handleReadNoti = async (id:number, type: string, typeId?: number) => {
        try {
            await SellerNotiRead(id)
            // 타입이 review 이면
            // 리뷰목록이 있는 내 가게 정보로 이동
            if (type === "review") {
                navigate("/mystore")
            }
            else if (type === "order") {
                navigate(`/order/${typeId}`)
            }
        }
        catch (err) {
            console.error(err)
            throw err
        }
    };

  return (
    <div className="flex flex-col w-full gap-4">
      {props.notiInfo.map((item) => (
        <div
          key={item.id}
          className={`border-2 mx-2 rounded-3xl p-3 h-[300px] flex flex-col justify-center items-center ${!item.isRead ? "bg-mainColor" : "bg-gray-200"}`}
          onClick={() => handleReadNoti(item.id, item.type, item.typeId)}
        >
          <p className="text-4xl">{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;