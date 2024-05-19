import { ButtonTypes } from "../../types/@common/ButtonTypes";

const TotalButton: React.FC<ButtonTypes> = (props) => {
  return (
    <button
      className={`common-btn rounded-xl text-[50px] h-[80px] ${props.title === "회원가입" ? "w-[508px]" : "w-[400px]"}`}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};

export default TotalButton;
