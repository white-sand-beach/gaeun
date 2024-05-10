import { create } from "zustand";
import { RegisterShopType } from "../../types/shop/RegisterShopType";

// 상태관리 정의
const useShopStore = create<RegisterShopType>(
    (set) => ({
        shopImage: null,
        shopName: "",
        shopOwner: "",
        shopNumber: "",
        shopzibunAddr: "",
        shoproadAddr: "",
        shopLat: 0,
        shopLon: 0,
        shopIntro: "",
        shopWorkday: "",
        shopHoliday: "",
        FoodOrigin: "",
        shopCategoryId: [],

        // 상태 업데이트
        // 데이터의 타입들이 다양하다.
        // 이런 경우에는 유니온 타입을 사용하여, 여러개 중 하나를 사용한다고 명시
        // inputRegisterShopType내의 키에 해당하는 값을 동적으로 참조한다고 명시
        onUpdateShopStore: <K extends keyof RegisterShopType>(key: K, value: RegisterShopType[K]) =>
            set((state) => ({
                ...state,
                [key]: value,
            })),

        // 상태 초기화
        onResetShopStore: () =>
            set({
                shopImage: null,
                shopName: "",
                shopOwner: "",
                shopNumber: "",
                shopzibunAddr: "",
                shoproadAddr: "",
                shopLat: 0,
                shopLon: 0,
                shopIntro: "",
                shopWorkday: "",
                shopHoliday: "",
                FoodOrigin: "",
                shopCategoryId: [],
            })
    }),
);

export default useShopStore;
