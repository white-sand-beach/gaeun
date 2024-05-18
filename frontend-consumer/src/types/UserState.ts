// 상태 인터페이스 정의 !
interface UserState {
  email?: string;
  nickname?: string;
  profileImage?: any;
  imageUrl?: string;
  phoneNumber?: string;
  socialType?: string;
  orderCnt?: number;
  data?: any;
  headerText?: string;
  buttonText?: string;
  updateNickname?: (newNickname: string) => void;
  updatePhoneNumber?: (newPhoneNumber: string) => void;

  // K는 제네릭 타입 변수
  // UserStore의 모든 키를 유니온 타입으로 반환
  // (key: K, value: UserStore[K]): 함수의 인자로 key와 value를 받음
  // key는 UserStore의 키 중 하나이며, value는 key에 해당하는 UserStore의 값의 타입과 동일해야함
  updateUserState?: <K extends keyof UserState>(
    key: K,
    value: UserState[K]
  ) => void;
}

export default UserState;
