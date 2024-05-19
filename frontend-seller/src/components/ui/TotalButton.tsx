import { ButtonTypes } from "../../types/@common/ButtonTypes";

const TotalButton: React.FC<ButtonTypes> = (props) => {
  return (
    <button
      className={`common-btn rounded-xl text-[50px] h-[80px]  ${props.title === "회원가입" && "w-[508px]" || props.title === "판매 등록" ? "w-[320px] rounded-[30px] text-[36px]" : "w-[400px]"}`}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};

export default TotalButton;
