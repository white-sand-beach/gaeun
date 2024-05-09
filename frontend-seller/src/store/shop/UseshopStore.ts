import { create } from "zustand";
import Cookies from "universal-cookie";
import { persist } from "zustand/middleware";
import { InputRegisterShopType } from "../../types/shop/InputRegisterShopType";

const cookies = new Cookies();

// 상태관리 정의
const useShopStore = create(
    persist<InputRegisterShopType>(
        (set) => ({
            shoeImage: "" || undefined,
            shopName: "",
            shopOwner: "",
            shopNumber: "",
            shopzibunAddr: "",
            shoproadAddr: "",
            shopLat: 0,
            shopLon: 0,
            shopIntro: "",
            shopWorkday: "",
            shopHoliyday: "",
            FoodOrigin: "",
            shopCategoryId: 0,

            // 상태 업데이트
            // 데이터의 타입들이 다양하다.
            // 이런 경우에는 유니온 타입을 사용하여, 여러개 중 하나를 사용한다고 명시
            // inputRegisterShopType내의 키에 해당하는 값을 동적으로 참조한다고 명시
            // 업데이트되는 값들을 cookie에 저장
            updateShopStore: <K extends keyof InputRegisterShopType>(key: K, value: InputRegisterShopType[K]) =>
                set((state) => {
                    const newState = { ...state, [key]: value };
                    cookies.set("shopInfo", JSON.stringify(newState), { path: "/" })
                    return newState
                }),

            // 상태 초기화
            resetShopStore: () =>
                set(() => {
                    const initialState = {
                        shopImage: "" || undefined,
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
                        shopCategoryId: 0,
                    }
                    // 쿠키값 초기화
                    cookies.set("shopInfo", JSON.stringify(initialState), { path: "/"})
                    return initialState;
                })
        }),
        {
            name: "shopInfo"
        }
    )
);

export default useShopStore;
