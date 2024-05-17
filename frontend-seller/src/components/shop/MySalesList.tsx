import React, { ChangeEvent, useState } from "react";
import { SalesListInfoType } from "../../types/shop/SalesListInfoType";
import UpdateSalesAPI from "../../service/sales/UpdateSalesAPI";
import TotalButton from "../ui/TotalButton";
import { UpdateSales } from "../../types/sales/UpdateSales";
import EditIcon from "../../assets/mypage-change-info.png";

type EditFoodState = {
  content: string;
  isFinished: boolean;
  stock: number;
};

const MySalesList: React.FC<SalesListInfoType> = (props) => {
  const { putSales } = UpdateSalesAPI();
  const handleEditSales = ({
    saleId,
    menuId,
    content,
    isFinished,
    stock,
  }: UpdateSales) => {
    putSales({
      saleId: saleId,
      menuId: menuId,
      content: content,
      isFinished: isFinished,
      stock: stock,
    });
    setIsEdit(false);
  };

  // 바꿀 정보 useState
  const [editFoodInfo, setEditFoodInfo] = useState<EditFoodState>({
    content: "",
    isFinished: false,
    stock: 0,
  });

  const handleChangeFoodInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setEditFoodInfo((prevState) => ({
      ...prevState,
      [name]: name === "stock" ? Number(value) : value,
      isFinished:
        name === "stock" && Number(value) === 0 ? true : prevState.isFinished,
    }));
  };

  // 수정모드 on, off
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="flex flex-col gap-3 w-full">
      {props.salesLists.map((list) => (
        <div
          key={list.saleId}
          className="flex flex-row justify-around items-center h-[300px] gap-4 border-4 border-orange-500 rounded-[20px] mx-4"
        >
          <div className="bg-gray-150 w-full h-[270px] flex justify-center items-center rounded-xl shadow-lg ">
            <img
              src={list.imageUrl}
              alt="메뉴 사진"
              className="w-[320px] h-[250px] rounded-xl mx-2"
            />
          </div>
          <div className="relative flex flex-col gap-2 text-xl font-bold w-full mx-4">
            {isEdit && (
              <button
                className="absolute right-0 top-10 text-red-500"
                onClick={() => setIsEdit(false)}
              >
                취소
              </button>
            )}
            {!isEdit && (
              <img
                src={EditIcon}
                alt="수정 아이콘"
                className="absolute w-[30px] h-[30px] bottom-0 right-0"
                onClick={() => setIsEdit(true)}
              />
            )}
            <div className="flex flex-row justify-between">
              <p className="text-3xl font-bold">{list.name}</p>
              <p>{!list.isFinished ? "판매가능" : "판매종료"}</p>
            </div>
            <p>원가 : {list.originalPrice}원</p>
            <p className="text-red-500">할인가 : {list.sellPrice}원</p>
            {isEdit ? (
              <div className="flex flex-row gap-2">
                <p>설명 : </p>
                <input
                  name="content"
                  type="text"
                  value={editFoodInfo.content}
                  onChange={handleChangeFoodInfo}
                  placeholder="설명을 입력해주세요"
                />
              </div>
            ) : (
              <p>설명 : {list.content}</p>
            )}
            {isEdit ? (
              <div className="flex flex-row gap-2">
                <p>남은 재고 : </p>
                <input
                  name="stock"
                  type="number"
                  value={editFoodInfo.stock || ""}
                  onChange={handleChangeFoodInfo}
                  placeholder="남은 재고를 입력해주세요"
                />
              </div>
            ) : (
              <p>남은 재고 : {list.restStock}</p>
            )}
            {isEdit && (
              <TotalButton
                title="수정하기"
                onClick={() =>
                  handleEditSales({
                    saleId: list.saleId,
                    menuId: list.menuId,
                    content: editFoodInfo.content || list.content,
                    isFinished: editFoodInfo.stock === 0,
                    stock: editFoodInfo.stock,
                  })
                }
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MySalesList;
