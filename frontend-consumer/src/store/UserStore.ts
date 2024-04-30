import { create } from "zustand";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";

import UserState from "../types/UserState"

// PersistOptions은 
// persist 함수에 전달되는 옵션 타입을 명확하게 정의합니다!
// ( 코드의 가독성 및 유지보수성 향상 )

// 상태 함수 정의 !
const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      email: "",
      nickName: "",
      profileImg: "",
      phoneNumber: "",
      updateUserState: (key, value) => set((state) => ({ ...state, [key]: value })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<UserState>
  )
);

export default useUserStore;