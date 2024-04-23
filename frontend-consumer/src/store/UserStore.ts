import { create } from "zustand";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";

// PersistOptions은 
// persist 함수에 전달되는 옵션 타입을 명확하게 정의합니다!
// ( 코드의 가독성 및 유지보수성 향상 )

// 상태 인터페이스 정의 !
interface UserStore {
  id: number;
  email: string;
  nickName: string;
  profileImg?: string;
  phoneNumber?: number;
  
  // K는 제네릭 타입 변수
  // UserStore의 모든 키를 유니온 타입으로 반환
  // (key: K, value: UserStore[K]): 함수의 인자로 key와 value를 받음
  // key는 UserStore의 키 중 하나이며, value는 key에 해당하는 UserStore의 값의 타입과 동일해야함
  updateUserStore: <K extends keyof UserStore>(key: K, value: UserStore[K]) => void;
}

// 상태 함수 정의 !
const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      id: 0,
      email: "",
      nickName: "",
      profileImg: "",
      phoneNumber: undefined,
      updateUserStore: (key, value) => set((state) => ({ ...state, [key]: value })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<UserStore>
  )
);

export default useUserStore;