import UserState from "./UserState";

interface CookieState extends UserState {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

export default CookieState;
