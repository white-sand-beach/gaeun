import { create } from "zustand";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";

import UserLocation from "../types/UserLocation";

// PersistOptions은
// persist 함수에 전달되는 옵션 타입을 명확하게 정의합니다!
// ( 코드의 가독성 및 유지보수성 향상 )

// 상태 함수 정의 !
const useUserLocation = create<UserLocation>()(
  persist(
    (set) => ({
      alias: "",
      latitude: 0,
      longitude: 0,
      address: "",
      roadAddress: "",
      addressId: 0,
      updateUserState: (key, value) =>
        set((state) => ({ ...state, [key]: value })),
    }),
    {
      name: "user-location",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        alias: state.alias,
        latitude: state.latitude,
        longitude: state.longitude,
        address: state.address,
        roadAddress: state.roadAddress,
        addressId: state.addressId,
      }),
    } as PersistOptions<UserLocation>
  )
);

export default useUserLocation;
