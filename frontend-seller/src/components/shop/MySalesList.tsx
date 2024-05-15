import React from "react";
import { SalesListInfoType } from "../../types/shop/SalesListInfoType";
import UpdateSalesAPI from "../../service/sales/UpdateSalesAPI";
import TotalButton from "../ui/TotalButton";
import { UpdateSales } from "../../types/sales/UpdateSales";

const MySalesList: React.FC<SalesListInfoType> = (props) => {
  const { putSales } = UpdateSalesAPI();
  const handleEditSales = ({ saleId, menuId, content, isFinished, stock }: UpdateSales) => {
    putSales({
      "saleId": saleId,
      "menuId": menuId,
      "content": content,
      "isFinished": isFinished,
      "stock": stock,
    })
  };

  return (
    <div className="flex flex-col gap-3">
      {props.salesLists.map((list) => (
        <div
          key={list.saleId}
          className="flex flex-row gap-4 border-4 border-orange-500 rounded-lg"
        >
          <img
            src={list.imageUrl}
            alt="메뉴 사진"
            className="w-[60px] h-[60px]"
          />
          <div className="flex flex-col">
            <p>메뉴명 : {list.name}</p>
            <p>원가 : {list.originalPrice}</p>
            <p>할인가 : {list.sellPrice}</p>
            <p>남은 재고 : {list.restStock}</p>
            <p>설명 : {list.content}</p>
            <p>판매상태 : {!list.isFinished ? "판매가능" : "판매종료"}</p>
            <TotalButton title="수정하기" onClick={() => handleEditSales({ "saleId": list.saleId, "menuId": list.menuId, "content": list.content, "isFinished": list.isFinished, "stock": list.restStock })} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MySalesList;
