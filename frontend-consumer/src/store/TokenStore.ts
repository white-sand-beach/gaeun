import { create } from "zustand";
import Cookies from 'universal-cookie';
import CookieState from "../types/TokenState ";

const cookies = new Cookies();

const useTokenStore = create<CookieState>((set) => ({
  accessToken: cookies.get('accessToken') || '',
  setAccessToken: (token) => {
    cookies.set('accessToken', token, { path: '/', secure: true, httpOnly: true });
    set({ accessToken: token });
  },
}));

// 쿠키(액세스 토큰 값) 변경(예: 재발급) 시 스토어 업데이트
cookies.addChangeListener((change) => {
  if (change.name === "accessToken") {
    useTokenStore.getState().setAccessToken(change.value);
  }
})

export default useTokenStore;
