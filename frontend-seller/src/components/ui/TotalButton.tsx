import { ButtonTypes } from "../../types/@common/ButtonTypes";

const TotalButton: React.FC<ButtonTypes> = (props) => {
  return (
    <button
      className={`common-btn rounded-xl h-[80px] ${props.title === "로그인" ? "w-[400px] text-[26px]" : props.title === "회원가입" ? "text-[26px] w-[508px] " : props.title === "판매 등록" ? "w-[320px] rounded-[30px] text-[30px]" : props.title === "메뉴 수정" ? "w-[400px] text-[26px]" : "w-[400px]"}`}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};

export default TotalButton;
