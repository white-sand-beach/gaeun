import RegisterShop from "../../components/shop/RegisterShop";
import RegisterShopAPI from "../../service/shop/RegistereShopAPI";
import useShopStore from "../../store/shop/UseshopStore";

const RegisterShopPage = () => {

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
    onUpdateShopStore,
  } = useShopStore();

  const { postRegisterShop } = RegisterShopAPI();
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
      onUpdateShopStore
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
        onUpdateShopStore={onUpdateShopStore}
        onRegisterShop={handleRegisterShop}
      />
    </div>
  );
};

export default RegisterShopPage;
