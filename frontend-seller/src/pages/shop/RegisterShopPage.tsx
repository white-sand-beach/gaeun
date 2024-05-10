import { useEffect, useState } from "react";
import RegisterShop from "../../components/shop/RegisterShop";
import RegisterShopAPI from "../../service/shop/RegisterShopAPI";
import useShopStore from "../../store/shop/UseshopStore";
import { CategoryIdType } from "../../types/shop/CategoryIdType";

const RegisterShopPage = () => {

  const [ categoryList, setCategoryList ] = useState<CategoryIdType[]>([])

  useEffect(() => {
    getCategories(setCategoryList)
  }, [])

  // 가게 정보 업데이트 위한 Store
  const {
    shopImage,
    shopName,
    shopOwner,
    shopNumber,
    shopzibunAddr,
    shoproadAddr,
    shopLat,
    shopLon,
    shopIntro,
    shopWorkday,
    shopHoliday,
    FoodOrigin,
    shopCategoryId,
    onUpdateShopStore
  } = useShopStore();

  const { postRegisterShop, getCategories } = RegisterShopAPI();
  const handleRegisterShop = () => {
    postRegisterShop({
      shopImage: shopImage,
      shopName: shopName,
      shopOwner: shopOwner,
      shopNumber: shopNumber,
      shopzibunAddr: shopzibunAddr,
      shoproadAddr: shoproadAddr,
      shopLat: shopLat,
      shopLon: shopLon,
      shopIntro: shopIntro,
      shopWorkday: shopWorkday,
      shopHoliday: shopHoliday,
      FoodOrigin: FoodOrigin,
      shopCategoryId: shopCategoryId,
      categoryList: categoryList,
      onUpdateShopStore: onUpdateShopStore,
    });
  };

  

  return (
    <div className="no-footer overflow-y-scroll top-[60px]">
      <RegisterShop
        shopImage={shopImage}
        shopName={shopName}
        shopOwner={shopOwner}
        shopNumber={shopNumber}
        shopzibunAddr={shopzibunAddr}
        shoproadAddr={shoproadAddr}
        shopLat={shopLat}
        shopLon={shopLon}
        shopIntro={shopIntro}
        shopWorkday={shopWorkday}
        shopHoliday={shopHoliday}
        FoodOrigin={FoodOrigin}
        shopCategoryId={shopCategoryId}
        categoryList={categoryList}
        onRegisterShop={handleRegisterShop}
        onUpdateShopStore={onUpdateShopStore}
      />
    </div>
  );
};

export default RegisterShopPage;
