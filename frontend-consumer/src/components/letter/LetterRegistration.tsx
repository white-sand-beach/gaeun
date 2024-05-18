import React, { useEffect } from "react";
import UserState from "../../types/UserState";
import "../modal/Modal.css";
import { OrderDetailType } from "../../types/OrderType";
import { useState } from "react";
import giveletter from "../../assets/letter/giveletter.png";
import camera from "../../assets/letter/camera.png";
import useUserStore from "../../store/UserStore.ts";
import letterImage from "../../assets/letter/letter.png";
import { LetterData } from "../../types/LetterDataType.ts";
import LetterPostForm from "../../services/letters/LetterPostService.ts";
import { sendHeartOptions } from "../../assets/lotties/lottieOptions.ts";
import Lottie from "react-lottie";

interface LetterRegistraionModalProps {
  onClose: () => void;
  orderDetail: OrderDetailType;
}

const LetterRegistraionModal: React.FC<
  UserState & LetterRegistraionModalProps
> = ({ onClose, orderDetail }) => {
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [letterData, setLetterData] = useState<LetterData>({
    content: "",
    image: null,
    storeId: orderDetail.storeId,
    orderInfoId: orderDetail.orderInfoId ?? 0,
  });

  const { nickname } = useUserStore((state) => ({
    nickname: state.nickname,
  })); // 스토어에서 위치 데이터 가져오기

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // input 값을 변경할 때마다 letterData 업데이트
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { value } = e.target;
    setLetterData((prevState) => ({
      ...prevState,
      content: value,
    }));
  };

  // 보내기 버튼 클릭 시 호출되는 함수
  const handleSendButtonClick = async () => {
    if (window.confirm("감사편지를 보내시겠습니까?")) {
      setIsLoading(true); // 로딩 상태 시작
      try {
        // LetterPostForm 함수를 호출하여 데이터 전송
        const response = await LetterPostForm(letterData);
        console.log("보내기 성공");
        console.log("Letter sent successfully:", response);
        setTimeout(() => {
          setIsLoading(false); // 3초 후 로딩 상태 종료
          onClose();
        }, 3000);
      } catch (error) {
        console.error("Failed to send letter:", error);
        console.log("보내기 실패");
        // 편지 보내기에 실패했을 때 처리
        setIsLoading(false); // 로딩 상태 종료
      }
    }
  };

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLetterData((prevState) => ({
        ...prevState,
        image: file,
      }));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleOutsideClick}
    >
      {isLoading ? (
        <Lottie options={sendHeartOptions} height={200} width={200} />
      ) : (
        <div className="bg-white w-[300px] h-[500px] rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center mb-5">
            <h1 className="text-2xl font-bold text-center ">감사 편지 쓰기</h1>
            <div className="w-6 h-6 ml-2">
              <img
                className="object-cover w-full h-full"
                src={giveletter}
                alt="감사편지쓰기"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <h2 className="mb-4 text-lg font-bold">
              To. {orderDetail.storeName}가게 사장님께
            </h2>
            <div className="flex flex-col w-6 h-6 mr-2">
              <label htmlFor="imageInput">
                <img
                  className="object-cover w-full h-full cursor-pointer"
                  src={camera}
                  alt="카메라버튼"
                />
              </label>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <span className="mr-4 text-sm font-medium text-gray-500 whitespace-nowrap ml-[-8px]">
                {letterData.image ? "사진수정" : "사진넣기"}
              </span>
            </div>
          </div>
          <div>
            <img
              className="flex absolute w-[250px] h-[256px]"
              src={letterImage}
            ></img>
            <textarea
              className=" z-20 relative w-[250px] h-[256px] p-2 mb-1 whitespace-pre-line border border-gray-300 rounded bg-inherit resize-none"
              placeholder="따듯한 마음을 담아 편지를 작성해보세요!"
              value={letterData.content}
              onChange={handleChange}
            />
          </div>
          <div className="mr-1 text-lg font-bold text-right">
            From. {nickname}
          </div>
          <div className="flex justify-between px-4 mt-4">
            <div
              className="flex items-center justify-center w-20 h-10 text-lg font-bold text-gray-600 border-2 border-black cursor-pointer rounded-xl"
              onClick={onClose}
            >
              취소
            </div>
            <div
              onClick={handleSendButtonClick}
              className="flex items-center justify-center w-20 h-10 text-lg font-bold border-2 cursor-pointer border-myColor text-myColor rounded-xl"
            >
              보내기
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LetterRegistraionModal;
