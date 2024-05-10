import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSellerStore = create(
    persist<{storeId: number, updateSellerStore: (key: string, value:number) => void;}>(
        (set) => ({
            storeId: 0,

            updateSellerStore: (key: string, value: number) =>
                set((state) => ({
                    ...state,
                    [key]: value,
                })),

        }),
        {
            name: "seller-info"
        }
    )
)

export default useSellerStore;