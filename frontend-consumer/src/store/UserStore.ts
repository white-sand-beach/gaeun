import { create } from "zustand";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";
import Cookies from 'universal-cookie';

import CookieState from "../types/CookieState";

// PersistOptions은 
// persist 함수에 전달되는 옵션 타입을 명확하게 정의합니다! 
// ( 코드의 가독성 및 유지보수성 향상 ) 

const cookies = new Cookies();

// 상태 함수 정의 !
const useUserStore = create<CookieState>()(
  persist(
    (set) => ({
      email: '',
      nickName: '',
      profileImg: '',
      phoneNumber: '',
      accessToken: cookies.get('accessToken') || '',
      updateUserState: (key, value) => set((state) => ({ ...state, [key]: value })),
      setAccessToken: (token: string) => {
        cookies.set('accessToken', token, { path: '/', secure: true, httpOnly: true });
        set((state) => ({ ...state, accessToken: token }));
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        email: state.email,
        nickName: state.nickName,
        profileImg: state.profileImg,
        phoneNumber: state.phoneNumber,
      }),
    } as PersistOptions<CookieState>
  )
);

// 쿠키(액세스 토큰 값) 변경(예: 재발급) 시 스토어 업데이트
cookies.addChangeListener((change) => {
  if (change.name === "accessToken") {
    useUserStore.getState().setAccessToken(change.value);
  } 
})

export default useUserStore;