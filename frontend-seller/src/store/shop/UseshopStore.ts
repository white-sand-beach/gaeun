import { create } from "zustand";
import Cookies from "universal-cookie";
import { persist } from "zustand/middleware";
import { RegisterShopType } from "../../types/RegisterShopType";

const cookies = new Cookies();

// 쿠키 스토리지 커스텀
const cookieStorage = {
    getItem: (name:string) => {
        const cookieValue = cookies.get(name)
        return cookieValue ? JSON.stringify(cookieValue) : null
    },

    setItem: (name:string, value:string) => {
        cookies.set(name, JSON.parse(value), { path: "/"})
    },

    removeItem: (name:string) => {
        cookies.remove(name, { path: "/"})
    }
}

// 상태관리 정의
const useShopStore = create(
    persist<RegisterShopType>(
        (set) => ({
            shoeImage: "" || undefined,
            shopName: "",
            shopOwner: "",
            shopAddr: "",
            shopDetailAddr: "",
            shopIntro: "",
            shopWorkday: "",
            shopHoliyday: "",
            FoodIngredients: "",
            FoodOrigin: "",

            // 상태 업데이트
            updateShopStore: (key: string, value: string) =>
                set((state) => ({
                    ...state,
                    [key]: value
                })),

            // 상태 초기화
            resetShopStore: () =>
                set({
                    shoeImage: "" || undefined,
                    shopName: "",
                    shopOwner: "",
                    shopAddr: "",
                    shopDetailAddr: "",
                    shopIntro: "",
                    shopWorkday: "",
                    shopHoliyday: "",
                    FoodIngredients: "",
                    FoodOrigin: "",
                })
        }),
        {
            name:"shopInfo",
            getStorage: () => cookieStorage,
        }
    )
);

export default useShopStore;
